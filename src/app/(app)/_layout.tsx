import { useHaptics } from "@/hooks/useHaptics";
import { useSession } from "@/lib/auth/auth-context";
import { Tabs } from "@/lib/ui/tabs";
import { router } from "expo-router";
import { useRef } from "react";

export default function AppLayout() {
  const { session } = useSession();
  const light = useHaptics("light");
  const currentTabRef = useRef<string | null>(null);

  if (!session) {
    router.replace("/login");
  }

  return (
    <Tabs
      screenListeners={{
        tabPress: (e: any) => {
          const targetTab = e.target?.split("-")[0]; // Extract tab name from target

          // Only trigger haptic if switching to a different tab
          if (targetTab && targetTab !== currentTabRef.current) {
            light();
            currentTabRef.current = targetTab;
          }
        },
      }}
      screenOptions={{
        tabBarActiveTintColor: "red",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => ({ sfSymbol: "house" }),
        }}
      />
      <Tabs.Screen
        name="grades"
        options={{
          title: "Grades",
          tabBarIcon: () => ({ sfSymbol: "chart.bar" }),
        }}
      />
    </Tabs>
  );
}

