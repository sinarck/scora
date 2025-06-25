import { Text, View } from "react-native";

export default function Grades() {
  return (
    <View className="flex-1 justify-center items-center bg-neutral-100 dark:bg-background p-6">
      <Text className="text-2xl font-display text-neutral-900 dark:text-neutral-100 mb-8">
        Grades
      </Text>
      <Text className="text-neutral-600 dark:text-neutral-400 text-center font-body">
        Your academic performance and course grades will appear here
      </Text>
    </View>
  );
}

