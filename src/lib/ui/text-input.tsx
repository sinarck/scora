import tw from "@/lib/ui/tw";
import React from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  Text,
  View,
} from "react-native";

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  containerStyle?: any;
}

export const TextInput = React.forwardRef<RNTextInput, TextInputProps>(
  ({ label, error, containerStyle, style, ...props }, ref) => {
    return (
      <View style={[tw`mb-6`, containerStyle]}>
        {label && (
          <Text style={tw`text-sm font-medium text-gray-300 mb-2`}>
            {label}
          </Text>
        )}
        <RNTextInput
          ref={ref}
          style={[
            tw`w-full px-4 py-4 bg-gray-900 border border-gray-800 rounded-xl text-white text-base`,
            error && tw`border-red-500`,
            style,
          ]}
          placeholderTextColor="#6b7280"
          {...props}
        />
        {error && (
          <Text style={tw`text-red-400 text-sm mt-2 ml-1`}>{error}</Text>
        )}
      </View>
    );
  }
);

TextInput.displayName = "TextInput";
