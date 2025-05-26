import SensorSquare from "@/components/sensor-square";
import { Button } from "@/components/ui/button";
import tw from "@/lib/tw";
import {
  Blur,
  Canvas,
  Fill,
  RadialGradient,
  vec,
} from "@shopify/react-native-skia";
import { useQuery } from "@tanstack/react-query";
import IDOMParser from "advanced-html-parser";

import axios from "axios";
import { toast } from "burnt";
import { router } from "expo-router";
import { Text, View, useWindowDimensions } from "react-native";

export default function App() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  // Heartbeat check (see if we can establish a connection to HAC)
  const { isError } = useQuery({
    queryKey: ["heartbeat"],
    queryFn: async () => {
      const res = await axios.get(process.env.EXPO_PUBLIC_API_URL || "");
      const doc = IDOMParser.parse(res.data);
      const tokenInput = doc.documentElement.querySelector(
        'input[name="__RequestVerificationToken"]'
      );

      if (!tokenInput) {
        throw new Error("No token input found");
      }

      return tokenInput.getAttribute("value");
    },
  });

  if (isError) {
    toast({
      title: "Can't connect to HAC",
      message: "Check your internet",
      preset: "error",
      haptic: "error",
      duration: 5,
    });
  }

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

      {/* Welcome content */}
      <View style={tw`flex-1 justify-center items-center`}>
        {/* Animated sensor square */}
        <SensorSquare />

        {/* You can add more welcome screen content here, e.g. title, subtitle, buttons */}
        <Text style={tw`text-primary dark:text-white text-2xl mt-8 font-bold`}>
          Welcome to Acumen
        </Text>

        <Text style={tw`dark:text-white text-base mt-2 opacity-70`}>
          A new way to track your grades
        </Text>

        <Button
          variant="outline"
          style={tw`mt-4 w-60`}
          hapticFeedback="light"
          onPress={() => router.replace("/sign-in")}
        >
          Get started
        </Button>
      </View>
    </View>
  );
}

