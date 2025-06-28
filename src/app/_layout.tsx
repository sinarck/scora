import { SessionProvider, useSession } from "@/lib/auth/auth-context";
import { queryClient } from "@/lib/query/client";
import { SplashScreenController } from "@/lib/ui/splash";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StrictMode } from "react";
import "./globals.css";

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
  useReactQueryDevTools(queryClient);

  const { session } = useSession();

  return (
    <StrictMode>
      <StatusBar animated />

      <Stack>
        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={!session}>
          <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </StrictMode>
  );
}
