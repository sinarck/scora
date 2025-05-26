import tw from "@/lib/tw";
import { calculateParagraphDelays } from "@/lib/welcome-utils";
import { View } from "react-native";
import { AnimatedWord } from "./animated-word";

export const WelcomeText = () => {
  const paragraphs = calculateParagraphDelays();

  return (
    <View style={tw`w-full max-w-2xl`}>
      {paragraphs.map((paragraph, paragraphIndex) => (
        <View
          key={paragraphIndex}
          style={tw`${paragraphIndex > 0 ? "mt-6" : ""}`}
        >
          <View style={tw`flex-row flex-wrap`}>
            {paragraph.text.split(" ").map((word, wordIndex) => (
              <AnimatedWord
                key={`${paragraphIndex}-${wordIndex}`}
                word={word}
                index={wordIndex}
                paragraphDelay={paragraph.delay}
                isTitle={paragraph.isTitle}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};
