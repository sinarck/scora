import tw from "@/lib/tw";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View style={tw`flex-1 justify-center items-center bg-background p-4`}>
      <Text style={tw`text-lg text-primary text-center`}>
        Welcome to Acumen
      </Text>
    </View>
  );
}

