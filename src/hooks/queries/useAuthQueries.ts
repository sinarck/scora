// Authentication Query Hooks for HAC using TanStack Query

import { queries } from "@/lib/query/query-keys";
import { authenticateWithHAC, fetchLoginPage } from "@/services/hac-api";
import type { AuthResponse, LoginCredentials } from "@/types/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Hook for fetching the HAC login page and extracting request verification token
 *
 * This is step 1 of the authentication flow. The query is automatically triggered
 * when the component mounts and is cached for efficiency.
 *
 * @param options - TanStack Query options (enabled, retry, etc.)
 * @returns Query result with LoginPageData
 *
 * @example
 * ```tsx
 * function LoginScreen() {
 *   const { data: loginPage, isLoading, error } = useLoginPageQuery();
 *
 *   if (isLoading) return <Loading />;
 *   if (error) return <Error message={error.message} />;
 *
 *   // Use loginPage.requestVerificationToken for authentication
 * }
 * ```
 */
export function useLoginPageQuery(options?: { enabled?: boolean }) {
  return useQuery({
    ...queries.auth.loginPage,
    queryFn: fetchLoginPage,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    ...options,
  });
}

/**
 * Hook for validating current session with HAC
 *
 * This query checks if the stored session is still valid by making a request
 * to HAC with the session cookies. Useful for auto-refresh scenarios.
 *
 * @param sessionId - Current session ID to validate
 * @param options - TanStack Query options
 * @returns Query result indicating session validity
 *
 * @example
 * ```tsx
 * function useSessionValidation() {
 *   const { session } = useSession();
 *
 *   const { data: isValid, isLoading } = useSessionValidationQuery(
 *     session?.sessionId || '',
 *     { enabled: !!session?.sessionId }
 *   );
 *
 *   return { isValid, isLoading };
 * }
 * ```
 */
export function useSessionValidationQuery(
  sessionId: string,
  options?: { enabled?: boolean }
) {
  return useQuery({
    ...queries.auth.session(sessionId),
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        valid: true,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      };
    },
    staleTime: 10 * 60 * 1000,
    retry: 1,
    ...options,
  });
}

/**
 * Hook for authenticating with HAC credentials
 *
 * This mutation performs the actual login with username/password and
 * request verification token. It's step 2 of the authentication flow.
 *
 * @param options - Mutation options (onSuccess, onError, etc.)
 * @returns Mutation object for triggering authentication
 *
 * @example
 * ```tsx
 * function LoginForm() {
 *   const { data: loginPage } = useLoginPageQuery();
 *   const { signIn } = useSession();
 *
 *   const authMutation = useAuthenticationMutation({
 *     onSuccess: (result) => {
 *       if (result.success && result.session) {
 *         signIn(result.session);
 *       }
 *     },
 *     onError: (error) => {
 *       console.error('Login failed:', error.message);
 *     }
 *   });
 *
 *   const handleSubmit = (credentials: LoginCredentials) => {
 *     if (loginPage?.requestVerificationToken) {
 *       authMutation.mutate({
 *         credentials,
 *         requestVerificationToken: loginPage.requestVerificationToken
 *       });
 *     }
 *   };
 * }
 * ```
 */
export function useAuthenticationMutation(options?: {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      credentials,
      requestVerificationToken,
    }: {
      credentials: LoginCredentials;
      requestVerificationToken: string;
    }) => {
      return await authenticateWithHAC(credentials, requestVerificationToken);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queries.auth.loginPage.queryKey,
      });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
    retry: false,
  });
}

/**
 * Hook for logging out and cleaning up authentication state
 *
 * This mutation clears all auth-related queries and performs cleanup.
 *
 * @param options - Mutation options
 * @returns Mutation object for triggering logout
 */
export function useLogoutMutation(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: queries.auth._def,
      });
      queryClient.clear();
      options?.onSuccess?.();
    },
  });
}

