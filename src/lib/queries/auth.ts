import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService, LoginCredentials } from "../api/auth.service";

export const VERIFICATION_TOKEN_QUERY_KEY = ["verificationToken"];
export const AUTH_QUERY_KEY = ["auth"];
export const SESSION_QUERY_KEY = ["session"];

export const useVerificationToken = () => {
  return useQuery({
    queryKey: VERIFICATION_TOKEN_QUERY_KEY,
    queryFn: async () => {
      const token = await authService.getVerificationToken();

      if (!token) {
        throw new Error("No verification token avaailable");
      }

      return token;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { data: verificationToken } = useVerificationToken();

  return useMutation({
    mutationKey: AUTH_QUERY_KEY,
    mutationFn: (credentials: LoginCredentials) => {
      return authService.login(credentials, verificationToken!);
    },
    onSuccess: (session) => {
      queryClient.setQueryData(SESSION_QUERY_KEY, session);
    },
  });
};

// Hook to access the current session
export const useSession = () => {
  return useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: () => null, // This will be overridden by the cache
    staleTime: Infinity, // Session data never goes stale
  });
};

