import { cn } from "@/lib/utils";
import * as React from "react";
import { Pressable, Text, type PressableProps } from "react-native";

interface ButtonProps extends PressableProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  textClassName?: string;
  children: React.ReactNode;
}

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(function Button(
  {
    className,
    textClassName,
    variant = "default",
    size = "default",
    children,
    ...props
  },
  ref
) {
  const variantStyles = {
    default:
      "bg-blue-600 active:bg-blue-700 disabled:bg-neutral-600 border border-blue-500 active:border-blue-600",
    destructive: "bg-red-500 active:bg-red-600 disabled:bg-neutral-600",
    outline:
      "border border-neutral-700 bg-transparent active:bg-neutral-800 disabled:border-neutral-600",
    secondary: "bg-neutral-700 active:bg-neutral-600 disabled:bg-neutral-600",
    ghost: "bg-transparent active:bg-neutral-800 disabled:bg-transparent",
    link: "bg-transparent active:bg-transparent disabled:bg-transparent",
  };

  const sizeStyles = {
    default: "h-12 native:h-14 px-4 py-2",
    sm: "h-9 native:h-10 px-3 py-1",
    lg: "h-14 native:h-16 px-8 py-3",
    icon: "h-12 native:h-14 w-12 native:w-14 p-0",
  };

  const textVariantStyles = {
    default: "text-text font-semibold",
    destructive: "text-text font-semibold",
    outline: "text-text font-semibold",
    secondary: "text-text font-semibold",
    ghost: "text-text font-semibold",
    link: "text-blue-500 font-semibold underline",
  };

  const textSizeStyles = {
    default: "text-base native:text-lg",
    sm: "text-sm native:text-base",
    lg: "text-lg native:text-xl",
    icon: "text-base native:text-lg",
  };

  return (
    <Pressable
      ref={ref}
      className={cn(
        "flex-row items-center justify-center rounded-lg shadow-lg",
        "web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-blue-500 web:focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:web:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!props.disabled }}
      {...props}
    >
      {typeof children === "string" ? (
        <Text
          className={cn(
            textVariantStyles[variant],
            textSizeStyles[size],
            textClassName
          )}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
});

export default Button;

