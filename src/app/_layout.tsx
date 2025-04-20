import tw from "@/lib/tw";
import { Stack } from "expo-router";
import { PostHogProvider } from "posthog-react-native";

export default function RootLayout() {
  return (
    <PostHogProvider apiKey="phc_FJxD6bI5W5CdWT2IdZfl3m9OB2IU0sOP8U2z0lpZS4c">
      <Stack
        screenOptions={{
          headerStyle: tw`bg-background`,
          headerTitle: "Home",
          headerLargeTitle: true,
          contentStyle: tw`bg-background`,
        }}
      />
    </PostHogProvider>
  );
}

