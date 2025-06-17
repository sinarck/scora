import { useSession } from "@/lib/auth-context";
import tw from "@/lib/tw";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function SignIn() {
  const { signIn } = useSession();
  return (
    <View style={tw`flex-1 justify-center items-center dark:bg-black`}>
      <Text
        onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace("/");
        }}
      >
        Log In
      </Text>
    </View>
  );
}

