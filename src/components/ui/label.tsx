import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import tw from "../../lib/tw";

export interface LabelProps {
  className?: StyleProp<TextStyle>;
  children: React.ReactNode;
  htmlFor?: string;
}

const Label = React.forwardRef<Text, LabelProps>(
  ({ className, children, htmlFor, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        style={[
          tw`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`,
          className,
        ]}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

Label.displayName = "Label";

export default Label;
