import DistrictModal from "@/components/district";
import { Button } from "@/components/ui/button";
import tw from "@/lib/tw";
import { signInSchema, SignInSchema } from "@/schema/signInSchema";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SignIn() {
  const [isDistrictModalVisible, setIsDistrictModalVisible] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
      district: "",
    },
  });

  const selectedDistrict = watch("district");

  const onSubmit = (data: SignInSchema) => {
    console.log("Sign in data:", data);
    // Handle sign in logic here
  };

  return (
    <ScrollView
      style={tw`bg-background p-8`}
      contentContainerStyle={tw`flex-1`}
      keyboardShouldPersistTaps="handled"
      scrollEnabled={false}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
        <View style={tw`flex-1`}>
          {/* Header */}
          <SafeAreaView style={tw`mt-16`}>
            <Button
              onPress={() => router.back()}
              variant="outline"
              size="icon"
              style={tw`mb-4`}
            >
              <Ionicons name="arrow-back" size={20} color="#ffffff" />
            </Button>

            <View>
              <Text style={tw`text-white text-3xl font-bold mb-2`}>
                Welcome back
              </Text>
              <Text style={tw`text-white/70 text-lg mb-8`}>
                Sign in to your account
              </Text>
            </View>
          </SafeAreaView>

          {/* Form */}
          <View style={tw`flex-1`}>
            <View style={tw`gap-6`}>
              {/* Username Field */}
              <View>
                <Text style={tw`text-white/90 text-base font-medium mb-3`}>
                  Student ID
                </Text>
                <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[
                        tw`bg-input border border-border rounded-xl px-4 py-4 text-white text-lg`,
                        errors.username && tw`border-destructive`,
                      ]}
                      placeholder="123456"
                      placeholderTextColor="#666"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="numeric"
                      maxLength={6}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  )}
                />
                {errors.username && (
                  <Text style={tw`text-destructive text-sm mt-2`}>
                    {errors.username.message}
                  </Text>
                )}
              </View>

              {/* Password Field */}
              <View>
                <Text style={tw`text-white/90 text-base font-medium mb-3`}>
                  Password
                </Text>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[
                        tw`bg-input border border-border rounded-xl px-4 py-4 text-white text-lg`,
                        errors.password && tw`border-destructive`,
                      ]}
                      placeholder="Enter your password"
                      placeholderTextColor="#666"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  )}
                />
                {errors.password && (
                  <Text style={tw`text-destructive text-sm mt-2`}>
                    {errors.password.message}
                  </Text>
                )}
              </View>

              {/* District Field */}
              <View>
                <Text style={tw`text-white/90 text-base font-medium mb-3`}>
                  School District
                </Text>
                <Controller
                  control={control}
                  name="district"
                  render={({ field }) => (
                    <Pressable
                      onPress={() => setIsDistrictModalVisible(true)}
                      style={[
                        tw`bg-input border border-border rounded-xl px-4 py-4 flex-row items-center justify-between`,
                        errors.district && tw`border-destructive`,
                      ]}
                    >
                      <Text
                        style={[
                          tw`text-lg`,
                          selectedDistrict ? tw`text-white` : tw`text-white/50`,
                        ]}
                      >
                        {selectedDistrict || "Select your district"}
                      </Text>
                      <Ionicons name="chevron-down" size={20} color="#666" />
                    </Pressable>
                  )}
                />
                {errors.district && (
                  <Text style={tw`text-destructive text-sm mt-2`}>
                    {errors.district.message}
                  </Text>
                )}
              </View>
            </View>

            {/* Sign In Button */}
            <View style={tw`mt-8 mb-8`}>
              <Button
                variant="default"
                style={tw`w-full`}
                hapticFeedback="light"
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={tw`text-primary-foreground text-lg font-semibold`}>
                  Sign In
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* District Selection Modal */}
      <DistrictModal
        visible={isDistrictModalVisible}
        onClose={() => setIsDistrictModalVisible(false)}
        onSelect={(district) => {
          setValue("district", district.name);
          setIsDistrictModalVisible(false);
        }}
        selectedDistrict={selectedDistrict}
        errors={errors}
      />
    </ScrollView>
  );
}

