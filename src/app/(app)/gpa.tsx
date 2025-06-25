import { Text, View } from "react-native";

export default function GPA() {
  return (
    <View className="flex-1 justify-center items-center bg-neutral-100 dark:bg-background p-6">
      <Text className="text-2xl font-display text-neutral-900 dark:text-neutral-100 mb-8">
        GPA
      </Text>
      <Text className="text-neutral-600 dark:text-neutral-400 text-center font-body">
        Your Grade Point Average and academic standing
      </Text>
    </View>
  );
}

