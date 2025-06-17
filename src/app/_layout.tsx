import { SessionProvider, useSession } from "@/lib/auth-context";
import { SplashScreenController } from "@/lib/splash";
import tw from "@/lib/tw";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StrictMode } from "react";
import { useDeviceContext } from "twrnc";

export default function Root() {
  return (
    <SessionProvider>
      <SplashScreenController />
      <RootNavigator />
    </SessionProvider>
  );
}

function RootNavigator() {
  useDeviceContext(tw);
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

