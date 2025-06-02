import { queryClient } from "@/lib/client";
// import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { PostHogProvider } from "posthog-react-native";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  // useObserver(); // Removed: must be used in a screen, not in RootLayout, due to navigation context requirements
  // useDeviceContext(tw);

  // const [loaded, error] = useFonts({
  //   "Satoshi-Black": require("../../assets/fonts/Satoshi-Black.otf"),
  //   "Satoshi-Bold": require("../../assets/fonts/Satoshi-Bold.otf"),
  //   "Satoshi-Medium": require("../../assets/fonts/Satoshi-Medium.otf"),
  //   "Satoshi-Regular": require("../../assets/fonts/Satoshi-Regular.otf"),
  //   "Satoshi-Light": require("../../assets/fonts/Satoshi-Light.otf"),
  // });

  // useEffect(() => {
  //   if (loaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded, error]);

  // if (!loaded && !error) {
  //   return null;
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <PostHogProvider apiKey="phc_FJxD6bI5W5CdWT2IdZfl3m9OB2IU0sOP8U2z0lpZS4c">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="sign-in" />
        </Stack>
      </PostHogProvider>
    </QueryClientProvider>
  );
}

