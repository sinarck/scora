import { useSession } from "@/lib/auth/auth-context";
import { TextInput } from "@/lib/ui/text-input";
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
  TouchableOpacity,
  View,
} from "react-native";
import type { z } from "zod";

type LoginFormData = z.infer<typeof loginSchema>;

export default function SignIn() {
  const { signIn } = useSession();
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
          message: "Invalid credentials",
        });
      }
    } catch (error) {
      console.error("Login error:", error);

      setError("root", {
        type: "manual",
        message: "Connection error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={tw`flex-1 bg-black`}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={tw`flex-grow justify-center px-6`}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`max-w-sm w-full mx-auto`}>
          {/* Logo/Brand */}
          <View style={tw`items-center mb-12`}>
            <View
              style={tw`w-16 h-16 bg-blue-500 rounded-2xl items-center justify-center mb-4`}
            >
              <Text style={tw`text-white text-2xl font-bold`}>S</Text>
            </View>
            <Text style={tw`text-white text-2xl font-bold mb-2`}>Scora</Text>
            <Text style={tw`text-gray-400 text-sm`}>Access your grades</Text>
          </View>

          {/* Form */}
          <View>
            {/* Username Field */}
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Username"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="username"
                  textContentType="username"
                  error={errors.username?.message}
                />
              )}
            />

            {/* Password Field */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Password"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="password"
                  textContentType="password"
                  error={errors.password?.message}
                />
              )}
            />

            {/* Error Message */}
            {errors.root && (
              <View
                style={tw`bg-red-900 border border-red-800 rounded-xl p-4 mb-6`}
              >
                <Text style={tw`text-red-400 text-sm text-center`}>
                  {errors.root.message}
                </Text>
              </View>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={tw`w-full py-4 bg-blue-600 rounded-xl`}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <View style={tw`flex-row items-center justify-center`}>
                  <ActivityIndicator size="small" color="white" />
                  <Text style={tw`text-white font-semibold ml-3`}>
                    Signing in...
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
          <View style={tw`mt-8 pt-6 border-t border-gray-800`}>
            <Text style={tw`text-gray-500 text-center text-xs`}>
              Secure authentication via HTTPS
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

