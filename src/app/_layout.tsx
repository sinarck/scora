import { SessionProvider, useSession } from "@/lib/auth/auth-context";
import { queryClient } from "@/lib/query/query-client";
import { SplashScreenController } from "@/lib/ui/splash";
import tw from "@/lib/ui/tw";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StrictMode } from "react";
import { useDeviceContext } from "twrnc";

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <SplashScreenController />
        <RootNavigator />
      </SessionProvider>
    </QueryClientProvider>
  );
}

function RootNavigator() {
  useDeviceContext(tw);
  useReactQueryDevTools(queryClient);

  const { session } = useSession();

  return (
    <StrictMode>
      <StatusBar />

      <Stack>
        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={!session}>
          <Stack.Screen name="login" />
        </Stack.Protected>
      </Stack>
    </StrictMode>
  );
}

