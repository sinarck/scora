import { useSession } from "@/lib/auth/auth-context";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { session, signOut } = useSession();

  return (
    <View className="flex-1 justify-center items-center bg-gray-50 dark:bg-gray-900 p-6">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Welcome to Scora
      </Text>

      <Text className="text-gray-600 dark:text-gray-400 text-center mb-8">
        Your grades and academic progress at your fingertips
      </Text>

      <Text className="text-gray-600 dark:text-gray-400 text-center mb-8">
        {JSON.stringify(session?.cookies, null, 2)}
      </Text>

      <TouchableOpacity
        className="bg-red-500 px-6 py-3 rounded-lg"
        onPress={signOut}
      >
        <Text className="text-white font-semibold">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

