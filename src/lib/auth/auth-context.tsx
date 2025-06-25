import { useObjectStorageState } from "@/hooks/useStorageState";
import { ApiError, ApiResponse } from "@/types/api";
import { AuthResponse, LoginCredentials, SessionData } from "@/types/auth";
import { createContext, use, useState, type PropsWithChildren } from "react";

/**
 * Authentication context that provides session management functionality.
 * Uses SessionData objects for proper session management.
 */
const AuthContext = createContext<{
  signIn: ({ username, password }: LoginCredentials) => Promise<boolean>;
  signOut: () => void;
  session?: SessionData | null;
  isLoading: boolean;
  isSigningIn: boolean;
  error: ApiError | null;
}>({
  signIn: async () => false,
  signOut: () => null,
  session: null,
  isLoading: false,
  isSigningIn: false,
  error: null,
});

/**
 * Hook to access the authentication context.
 * @throws {Error} If used outside of a SessionProvider
 */
export function useSession() {
  const value = use(AuthContext);

  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

/**
 * Provider component that wraps the app and provides authentication context.
 * Manages session state using secure storage with automatic JSON serialization.
 */
export function SessionProvider({ children }: PropsWithChildren) {
  const [[isStorageLoading, session], setSession] =
    useObjectStorageState<SessionData>("session");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  // Combined loading state: true if either storage is loading or user is signing in
  const isLoading = isStorageLoading || isSigningIn;

  const signIn = async ({ username, password }: LoginCredentials) => {
    try {
      setIsSigningIn(true);
      setError(null); // Clear any previous errors

      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data: ApiResponse<AuthResponse> = await response.json();

      if (!data.success) {
        // Use the ApiError directly from the API response
        setError(data);
        return false;
      }

      if (!data.data?.session) {
        setError({
          success: false,
          error: "INVALID_RESPONSE",
          message: "No session data received",
        });
        return false;
      }

      setSession(data.data.session);
      return true;
    } catch (err) {
      setError({
        success: false,
        error: "NETWORK_ERROR",
        message:
          err instanceof Error ? err.message : "Network connection failed",
      });
      return false;
    } finally {
      setIsSigningIn(false);
    }
  };

  const signOut = () => {
    setSession(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, session, isLoading, isSigningIn, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}
