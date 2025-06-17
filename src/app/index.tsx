import { Text, View } from "react-native";
import tw from "twrnc";

export default function Index() {
  return (
    <View
      style={tw`flex-1 justify-center items-center bg-red-500 dark:bg-blue-500`}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}

