import { queryClient } from "@/lib/client";
import tw from "@/lib/tw";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { PostHogProvider } from "posthog-react-native";
import { View } from "react-native";

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

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

