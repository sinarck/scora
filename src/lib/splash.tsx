import { useSession } from "@/lib/auth-context";
import { SplashScreen } from "expo-router";

/**
 * Controller component that manages the splash screen visibility.
 * Keeps the splash screen visible until authentication state is loaded.
 */
export function SplashScreenController() {
  const { isLoading } = useSession();

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return null;
}

