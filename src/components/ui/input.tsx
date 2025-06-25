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
        "font-body native:h-14 native:text-lg native:leading-[1.25] text-neutral-950 file:bg-transparent h-12 rounded-lg border border-neutral-200 bg-neutral-100 px-3 text-base shadow-lg file:border-0 file:font-medium web:flex web:w-full web:py-2 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-blue-500 web:focus-visible:ring-offset-2 lg:text-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100",
        props.editable === false && "opacity-50 web:cursor-not-allowed",
        className,
      )}
      placeholderClassName={cn("text-muted", placeholderClassName)}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
