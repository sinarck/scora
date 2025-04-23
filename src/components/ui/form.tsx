import React from "react";
import { Controller, FormProvider } from "react-hook-form";
import { Text, View } from "react-native";
import tw from "../../lib/tw";

const Form = FormProvider;

const FormField = ({ ...props }: any) => {
  return <Controller {...props} />;
};

const FormItem = ({ children }: { children: React.ReactNode }) => {
  return <View style={tw`mb-6`}>{children}</View>;
};

const FormLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text style={tw`text-sm font-medium text-gray-300 mb-2`}>{children}</Text>
  );
};

const FormControl = ({ children }: { children: React.ReactNode }) => {
  return <View style={tw`relative`}>{children}</View>;
};

const FormDescription = ({ children }: { children: React.ReactNode }) => {
  return <Text style={tw`text-sm text-gray-400 mt-1`}>{children}</Text>;
};

const FormMessage = ({ children }: { children?: React.ReactNode }) => {
  if (!children) return null;
  return <Text style={tw`text-sm text-red-400 mt-2`}>{children}</Text>;
};

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
};

