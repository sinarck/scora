import { useObjectStorageState } from "@/hooks/useStorageState";
import { ApiResponse } from "@/types/api";
import { AuthResponse, LoginCredentials, SessionData } from "@/types/auth";
import axios from "axios";
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
    const { data, status } = await axios.post<ApiResponse<AuthResponse>>(
      "http://192.168.86.230:8081/api/auth",
      {
        username,
        password,
      }
    );

    if (status !== 200) {
      console.error(data);
      throw new Error("Failed to sign in");
    }

    return data.success && data.data?.session
      ? (setSession(data.data.session), true)
      : false;
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

