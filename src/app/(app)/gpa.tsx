import { Text, View } from "react-native";

export default function GPA() {
  return (
    <View className="flex-1 items-center justify-center bg-neutral-100 p-6 dark:bg-background">
      <Text className="font-display mb-8 text-2xl text-neutral-900 dark:text-neutral-100">
        GPA
      </Text>
      <Text className="font-body text-center text-neutral-600 dark:text-neutral-400">
        Your Grade Point Average and academic standing
      </Text>
    </View>
  );
}
