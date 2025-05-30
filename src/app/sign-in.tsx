import DistrictModal from "@/components/district";
import { Button } from "@/components/ui/button";
import { District, districts } from "@/config/districts";
import tw from "@/lib/tw";
import { Ionicons } from "@expo/vector-icons";
import {
  Blur,
  Canvas,
  Fill,
  RadialGradient,
  vec,
} from "@shopify/react-native-skia";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface FormData {
  username: string;
  password: string;
  district: string;
}

export default function SignIn() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [isDistrictModalVisible, setIsDistrictModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
      district: "",
    },
  });

  const selectedDistrict = watch("district");

  const filteredDistricts = districts.filter((district) =>
    district.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onSubmit = (data: FormData) => {
    console.log("Sign in data:", data);
    // Handle sign in logic here
  };

  const selectDistrict = (district: District) => {
    setValue("district", district.name);
    setIsDistrictModalVisible(false);
    setSearchQuery("");
  };

  const fadeIn = useSharedValue(0);
  const translateY = useSharedValue(20);

  React.useEffect(() => {
    fadeIn.value = withTiming(1, { duration: 800 });
    translateY.value = withTiming(0, { duration: 800 });
  }, [fadeIn, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={tw`flex-1`}>
      {/* Background gradient/blur */}
      <Canvas style={tw`absolute inset-0`}>
        <Fill>
          <RadialGradient
            c={vec(windowWidth / 2, windowHeight / 2)}
            r={windowWidth / 1.5}
            colors={["#252525", "#000000"]}
          />
          <Blur blur={50} />
        </Fill>
      </Canvas>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
        <View style={tw`flex-1`}>
          {/* Header */}
          <View style={tw`pt-16 px-8`}>
            <Pressable
              onPress={() => router.back()}
              style={tw`w-10 h-10 rounded-full bg-secondary/50 items-center justify-center mb-8`}
            >
              <Ionicons name="arrow-back" size={20} color="#ffffff" />
            </Pressable>

            <Animated.View style={animatedStyle}>
              <Text style={tw`text-white text-3xl font-bold mb-2`}>
                Welcome back
              </Text>
              <Text style={tw`text-white/70 text-lg mb-8`}>
                Sign in to your account
              </Text>
            </Animated.View>
          </View>

          {/* Form */}
          <Animated.View style={[tw`flex-1 px-8`, animatedStyle]}>
            <View style={tw`gap-6`}>
              {/* Username Field */}
              <View>
                <Text style={tw`text-white/90 text-base font-medium mb-3`}>
                  Student ID
                </Text>
                <Controller
                  control={control}
                  name="username"
                  rules={{
                    required: "Student ID is required",
                    pattern: {
                      value: /^\d{6}$/,
                      message: "Student ID must be exactly 6 digits",
                    },
                  }}
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
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 1,
                      message: "Password is required",
                    },
                  }}
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
                  rules={{ required: "Please select your school district" }}
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
          </Animated.View>
        </View>
      </KeyboardAvoidingView>

      {/* District Selection Modal */}
      <DistrictModal
        visible={isDistrictModalVisible}
        onClose={() => setIsDistrictModalVisible(false)}
        districts={districts}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectDistrict={selectDistrict}
        filteredDistricts={filteredDistricts}
        errors={errors}
      />
    </View>
  );
}

