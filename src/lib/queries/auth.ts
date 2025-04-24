import { useQuery } from "@tanstack/react-query";
import * as Burnt from "burnt";
import { apiService } from "../api/api.service";

export const VERIFICATION_TOKEN_QUERY_KEY = ["verificationToken"];

export const useVerificationToken = () => {
  return useQuery({
    queryKey: VERIFICATION_TOKEN_QUERY_KEY,
    queryFn: async () => {
      const token = await apiService.getVerificationToken();

      if (!token) {
        Burnt.toast({
          title: "Something went wrong",
          message: "Connection to HAC failed",
          preset: "error",
        });

        throw new Error("Failed to fetch verification token");
      }

      return token;
    },
    staleTime: Infinity, // Token never goes stale
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    retry: false,
  });
};

