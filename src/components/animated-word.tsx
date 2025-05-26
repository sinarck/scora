import { ANIMATION_CONFIG } from "@/config/welcome";
import tw from "@/lib/tw";
import { useEffect } from "react";
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
  isTitle: boolean;
}

export const AnimatedWord = ({
  word,
  index,
  paragraphDelay,
  isTitle,
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
  }, [index, paragraphDelay]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const isAcumen = word === "Acumen";
  const textStyle = isTitle
    ? isAcumen
      ? tw`text-white text-4xl font-bold`
      : tw`text-white text-4xl font-bold`
    : tw`text-white/90 text-xl font-medium leading-relaxed`;

  return (
    <Animated.Text style={[textStyle, animatedStyle]}>{word} </Animated.Text>
  );
};

