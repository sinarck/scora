import React from "react";
import { StyleProp, TextInput, TextInputProps, TextStyle } from "react-native";
import tw from "../../lib/tw";

export interface InputProps extends TextInputProps {
  className?: StyleProp<TextStyle>;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        style={[
          tw`h-12 w-full px-4 bg-background rounded-lg border border-neutral-800`,
          tw`text-base text-gray-100`,
          className,
        ]}
        placeholderTextColor={tw.color("gray-500")}
        textAlignVertical="center"
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;

