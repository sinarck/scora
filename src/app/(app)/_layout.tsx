import { useSession } from "@/lib/auth-context";
import { router, Stack } from "expo-router";

export default function AppLayout() {
  const { session } = useSession();

  if (!session) {
    router.replace("/login");
  }

  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}

