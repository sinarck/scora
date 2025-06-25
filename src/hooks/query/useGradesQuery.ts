import { useSession } from "@/lib/auth/auth-context";
import { queries } from "@/lib/query/keys";
import { fetchGrades } from "@/services/hac-api";
import { useQuery } from "@tanstack/react-query";

export function useGradesQuery() {
  const { session } = useSession();

  return useQuery({
    ...queries.grades.all,
    queryFn: () => fetchGrades(session!),
    enabled: !!session,
  });
}

