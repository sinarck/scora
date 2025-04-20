import React from "react";
import { Controller, FormProvider } from "react-hook-form";
import { Text, View } from "react-native";

const Form = FormProvider;

const FormField = ({ ...props }: any) => {
  return <Controller {...props} />;
};

const FormItem = ({ children }: { children: React.ReactNode }) => {
  return <View>{children}</View>;
};

const FormLabel = ({ children }: { children: React.ReactNode }) => {
  return <Text>{children}</Text>;
};

const FormControl = ({ children }: { children: React.ReactNode }) => {
  return <View>{children}</View>;
};

const FormDescription = ({ children }: { children: React.ReactNode }) => {
  return <Text>{children}</Text>;
};

const FormMessage = ({ children }: { children?: React.ReactNode }) => {
  return <Text>{children}</Text>;
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

