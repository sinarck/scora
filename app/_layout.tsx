import tw from "@/lib/tailwind";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: tw`bg-light-background dark:bg-dark-background`,
        headerTintColor: tw.color("light-text dark:text-dark-text"),
        contentStyle: tw`bg-light-background dark:bg-dark-background`,
      }}
    />
  );
}

