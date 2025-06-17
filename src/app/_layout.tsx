import { Stack } from "expo-router";
import { StrictMode } from "react";
import tw, { useDeviceContext } from "twrnc";

export default function RootLayout() {
  useDeviceContext(tw);

  return (
    <StrictMode>
      <Stack />
    </StrictMode>
  );
}

