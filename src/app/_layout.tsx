import tw from "@/lib/tw";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { PostHogProvider } from "posthog-react-native";
import { View } from "react-native";

const queryClient = new QueryClient();

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <PostHogProvider apiKey="phc_FJxD6bI5W5CdWT2IdZfl3m9OB2IU0sOP8U2z0lpZS4c">
        <View style={tw`flex-1 font-sans`}>
          <Stack
            screenOptions={{
              headerStyle: tw`bg-background`,
              headerTitleStyle: tw`font-medium text-foreground`,
              headerTitle: "Home",
              headerLargeTitle: true,
              contentStyle: tw`bg-background`,
            }}
          />
        </View>
      </PostHogProvider>
    </QueryClientProvider>
  );
}

