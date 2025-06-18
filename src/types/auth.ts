// HAC Authentication Types

/**
 * User session data returned from successful HAC authentication
 * Contains everything needed to make authenticated requests to HAC
 */
export interface SessionData {
  /** Session cookies for authenticated HAC requests */
  cookies?: string;
  /** User's display name from HAC */
  userName: string;
}

/**
 * Login credentials required for HAC authentication
 */
export interface LoginCredentials {
  /** HAC username */
  username: string;
  /** HAC password */
  password: string;
  /** CSRF token required for login submission */
  token: LoginPageData["requestVerificationToken"];
}

/**
 * Response from HAC login page containing the verification token
 * This is scraped from the initial login page before authentication
 */
export interface LoginPageData {
  /** CSRF token required for login submission */
  requestVerificationToken: string;
}

/**
 * Authentication error types that can occur during HAC login
 */
export type AuthError =
  | "INVALID_CREDENTIALS"
  | "NETWORK_ERROR"
  | "TOKEN_EXTRACTION_FAILED"
  | "AUTH_COOKIE_MISSING"
  | "UNKNOWN_ERROR";

/**
 * Authentication response from HAC login attempt
 */
export interface AuthResponse {
  /** Whether authentication was successful */
  success: boolean;
  /** Session data if successful */
  session?: SessionData;
  /** Error type if failed */
  error?: AuthError;
  /** Human-readable error message */
  message?: string;
}

