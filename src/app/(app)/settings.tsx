import Button from "@/components/ui/button";
import { useSession } from "@/lib/auth/auth-context";
import { Text, View } from "react-native";

export default function Settings() {
  const { signOut } = useSession();

  return (
    <View className="flex-1 items-center justify-center bg-neutral-100 p-6 dark:bg-background">
      <Text className="font-display mb-8 text-2xl text-neutral-900 dark:text-neutral-100">
        Settings
      </Text>
      <Text className="font-body text-center text-neutral-600 dark:text-neutral-400">
        Configure your app preferences and account settings
      </Text>
      <Button variant="destructive" onPress={signOut}>
        Sign out
      </Button>
    </View>
  );
}
