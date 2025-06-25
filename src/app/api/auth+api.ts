import { parseHtml } from "@/lib/html-parser";
import { loginSchema } from "@/schema/auth";
import type { ApiResponse } from "@/types/api";
import { AuthResponse } from "@/types/auth";
import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

export async function POST(request: Request) {
  try {
    const { username, password } = loginSchema.parse(await request.json());

    // Setup authenticated client with cookie jar
    const jar = new CookieJar();
    const client = wrapper(
      axios.create({
        baseURL: "https://hac.friscoisd.org",
        jar,
        timeout: 30000,
      }),
    );

    // Get login page and extract CSRF token
    const loginPage = await client.get(
      "/HomeAccess/Account/LogOn?ReturnUrl=%2fHomeAccess%2f",
    );

    const token = parseHtml(loginPage.data).attr(
      'input[name="__RequestVerificationToken"]',
      "value",
    );

    if (!token) {
      throw new Error("Could not extract login token");
    }

    // Prepare login payload
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

    // Submit login form (expects 302 redirect on success)
    await client.post(
      "/HomeAccess/Account/LogOn?ReturnUrl=%2fHomeAccess%2f",
      new URLSearchParams(payload).toString(),
      {
        maxRedirects: 0,
        validateStatus: (status) => status === 302,
      },
    );

    // Check for authentication cookie
    const cookies = await jar.getCookies("https://hac.friscoisd.org");
    const authCookie = cookies.find((c) => c.key === ".AuthCookie");

    if (!authCookie?.value) {
      throw new Error("Authentication failed");
    }

    // Return session data
    return Response.json({
      success: true,
      data: {
        session: {
          cookies: cookies.map((c) => c.toString()).join("; "),
        },
      },
      message: "Authentication successful",
    } satisfies ApiResponse<AuthResponse>);
  } catch (error: any) {
    // Handle login failure (200 status = returned to login page)
    if (error.response?.status === 200) {
      return Response.json(
        {
          success: false,
          error: "AUTHENTICATION_FAILED",
          message: "Invalid username or password",
        } satisfies ApiResponse,
        {
          status: 401,
        },
      );
    }

    // Handle other errors
    return Response.json(
      {
        success: false,
        error: "AUTHENTICATION_FAILED",
        message:
          error instanceof Error ? error.message : "Authentication failed",
      } satisfies ApiResponse,
      {
        status: 401,
      },
    );
  }
}
