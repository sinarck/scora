import { ANIMATION_CONFIG } from "@/config/welcome";
import tw from "@/lib/tw";
import { getWordStyle } from "@/lib/welcome-utils";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

interface AnimatedWordProps {
  word: string;
  index: number;
  paragraphDelay: number;
}

export const AnimatedWord = ({
  word,
  index,
  paragraphDelay,
}: AnimatedWordProps) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(
    ANIMATION_CONFIG.TRANSLATE_Y_DISTANCE as number
  );

  useEffect(() => {
    const delay = paragraphDelay + index * ANIMATION_CONFIG.WORD_DELAY;
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: ANIMATION_CONFIG.ANIMATION_DURATION })
    );
    translateY.value = withDelay(
      delay,
      withTiming(0, { duration: ANIMATION_CONFIG.ANIMATION_DURATION })
    );
  }, [index, paragraphDelay, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const wordStyle = getWordStyle(word);
  const hasIcon = wordStyle?.icon || wordStyle?.appIcon;

  // Get text styling based on word type
  const getTextStyle = () => {
    const baseStyle = tw`text-white/90 text-2xl font-medium leading-relaxed`;

    if (!wordStyle) return baseStyle;

    switch (wordStyle.style) {
      case "highlight":
        return [baseStyle, tw`text-white font-bold`];
      case "accent":
        return [baseStyle, tw`font-semibold`];
      case "bold":
        return [baseStyle, tw`font-bold`];
      default:
        return baseStyle;
    }
  };

  if (hasIcon) {
    return (
      <Animated.View style={[tw`flex-row items-center mb-1`, animatedStyle]}>
        {/* Icon or App Icon */}
        {wordStyle?.appIcon ? (
          <View
            style={[
              tw`w-8 h-8 rounded-lg mr-2 items-center justify-center shadow-lg`,
              { backgroundColor: "#1E1E1F" },
            ]}
          >
            <Image
              source={require("../../assets/images/icon.png")}
              style={tw`w-6 h-6`}
              contentFit="contain"
            />
          </View>
        ) : wordStyle?.icon ? (
          <View style={tw`mr-2`}>
            <Ionicons
              name={wordStyle.icon.name as any}
              size={20}
              color={wordStyle.icon.color || "#ffffff"}
            />
          </View>
        ) : null}

        {/* Word Text */}
        <Animated.Text style={[getTextStyle()]}>{word}</Animated.Text>
      </Animated.View>
    );
  }

  // Regular word without icon
  return (
    <Animated.Text style={[getTextStyle(), animatedStyle]}>
      {word}
    </Animated.Text>
  );
};

