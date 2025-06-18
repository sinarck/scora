import type {
  AuthResponse,
  LoginCredentials,
  LoginPageData,
} from "@/types/auth";
import CookieManager from "@react-native-cookies/cookies";
import { load } from "cheerio";

// Base URL for HAC (Frisco ISD)
const HAC_BASE_URL = "https://hac.friscoisd.org";

export async function fetchLoginPage(): Promise<LoginPageData> {
  try {
    const response = await fetch(
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
      }
    );

    const loginPageText = await response.text();
    const $ = load(loginPageText);
    const tokenInput = $('input[name="__RequestVerificationToken"]');

    const requestVerificationToken = tokenInput.attr("value");

    if (!requestVerificationToken) {
      throw new Error("TOKEN_EXTRACTION_FAILED");
    }

    console.log("Successfully extracted token:", requestVerificationToken);

    return { requestVerificationToken };
  } catch (e) {
    console.error("Error fetching login page:", e);
    throw e;
  }
}

export async function authenticateWithHAC({
  username,
  password,
  token,
}: LoginCredentials): Promise<AuthResponse> {
  try {
    console.log(username, "\n", password);

    const headers = {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      priority: "u=0, i",
      "sec-ch-ua": '"Chromium";v="137", "Not/A)Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      Referer: `${HAC_BASE_URL}/HomeAccess/Account/LogOn?ReturnUrl=%2fHomeAccess%2f`,
      "Referrer-Policy": "strict-origin-when-cross-origin",
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

    const response = await fetch(
      `${HAC_BASE_URL}/HomeAccess/Account/LogOn?ReturnUrl=%2fHomeAccess%2f`,
      {
        method: "POST",
        headers,
        body: new URLSearchParams(payload).toString(),
      }
    );

    // Get all Set-Cookie headers
    const setCookieHeaders: string[] = [];
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        setCookieHeaders.push(value);
      }
    });

    console.log("\nAll Set-Cookie headers:", setCookieHeaders);

    // Set all cookies from the response
    for (const cookieHeader of setCookieHeaders) {
      await CookieManager.setFromResponse(HAC_BASE_URL, cookieHeader);
    }

    console.log(JSON.stringify(response, null, 2));

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

