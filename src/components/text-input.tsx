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
      <View
        className={`mb-6 ${containerStyle ? "" : ""}`}
        style={containerStyle}
      >
        {label && (
          <Text className="text-sm font-medium text-gray-300 mb-2">
            {label}
          </Text>
        )}
        <RNTextInput
          ref={ref}
          className={`w-full px-4 py-4 bg-gray-900 border border-gray-800 rounded-xl text-white text-base ${
            error ? "border-red-500" : ""
          }`}
          placeholderTextColor="#6b7280"
          {...props}
        />
        {error && (
          <Text className="text-red-400 text-sm mt-2 ml-1">{error}</Text>
        )}
      </View>
    );
  }
);

TextInput.displayName = "TextInput";

