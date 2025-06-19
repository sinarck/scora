import { useLoginPageQuery } from "@/hooks/query/useLoginPageQuery";
import { useSession } from "@/lib/auth/auth-context";
import tw from "@/lib/ui/tw";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function SignIn() {
  const { signIn } = useSession();
  const { data, isError, isLoading } = useLoginPageQuery();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error</Text>;
  }

  return (
    <View style={tw`flex-1 justify-center items-center dark:bg-white`}>
      <Text
        onPress={async () => {
          const success = await signIn({
            username: process.env.EXPO_PUBLIC_USERNAME!,
            password: process.env.EXPO_PUBLIC_PASSWORD!,
            token: data!.requestVerificationToken,
          });

          // Only navigate if sign-in was successful
          if (success) {
            router.replace("/");
          }
        }}
      >
        Log In
      </Text>
    </View>
  );
}
