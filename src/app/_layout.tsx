import { SessionProvider, useSession } from "@/lib/auth-context";
import { SplashScreenController } from "@/lib/splash";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PostHogProvider } from "posthog-react-native";
import { StrictMode } from "react";
import tw, { useDeviceContext } from "twrnc";

export default function Root() {
  return (
    <SessionProvider>
      <PostHogProvider apiKey="phc_QaS0R2A6CB2RhBPb1fTGb6a8Hvr00hchSlMSrMUPtZF">
        <SplashScreenController />
        <RootNavigator />
      </PostHogProvider>
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

