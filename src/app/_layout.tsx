import { queryClient } from "@/lib/client";
import tw from "@/lib/tw";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { PostHogProvider } from "posthog-react-native";
import { useEffect } from "react";

import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  const [loaded, error] = useFonts({
    "Satoshi-Black": require("../../assets/fonts/Satoshi-Black.otf"),
    "Satoshi-Bold": require("../../assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-Medium": require("../../assets/fonts/Satoshi-Medium.otf"),
    "Satoshi-Regular": require("../../assets/fonts/Satoshi-Regular.otf"),
    "Satoshi-Light": require("../../assets/fonts/Satoshi-Light.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PostHogProvider apiKey="phc_FJxD6bI5W5CdWT2IdZfl3m9OB2IU0sOP8U2z0lpZS4c">
        <View style={tw`flex-1 font-sans`}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </View>
      </PostHogProvider>
    </QueryClientProvider>
  );
}

