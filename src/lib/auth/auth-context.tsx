import { useObjectStorageState } from "@/hooks/useStorageState";
import { authenticateWithHAC } from "@/services/hac-api";
import { LoginCredentials, SessionData } from "@/types/auth";
import { createContext, use, useCallback, type PropsWithChildren } from "react";

/**
 * Authentication context that provides session management functionality.
 * Uses SessionData objects for proper session management.
 */
const AuthContext = createContext<{
  signIn: ({ username, password, token }: LoginCredentials) => Promise<boolean>;
  signOut: () => void;
  session?: SessionData | null;
  isLoading: boolean;
}>({
  signIn: async () => false,
  signOut: () => null,
  session: null,
  isLoading: false,
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
  const [[isLoading, session], setSession] =
    useObjectStorageState<SessionData>("session");

  const signIn = useCallback(
    async ({
      username,
      password,
      token,
    }: LoginCredentials): Promise<boolean> => {
      try {
        // Authenticate with HAC
        const authResponse = await authenticateWithHAC({
          username,
          password,
          token: token,
        });

        if (authResponse.success && authResponse.session) {
          setSession(authResponse.session);
          return true;
        } else {
          console.error(
            "Authentication failed:",
            authResponse.error,
            authResponse.message,
          );
          return false;
        }
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    },
    [setSession],
  );

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut: () => setSession(null),
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
