import { useHaptics, type FeedbackType } from "@/hooks/useHaptics";
import tw from "@/lib/tw";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { Pressable, PressableProps, Text, ViewStyle } from "react-native";

const buttonVariants = cva("flex items-center justify-center rounded-md", {
  variants: {
    variant: {
      default: "bg-primary active:opacity-90",
      destructive: "bg-destructive active:opacity-90",
      outline: "border border-input active:bg-accent",
      secondary: "bg-secondary border border-border active:opacity-80",
      ghost: "active:bg-accent",
      link: "",
    },
    size: {
      default: "h-14 px-5 py-3 rounded-xl",
      sm: "h-9 rounded-md px-3",
      lg: "h-14 px-8",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const buttonTextVariants = cva("text-base font-medium", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      destructive: "text-destructive-foreground",
      outline: "text-foreground",
      secondary: "text-secondary-foreground",
      ghost: "text-foreground",
      link: "text-primary",
    },
    size: {
      default: "",
      sm: "text-sm",
      lg: "text-lg",
      icon: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonProps
  extends Omit<PressableProps, "style" | "onPress">,
    VariantProps<typeof buttonVariants> {
  style?: ViewStyle | ViewStyle[];
  onPress?: PressableProps["onPress"];
  hapticFeedback?: FeedbackType;
}

export const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(
  (
    {
      variant,
      size,
      children,
      disabled,
      style,
      onPress,
      hapticFeedback,
      ...props
    },
    ref
  ) => {
    const triggerHaptics = useHaptics(hapticFeedback);

    const handlePress = React.useCallback(
      (e: any) => {
        if (hapticFeedback) {
          triggerHaptics();
        }
        onPress?.(e);
      },
      [hapticFeedback, triggerHaptics, onPress]
    );

    return (
      <Pressable
        ref={ref}
        style={[
          tw.style(buttonVariants({ variant, size })),
          disabled && tw`opacity-50`,
          style,
        ]}
        disabled={disabled}
        onPress={handlePress}
        {...props}
      >
        {typeof children === "string" ? (
          <Text style={tw.style(buttonTextVariants({ variant, size }))}>
            {children}
          </Text>
        ) : (
          children
        )}
      </Pressable>
    );
  }
);

Button.displayName = "Button";

