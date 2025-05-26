import tw from "@/lib/tw";
import { calculateParagraphDelays } from "@/lib/welcome-utils";
import { Text, View } from "react-native";
import { AnimatedWord } from "./animated-word";

export const WelcomeText = () => {
  const paragraphs = calculateParagraphDelays();

  return (
    <View style={tw`w-full`}>
      {paragraphs.map((paragraph, paragraphIndex) => (
        <View key={paragraphIndex} style={paragraphIndex > 0 && tw`mt-6`}>
          <View style={tw`flex-row flex-wrap`}>
            {paragraph.text.split(" ").map((word, wordIndex) => (
              <View key={`${paragraphIndex}-${wordIndex}`} style={tw`flex-row`}>
                <AnimatedWord
                  word={word}
                  index={wordIndex}
                  paragraphDelay={paragraph.delay}
                />
                {wordIndex < paragraph.text.split(" ").length - 1 && (
                  <Text style={tw`text-white/90 text-2xl font-medium`}> </Text>
                )}
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

