import type {
  AuthResponse,
  LoginCredentials,
  LoginPageData,
} from "@/types/auth";
// import { load } from "cheerio";

// Base URL for HAC (Frisco ISD)
const HAC_BASE_URL = "https://hac.friscoisd.org";

export async function fetchLoginPage(): Promise<LoginPageData> {
  try {
    const response = await fetch(
      `${HAC_BASE_URL}/HomeAccess/Account/LogOn?ReturnUrl=%2fhomeaccess`
    );

    const loginPageText = await response.text();

    // Try multiple regex patterns to find the token
    const patterns = [
      /name="__RequestVerificationToken"\s+value="([^"]+)"/,
      /name='__RequestVerificationToken'\s+value='([^']+)'/,
      /value="([^"]+)"[^>]*name="__RequestVerificationToken"/,
      /value='([^']+)'[^>]*name='__RequestVerificationToken'/,
      /__RequestVerificationToken[^>]*value="([^"]+)"/,
      /__RequestVerificationToken[^>]*value='([^']+)'/,
    ];

    let token = null;
    for (const pattern of patterns) {
      const match = loginPageText.match(pattern);
      if (match) {
        token = match[1];
        break;
      }
    }

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
    const { requestVerificationToken: token } = await fetchLoginPage();

    // Step 2: Submit form with proper headers (NO token in headers!)
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
      Referer:
        "https://hac.friscoisd.org/HomeAccess/Account/LogOn?ReturnUrl=%2fhomeaccess",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
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
      `${HAC_BASE_URL}/HomeAccess/Account/LogOn?ReturnUrl=%2fhomeaccess`,
      {
        method: "POST",
        headers,
        body: new URLSearchParams(payload).toString(),
      }
    );

    if (response.status !== 302) {
      // Generic authentication failure
      throw new Error("Authentication failed - Unknown error");
    }

    // If we get here, authentication was successful (302 redirect)
    console.log("✅ Authentication successful! Redirecting...");

    return {
      success: true,
      session: {
        cookies: "",
        userName: username,
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

