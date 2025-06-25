import { cn } from "@/lib/utils";
import * as React from "react";
import { TextInput, type TextInputProps } from "react-native";

const Input = React.forwardRef<
  TextInput,
  TextInputProps & {
    className?: string;
    placeholderClassName?: string;
  }
>(({ className, placeholderClassName, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      className={cn(
        "web:flex h-12 native:h-14 web:w-full rounded-lg border-neutral-200 bg-neutral-100 dark:border-neutral-800 shadow-lg border dark:bg-neutral-900 px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-neutral-950 dark:text-neutral-100 web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-blue-500 web:focus-visible:ring-offset-2",
        props.editable === false && "opacity-50 web:cursor-not-allowed",
        className
      )}
      placeholderClassName={cn("text-muted", placeholderClassName)}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;

