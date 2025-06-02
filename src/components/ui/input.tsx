import tw from "@/lib/tw";
import * as React from "react";
import { TextInput, type TextInputProps } from "react-native";

function Input({
  className,
  style,
  ...props
}: TextInputProps & {
  ref?: React.RefObject<TextInput>;
  className?: string;
}) {
  return (
    <TextInput
      style={[
        tw`h-12 w-full rounded-md border border-input bg-background px-3 text-lg text-foreground`,
        props.editable === false && tw`opacity-50`,
        style,
      ]}
      placeholderTextColor={tw.color("text-muted-foreground")}
      {...props}
    />
  );
}

export { Input };

