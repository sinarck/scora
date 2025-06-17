import { useSession } from "@/lib/auth/auth-context";
import tw from "@/lib/ui/tw";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function SignIn() {
  const { signIn } = useSession();

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text
        onPress={() => {
          signIn(
            { username: "jason", password: "password" },
            "1234567890"
          ).then(() => {
            router.replace("/");
          });
        }}
      >
        Log In
      </Text>
    </View>
  );
}

