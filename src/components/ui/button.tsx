import { useHaptics } from "@/hooks/useHaptics";
import tw from "@/lib/tw";
import { ComponentProps, useCallback, useRef } from "react";
import {
  Animated,
  GestureResponderEvent,
  Platform,
  Pressable,
  StyleProp,
  Text,
  ViewStyle,
} from "react-native";

interface ButtonProps extends Omit<ComponentProps<typeof Pressable>, "style"> {
  variant?: "default" | "destructive" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
}

const Button = ({
  variant = "default",
  size = "default",
  children,
  onPress,
  style,
  ...props
}: ButtonProps) => {
  const hapticFeedback = useHaptics("medium");
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      damping: 15,
      mass: 0.8,
    }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      damping: 15,
      mass: 0.8,
    }).start();
  }, [scaleAnim]);

  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      e?.persist?.();
      hapticFeedback().then(() => {
        onPress?.(e);
      });
    },
    [hapticFeedback, onPress]
  );

  const variantStyles = {
    default: tw`bg-accent ${Platform.OS === "ios" ? "shadow-lg" : ""}`,
    destructive: tw`bg-destructive ${Platform.OS === "ios" ? "shadow-lg" : ""}`,
    outline: tw`border border-border bg-surface/80`,
    ghost: tw`bg-transparent`,
  };

  const sizeStyles = {
    sm: tw`h-9 px-3`,
    default: tw`h-12 px-4`,
    lg: tw`h-14 px-6`,
  };

  const textSizeStyles = {
    sm: tw`text-sm`,
    default: tw`text-base`,
    lg: tw`text-lg`,
  };

  return (
    <Animated.View
      style={[
        tw`rounded-2xl overflow-hidden`,
        { transform: [{ scale: scaleAnim }] },
        style,
      ]}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={({ pressed }) => [
          tw`justify-center items-center rounded-2xl`,
          variantStyles[variant],
          sizeStyles[size],
          variant === "default" && pressed && tw`bg-accent-pressed`,
          variant === "destructive" && pressed && tw`bg-destructive/90`,
          variant === "ghost" && pressed && tw`bg-surface/50`,
          variant === "outline" && pressed && tw`bg-surface/90`,
          Platform.OS === "android" && tw`elevation-2`,
        ]}
        {...props}
      >
        {typeof children === "string" ? (
          <Text
            style={[
              tw`font-medium text-center`,
              textSizeStyles[size],
              variant === "ghost" || variant === "outline"
                ? tw`text-foreground`
                : tw`text-primary-foreground`,
            ]}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </Pressable>
    </Animated.View>
  );
};

export default Button;

