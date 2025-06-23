import { useLoginPageQuery } from "@/hooks/query/useLoginPageQuery";
import { useSession } from "@/lib/auth/auth-context";
import tw from "@/lib/ui/tw";
import { loginSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import type { z } from "zod";

type LoginFormData = z.infer<typeof loginSchema>;

export default function SignIn() {
  const { signIn } = useSession();
  const { isError, isLoading: isPageLoading } = useLoginPageQuery();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);

      const success = await signIn({
        username: data.username,
        password: data.password,
      });

      if (success) {
        router.replace("/");
      } else {
        setError("root", {
          type: "manual",
          message: "Invalid username or password. Please try again.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("root", {
        type: "manual",
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPageLoading) {
    return (
      <View
        style={tw`flex-1 justify-center items-center bg-gray-50 dark:bg-gray-900`}
      >
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={tw`mt-4 text-gray-600 dark:text-gray-400`}>
          Loading login page...
        </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View
        style={tw`flex-1 justify-center items-center bg-gray-50 dark:bg-gray-900`}
      >
        <Text style={tw`text-red-500 text-center px-6`}>
          Failed to load login page. Please check your connection and try again.
        </Text>
        <TouchableOpacity
          style={tw`mt-4 px-6 py-3 bg-blue-500 rounded-lg`}
          onPress={() => window.location.reload()}
        >
          <Text style={tw`text-white font-semibold`}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={tw`flex-1 bg-gray-50 dark:bg-gray-900`}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={tw`flex-grow justify-center px-6`}
        keyboardShouldPersistTaps="handled"
      >
        <View style={tw`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg`}>
          {/* Header */}
          <View style={tw`mb-8`}>
            <Text
              style={tw`text-3xl font-bold text-gray-900 dark:text-white text-center mb-2`}
            >
              Welcome Back
            </Text>
            <Text style={tw`text-gray-600 dark:text-gray-400 text-center`}>
              Sign in to access your grades
            </Text>
          </View>

          {/* Form */}
          <View style={tw`gap-6`}>
            {/* Username Field */}
            <View>
              <Text
                style={tw`text-sm font-medium text-gray-700 dark:text-gray-300 mb-2`}
              >
                Username
              </Text>
              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={tw`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.username ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your username"
                    placeholderTextColor="#9ca3af"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="username"
                    textContentType="username"
                  />
                )}
              />
              {errors.username && (
                <Text style={tw`text-red-500 text-sm mt-1`}>
                  {errors.username.message}
                </Text>
              )}
            </View>

            {/* Password Field */}
            <View>
              <Text
                style={tw`text-sm font-medium text-gray-700 dark:text-gray-300 mb-2`}
              >
                Password
              </Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={tw`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your password"
                    placeholderTextColor="#9ca3af"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="password"
                    textContentType="password"
                  />
                )}
              />
              {errors.password && (
                <Text style={tw`text-red-500 text-sm mt-1`}>
                  {errors.password.message}
                </Text>
              )}
            </View>

            {/* Root Error */}
            {errors.root && (
              <View
                style={tw`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3`}
              >
                <Text style={tw`text-red-600 dark:text-red-400 text-sm`}>
                  {errors.root.message}
                </Text>
              </View>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={tw`w-full py-4 bg-blue-500 rounded-lg ${
                isSubmitting ? "opacity-50" : ""
              }`}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <View style={tw`flex-row items-center justify-center`}>
                  <ActivityIndicator size="small" color="white" />
                  <Text style={tw`text-white font-semibold ml-2`}>
                    Signing In...
                  </Text>
                </View>
              ) : (
                <Text style={tw`text-white font-semibold text-center text-lg`}>
                  Sign In
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View
            style={tw`mt-8 pt-6 border-t border-gray-200 dark:border-gray-700`}
          >
            <Text
              style={tw`text-gray-500 dark:text-gray-400 text-center text-sm`}
            >
              Your credentials are encrypted and secure
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

