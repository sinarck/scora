import { Stack } from "expo-router";
import tw, { useDeviceContext } from "twrnc";

export default function RootLayout() {
  useDeviceContext(tw);

  return <Stack />;
}

