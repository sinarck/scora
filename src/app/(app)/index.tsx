import { Calendar } from "@/components/ui/calendar";
import { SafeAreaView, ScrollView } from "react-native";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-neutral-100 dark:bg-background">
      <ScrollView>
        <Calendar />
      </ScrollView>
    </SafeAreaView>
  );
}

