import { useSession } from "@/lib/auth/auth-context";
import tw from "@/lib/ui/tw";
import { Text, View } from "react-native";

export default function Index() {
  const { signOut } = useSession();

  return (
    <View
      style={tw`flex-1 justify-center items-center bg-red-500 dark:bg-blue-500`}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Text onPress={signOut}>Sign Out</Text>
    </View>
  );
}
