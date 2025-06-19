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
      `${HAC_BASE_URL}/HomeAccess/Account/LogOn?ReturnUrl=%2fhomeaccess`
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
    console.log(
      "🔍 [REACT_NATIVE_FIX] Using aggressive cookie clearing to prevent native cookie interference"
    );

    // Step 1: Get login page with proper headers
    const res = await fetchWithCookies(
      `${HAC_BASE_URL}/HomeAccess/Account/LogOn?ReturnUrl=%2fhomeaccess`,
      {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "max-age=0",
          priority: "u=0, i",
          "sec-ch-ua": '"Chromium";v="137", "Not/A)Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "cross-site",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
        },
      }
    );

    console.log(
      "🔍 Cookies from first request:",
      res.headers.get("set-cookie")
    );

    const loginPageText = await res.text();
    const $ = load(loginPageText);
    const tokenInput = $('input[name="__RequestVerificationToken"]');

    const token = tokenInput.attr("value");

    if (!token) {
      throw new Error("TOKEN_EXTRACTION_FAILED");
    }

    console.log("🔍 Extracted token from form:", token);
    console.log("🔍 Token length:", token.length);

    // Let's check all form inputs from the original form too
    const originalInputs = $("input")
      .map((i, el) => {
        const $el = $(el);
        return {
          name: $el.attr("name"),
          value: $el.attr("value"),
          type: $el.attr("type"),
        };
      })
      .get()
      .filter((input) => input.name);

    console.log(
      "🔍 Original form inputs:",
      JSON.stringify(originalInputs, null, 2)
    );

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

    console.log("🔍 Sending authentication request...");
    console.log("🔍 Form payload:", JSON.stringify(payload, null, 2));

    // Let's also test if credentials are the issue by logging what we're actually sending
    console.log("🔍 Credentials being sent:", {
      username: payload["LogOnDetails.UserName"],
      passwordLength: payload["LogOnDetails.Password"].length,
      passwordFirstChar: payload["LogOnDetails.Password"][0],
      passwordLastChar:
        payload["LogOnDetails.Password"][
          payload["LogOnDetails.Password"].length - 1
        ],
    });

    const response = await fetchWithCookies(
      `${HAC_BASE_URL}/HomeAccess/Account/LogOn?ReturnUrl=%2fhomeaccess`,
      {
        method: "POST",
        headers,
        body: new URLSearchParams(payload).toString(),
      }
    );

    console.log(
      "🔍 Cookies from second request:",
      response.headers.get("set-cookie")
    );

    const responseText = await response.text();
    console.log("🔍 Response status:", response.status);
    console.log(
      "🔍 Response headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (response.status !== 302) {
      console.log(
        "🔍 Response body (first 1000 chars):",
        responseText.substring(0, 1000)
      );

      // Check for specific error messages in the response
      const $response = load(responseText);
      const errorMessages = $response(
        ".field-validation-error, .validation-summary-errors, .alert-danger, .text-danger"
      ).text();
      if (errorMessages) {
        console.log("🚨 Found error messages on page:", errorMessages);
      }

      // Check if there are any validation spans with content
      const validationSpans = $response("span[data-valmsg-for]")
        .map((i, el) => $response(el).text())
        .get()
        .filter((text) => text.trim());
      if (validationSpans.length > 0) {
        console.log("🚨 Validation messages:", validationSpans);
      }

      // Check for any text that might indicate why login failed
      const pageTitle = $response("title").text();
      console.log("🔍 Page title:", pageTitle);

      // Look for any error text in the page
      const bodyText = $response("body").text();
      const errorKeywords = [
        "invalid",
        "incorrect",
        "failed",
        "error",
        "denied",
        "locked",
        "disabled",
      ];
      const foundErrors = errorKeywords.filter((keyword) =>
        bodyText.toLowerCase().includes(keyword)
      );
      if (foundErrors.length > 0) {
        console.log("🚨 Found potential error keywords:", foundErrors);
      }

      // Let's also compare form fields to see if we're missing any
      const allInputs = $response("input")
        .map((i, el) => {
          const $el = $response(el);
          return {
            name: $el.attr("name"),
            value: $el.attr("value"),
            type: $el.attr("type"),
          };
        })
        .get()
        .filter((input) => input.name);

      console.log(
        "🔍 All form inputs in response:",
        JSON.stringify(allInputs, null, 2)
      );

      // Check for specific authentication failure messages
      if (bodyText.includes("Your attempt to log in was unsuccessful")) {
        console.log("🚨 Authentication failed: Invalid credentials");
        return {
          success: false,
          error: "INVALID_CREDENTIALS",
          message:
            "Invalid username or password. Please check your credentials and try again.",
        };
      }

      // Check for other common error scenarios
      if (bodyText.includes("locked") || bodyText.includes("disabled")) {
        return {
          success: false,
          error: "ACCOUNT_LOCKED",
          message:
            "Your account has been locked or disabled. Please contact support.",
        };
      }

      // Generic authentication failure
      throw new Error("Authentication failed - Unknown error");
    }

    // If we get here, authentication was successful (302 redirect)
    console.log("✅ Authentication successful! Redirecting...");
    const location = response.headers.get("location");
    console.log("🔍 Redirect location:", location);

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

