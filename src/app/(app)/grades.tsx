import { useGradesQuery } from "@/hooks/query/useGradesQuery";
import tw from "@/lib/ui/tw";
import { Text, View } from "react-native";

export default function Grades() {
  const { data: grades, isLoading, error } = useGradesQuery();

  if (isLoading) return <Text>Loading grades...</Text>;
  if (error) return <Text>Error loading grades</Text>;

  console.log(grades);

  return (
    <View
      style={tw`flex-1 justify-center items-center bg-gray-50 dark:bg-gray-900`}
    >
      <Text style={tw`text-2xl font-bold text-gray-900 dark:text-white mb-8`}>
        Grades
      </Text>
      <View>
        {grades?.currentClasses.map((course) => (
          <View key={course.name}>
            <Text>
              {course.name} - {course.grade}%
            </Text>
            <Text>Last Updated: {course.lastUpdated}</Text>
            {course.assignments.map((assignment) => (
              <Text key={assignment.name}>
                {assignment.name}: {assignment.score}/{assignment.totalPoints}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

