import type {
  AuthResponse,
  LoginCredentials,
  LoginPageData,
  SessionData,
} from "@/types/auth";
import axios from "axios";
import * as cheerio from "cheerio";

// Base URL for HAC (Frisco ISD)
const HAC_BASE_URL = "https://hac.friscoisd.org";

export async function fetchLoginPage(): Promise<LoginPageData> {
  const response = await axios.get(
    `${HAC_BASE_URL}/HomeAccess/Account/LogOn?ReturnUrl=%2fHomeAccess%2f`
  );

  const $ = cheerio.load(response.data);

  // Remove unnecessary elements for better performance
  $("script, style, head").remove();

  const tokenInput = $('input[name="__RequestVerificationToken"]');

  if (!tokenInput.length) {
    throw new Error("TOKEN_EXTRACTION_FAILED");
  }

  const requestVerificationToken = tokenInput.attr("value");

  if (!requestVerificationToken) {
    throw new Error("TOKEN_EXTRACTION_FAILED");
  }

  return { requestVerificationToken };
}

export async function authenticateWithHAC(
  credentials: LoginCredentials,
  requestVerificationToken: string
): Promise<AuthResponse> {
  const formData = new URLSearchParams({
    __RequestVerificationToken: requestVerificationToken,
    SCKTY00328510CustomEnabled: "False",
    SCKTY00436568CustomEnabled: "False",
    Database: "10",
    VerificationOption: "UsernamePassword",
    "LogOnDetails.UserName": credentials.username,
    tempUN: "",
    tempPW: "",
    "LogOnDetails.Password": credentials.password,
  });

  try {
    const response = await axios.post(
      `${HAC_BASE_URL}/HomeAccess/Account/LogOn?ReturnUrl=%2fHomeAccess%2f`,
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        maxRedirects: 0,
        validateStatus: (status) => status < 400,
      }
    );

    const cookies = response.headers["set-cookie"]?.join("; ") || "";

    const isSuccess =
      response.status === 302 &&
      response.headers.location?.includes("/HomeAccess/");

    if (!isSuccess) {
      return {
        success: false,
        error: "INVALID_CREDENTIALS",
        message: "Invalid username or password",
      };
    }

    const session: SessionData = {
      cookies,
      userName: credentials.username,
      requestVerificationToken,
    };

    return { success: true, session };
  } catch (error) {
    return {
      success: false,
      error: "NETWORK_ERROR",
      message: error instanceof Error ? error.message : "Network error",
    };
  }
}

