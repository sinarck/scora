import tw from "@/lib/tw";
import React from "react";
import { Pressable, PressableProps } from "react-native";
import { Text } from "./text";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends PressableProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const getButtonStyles = (variant: ButtonVariant, size: ButtonSize) => {
  const baseStyles = tw`flex items-center justify-center rounded-md`;
  const variantStyles = {
    default: tw`bg-primary active:opacity-90`,
    destructive: tw`bg-destructive active:opacity-90`,
    outline: tw`border border-input bg-background active:bg-accent`,
    secondary: tw`bg-secondary active:opacity-80`,
    ghost: tw`active:bg-accent`,
    link: tw``,
  };
  const sizeStyles = {
    default: tw`h-12 px-5 py-3`,
    sm: tw`h-9 rounded-md px-3`,
    lg: tw`h-14 px-8`,
    icon: tw`h-10 w-10`,
  };

  return tw.style(baseStyles, variantStyles[variant], sizeStyles[size]);
};

const getTextStyles = (variant: ButtonVariant, size: ButtonSize) => {
  const baseStyles = tw`text-base font-medium`;
  const variantStyles = {
    default: tw`text-primary-foreground`,
    destructive: tw`text-destructive-foreground`,
    outline: tw`text-foreground`,
    secondary: tw`text-secondary-foreground`,
    ghost: tw`text-foreground`,
    link: tw`text-primary`,
  };
  const sizeStyles = {
    default: tw``,
    sm: tw`text-sm`,
    lg: tw`text-lg`,
    icon: tw``,
  };

  return tw.style(baseStyles, variantStyles[variant], sizeStyles[size]);
};

export const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(
  (
    {
      className,
      variant = "default",
      size = "default",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const buttonStyles = getButtonStyles(variant, size);
    const textStyles = getTextStyles(variant, size);

    return (
      <Pressable
        ref={ref}
        style={[buttonStyles, disabled && tw`opacity-50`, className]}
        disabled={disabled}
        {...props}
      >
        {typeof children === "string" ? (
          <Text style={textStyles}>{children}</Text>
        ) : (
          children
        )}
      </Pressable>
    );
  }
);

Button.displayName = "Button";

