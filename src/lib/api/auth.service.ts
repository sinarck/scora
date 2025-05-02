import axios, { AxiosInstance } from "axios";

// Base URL should be moved to environment variables
const BASE_URL = process.env.API_BASE_URL;
const LOGIN_ENDPOINT = `${BASE_URL}/HomeAccess/Account/LogOn?ReturnUrl=%2fHomeAccess%2f`;

export interface LoginCredentials {
  username: string;
  password: string;
}

export const authService = {
  getVerificationToken: async (): Promise<string | null> => {
    const response = await axios.get(LOGIN_ENDPOINT);
    const html = response.data;
    const tokenMatch = html.match(
      /name="__RequestVerificationToken" type="hidden" value="([^"]+)"/
    );
    return tokenMatch ? tokenMatch[1] : null;
  },

  login: async (
    credentials: LoginCredentials,
    verificationToken: string
  ): Promise<AxiosInstance> => {
    const session = axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "content-type": "application/x-www-form-urlencoded",
        // Generic headers without specific identifiers
        "user-agent": "Mozilla/5.0 (compatible)",
      },
    });

    const formData = new URLSearchParams();
    formData.append("__RequestVerificationToken", verificationToken);
    formData.append("Database", "10");
    formData.append("VerificationOption", "UsernamePassword");
    formData.append("LogOnDetails.UserName", credentials.username);
    formData.append("LogOnDetails.Password", credentials.password);

    const response = await session.post(LOGIN_ENDPOINT, formData.toString());

    // Check if we got an auth cookie
    const cookies = response.headers["set-cookie"];
    const hasAuthCookie = cookies?.some((cookie) =>
      cookie.includes(".AuthCookie")
    );

    if (!hasAuthCookie) {
      throw new Error("Login failed - please check your credentials");
    }

    return session;
  },
};

