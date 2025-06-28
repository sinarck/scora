import { cn } from "@/lib/utils";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Pressable, Text, type PressableProps } from "react-native";

const buttonVariants = cva(
  "flex-row items-center justify-center rounded-lg shadow-lg web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-blue-500 web:focus-visible:ring-offset-2 disabled:opacity-50 disabled:web:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 active:bg-blue-700 border border-blue-500 active:border-blue-600",
        destructive: "bg-red-500 active:bg-red-600",
        outline:
          "border border-neutral-700 bg-transparent active:bg-neutral-800 disabled:border-neutral-600",
        secondary: "bg-neutral-700 active:bg-neutral-600",
        ghost: "bg-transparent active:bg-neutral-800 disabled:bg-transparent",
        link: "bg-transparent active:bg-transparent disabled:bg-transparent",
      },
      size: {
        default: "h-12 native:h-14 px-4 py-2",
        sm: "h-9 native:h-10 px-3 py-1",
        lg: "h-14 native:h-16 px-8 py-3",
        icon: "h-12 native:h-14 w-12 native:w-14 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const buttonTextVariants = cva("font-semibold", {
  variants: {
    variant: {
      default: "text-text",
      destructive: "text-text",
      outline: "text-text",
      secondary: "text-text",
      ghost: "text-text",
      link: "text-blue-500 underline",
    },
    size: {
      default: "font-body text-base native:text-lg",
      sm: "font-body text-sm native:text-base",
      lg: "font-body text-lg native:text-xl",
      icon: "font-body text-base native:text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonVariants> {
  className?: string;
  textClassName?: string;
  children: React.ReactNode;
  loading?: boolean;
}

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(function Button(
  {
    className,
    textClassName,
    variant,
    size,
    children,
    loading = false,
    disabled,
    ...props
  },
  ref,
) {
  const isDisabled = disabled || loading;

  const getSpinnerColor = () => {
    if (variant === "outline" || variant === "ghost" || variant === "link") {
      return "#000000"; // black for light variants
    }
    return "#ffffff"; // white for default and destructive variants
  };

  return (
    <Pressable
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <EvilIcons name="spinner-3" size={24} color={getSpinnerColor()} />
      ) : typeof children === "string" ? (
        <Text
          className={cn(buttonTextVariants({ variant, size, className: textClassName }))}
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
