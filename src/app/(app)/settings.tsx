import tw from "@/lib/ui/tw";
import { Text, View } from "react-native";

export default function Settings() {
  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-50`}>
      <Text style={tw`text-2xl font-bold text-gray-900 mb-8`}>Settings</Text>
    </View>
  );
}
