import { queries } from "@/lib/query/query-keys";
import { fetchLoginPage } from "@/services/hac-api";
import { useQuery } from "@tanstack/react-query";

export function useLoginPageQuery() {
  return useQuery({
    ...queries.auth.loginPage,
    queryFn: fetchLoginPage,
  });
}
