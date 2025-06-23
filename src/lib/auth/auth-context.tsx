import { useObjectStorageState } from "@/hooks/useStorageState";
import { LoginCredentials, SessionData } from "@/types/auth";
import { createContext, use, type PropsWithChildren } from "react";

/**
 * Authentication context that provides session management functionality.
 * Uses SessionData objects for proper session management.
 */
const AuthContext = createContext<{
  signIn: ({ username, password }: LoginCredentials) => Promise<boolean>;
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

  const signIn = async ({ username, password }: LoginCredentials) => {
    const response = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to sign in");
    }

    const data = await response.json();

    return data.success ? (setSession(data.session), true) : false;
  };

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

