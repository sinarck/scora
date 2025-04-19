import tw from "@/lib/tw";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: tw`bg-background`,
        headerTintColor: tw.color("text-primary"),
        headerTitleStyle: tw`text-primary`,
        contentStyle: tw`bg-background`,
      }}
    />
  );
}

