import {
  useAuthenticationMutation,
  useLogoutMutation,
} from "@/hooks/queries/useAuthQueries";
import { useStorageState } from "@/hooks/useStorageState";
import type { LoginCredentials, SessionData } from "@/types/auth";
import { createContext, use, type PropsWithChildren } from "react";

const AuthContext = createContext<{
  signIn: (
    credentials: LoginCredentials,
    requestVerificationToken: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  session?: SessionData | null;
  isLoading: boolean;
  authError?: string | null;
}>({
  signIn: async () => {
    throw new Error("signIn must be used within SessionProvider");
  },
  signOut: async () => {
    throw new Error("signOut must be used within SessionProvider");
  },
  session: null,
  isLoading: false,
  authError: null,
});

export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("hac_session");

  const parsedSession: SessionData | null = session
    ? (() => {
        try {
          return JSON.parse(session);
        } catch {
          setSession(null);
          return null;
        }
      })()
    : null;

  const authMutation = useAuthenticationMutation({
    onSuccess: (result) => {
      if (result.success && result.session) {
        setSession(JSON.stringify(result.session));
      } else {
        throw new Error(result.message || "Authentication failed");
      }
    },
  });

  const logoutMutation = useLogoutMutation({
    onSuccess: () => setSession(null),
  });

  const signIn = async (
    credentials: LoginCredentials,
    requestVerificationToken: string
  ): Promise<void> => {
    await authMutation.mutateAsync({
      credentials,
      requestVerificationToken,
    });
  };

  const signOut = async (): Promise<void> => {
    await logoutMutation.mutateAsync();
  };

  const isAuthLoading =
    isLoading || authMutation.isPending || logoutMutation.isPending;
  const authError =
    authMutation.error?.message || logoutMutation.error?.message || null;

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session: parsedSession,
        isLoading: isAuthLoading,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

