import tw from "@/lib/tailwind";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={tw`flex-1 justify-center items-center bg-light-background dark:bg-dark-background p-4`}
    >
      <Text style={tw`text-lg text-light-text dark:text-dark-text text-center`}>
        Welcome to Acumen
      </Text>
    </View>
  );
}

