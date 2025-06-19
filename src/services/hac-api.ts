import { fetchWithCookies } from "@/lib/query/fetch";
import type {
  AuthResponse,
  LoginCredentials,
  LoginPageData,
} from "@/types/auth";
import { load } from "cheerio";

// Base URL for HAC (Frisco ISD)
const HAC_BASE_URL = "https://hac.friscoisd.org";

export async function fetchLoginPage(): Promise<LoginPageData> {
  try {
    const response = await fetchWithCookies(
      `${HAC_BASE_URL}/HomeAccess/Account/LogOn?ReturnUrl=%2fHomeAccess%2f`,
    );

    const loginPageText = await response.text();
    const $ = load(loginPageText);
    const tokenInput = $('input[name="__RequestVerificationToken"]');

    const token = tokenInput.attr("value");

    if (!token) {
      throw new Error("TOKEN_EXTRACTION_FAILED");
    }

    return { requestVerificationToken: token };
  } catch (e) {
    console.error("Error fetching login page:", e);
    throw e;
  }
}

export async function authenticateWithHAC({
  username,
  password,
}: LoginCredentials): Promise<AuthResponse> {
  try {
    console.log("🔑 Authenticating with HAC...");

    // Step 1: Get login page with proper headers
    const res = await fetchWithCookies(
      `${HAC_BASE_URL}/HomeAccess/Account/LogOn?ReturnUrl=%2fHomeAccess%2f`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
          "Upgrade-Insecure-Requests": "1",
        },
      },
    );

    const loginPageText = await res.text();
    const $ = load(loginPageText);
    const tokenInput = $('input[name="__RequestVerificationToken"]');

    const token = tokenInput.attr("value");

    if (!token) {
      throw new Error("TOKEN_EXTRACTION_FAILED");
    }

    // Step 2: Submit form with proper headers (NO token in headers!)
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      Referer:
        "https://hac.friscoisd.org/HomeAccess/Account/LogOn?ReturnUrl=%2fHomeAccess%2f",
      Origin: "https://hac.friscoisd.org",
      Connection: "keep-alive",
      "Upgrade-Insecure-Requests": "1",
    };

    const payload = {
      __RequestVerificationToken: token,
      SCKTY00328510CustomEnabled: "False",
      SCKTY00436568CustomEnabled: "False",
      Database: "10",
      VerificationOption: "UsernamePassword",
      "LogOnDetails.UserName": username,
      tempUN: "",
      tempPW: "",
      "LogOnDetails.Password": password,
    };

    console.log("🔍 Sending authentication request...");

    const response = await fetchWithCookies(
      `${HAC_BASE_URL}/HomeAccess/Account/LogOn?ReturnUrl=%2fHomeAccess%2f`,
      {
        method: "POST",
        headers,
        body: new URLSearchParams(payload).toString(),
      },
    );

    console.log(JSON.stringify(response, null, 2));

    if (response.status !== 302) {
      throw new Error("Authentication failed");
    }

    return {
      success: true,
      session: {
        cookies: "",
        userName: "test",
      },
    };
  } catch (e) {
    console.error("Authentication error:", e);

    return {
      success: false,
      error: "NETWORK_ERROR",
      message: e instanceof Error ? e.message : "Network error",
    };
  }
}
