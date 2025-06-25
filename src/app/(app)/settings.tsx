import Button from "@/components/ui/button";
import { useSession } from "@/lib/auth/auth-context";
import { Text, View } from "react-native";

export default function Settings() {
  const { signOut } = useSession();

  return (
    <View className="flex-1 justify-center items-center bg-neutral-100 dark:bg-background p-6">
      <Text className="text-2xl font-display text-neutral-900 dark:text-neutral-100 mb-8">
        Settings
      </Text>
      <Text className="text-neutral-600 dark:text-neutral-400 text-center font-body">
        Configure your app preferences and account settings
      </Text>
      <Button variant="destructive" onPress={signOut}>
        Sign out
      </Button>
    </View>
  );
}

