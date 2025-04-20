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
          tw`h-12 w-full px-3 rounded-md border bg-background`,
          className,
        ]}
        textAlignVertical="center"
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;

