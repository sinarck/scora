import { options } from "@/config/headers";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack screenOptions={options}>
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Stack>
  );
}
