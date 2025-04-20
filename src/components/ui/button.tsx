import React from "react";
import { Pressable, StyleProp, Text, TextStyle, ViewStyle } from "react-native";
import tw from "../../lib/tw";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ComponentProps<typeof Pressable> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(
  (
    {
      variant = "default",
      size = "default",
      style,
      textStyle,
      children,
      ...props
    },
    ref
  ) => {
    const getButtonStyles = (): StyleProp<ViewStyle> => {
      const baseStyles = tw`flex-row items-center justify-center rounded-md`;
      const variantStyles = {
        default: tw`bg-primary`,
        destructive: tw`bg-destructive`,
        outline: tw`border border-input bg-background`,
        secondary: tw`bg-secondary`,
        ghost: tw`bg-transparent`,
        link: tw`bg-transparent`,
      };
      const sizeStyles = {
        default: tw`h-10 px-4`,
        sm: tw`h-9 px-3`,
        lg: tw`h-11 px-8`,
        icon: tw`h-10 w-10`,
      };

      return cn(baseStyles, variantStyles[variant], sizeStyles[size], style);
    };

    const getTextStyles = (): StyleProp<TextStyle> => {
      const baseStyles = tw`text-sm font-medium`;
      const variantStyles = {
        default: tw`text-primary-foreground`,
        destructive: tw`text-destructive-foreground`,
        outline: tw`text-foreground`,
        secondary: tw`text-secondary-foreground`,
        ghost: tw`text-foreground`,
        link: tw`text-primary`,
      };

      return cn(baseStyles, variantStyles[variant], textStyle);
    };

    return (
      <Pressable
        ref={ref}
        style={({ pressed }) => [
          getButtonStyles(),
          pressed && tw`opacity-90`,
          props.disabled && tw`opacity-50`,
        ]}
        {...props}
      >
        <Text style={getTextStyles()}>{children}</Text>
      </Pressable>
    );
  }
);

Button.displayName = "Button";

export default Button;

