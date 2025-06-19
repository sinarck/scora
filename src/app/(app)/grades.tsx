import tw from "@/lib/ui/tw";
import { Text, View } from "react-native";

export default function Grades() {
  return (
    <View
      style={tw`flex-1 justify-center items-center bg-red-500 dark:bg-blue-500`}
    >
      <Text>Grades</Text>
    </View>
  );
}
