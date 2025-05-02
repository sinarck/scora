import tw from "@/lib/tw";
import {
  Blur,
  Canvas,
  Group,
  LinearGradient,
  RoundedRect,
  Shadow,
  Image as SkiaImage,
  useImage,
  vec,
} from "@shopify/react-native-skia";
import { useCallback } from "react";
import { View } from "react-native";
import {
  Extrapolation,
  SensorType,
  interpolate,
  useAnimatedSensor,
  useDerivedValue,
} from "react-native-reanimated";

const CanvasSize = {
  width: 500,
  height: 500,
};
const SquareSize = 200;
const CanvasCenter = vec(CanvasSize.width / 2, CanvasSize.height / 2);

/**
 * SensorSquare
 * Renders a 3D-animated square that rotates and casts shadows based on device sensors.
 * The logo is rendered in the center and moves with the square.
 */
export default function SensorSquare() {
  // Listen to device rotation (for Y axis)
  const deviceRotation = useAnimatedSensor(SensorType.ROTATION, {
    interval: 20,
  });
  // Listen to gravity (for X axis)
  const rotationGravity = useAnimatedSensor(SensorType.GRAVITY, {
    interval: 20,
  });

  // Interpolate device roll to Y rotation
  const rotateY = useDerivedValue(() => {
    const { roll } = deviceRotation.sensor.value;
    return interpolate(
      roll,
      [-1, 0, 1],
      [Math.PI / 8, 0, -Math.PI / 8],
      Extrapolation.CLAMP
    );
  });

  // Interpolate gravity z to X rotation
  const rotateX = useDerivedValue(() => {
    const { z } = rotationGravity.sensor.value;
    return interpolate(
      z,
      [-9, -6, -1],
      [-Math.PI / 8, 0, Math.PI / 8],
      Extrapolation.CLAMP
    );
  });

  // Shadow offsets based on rotation
  const shadowDx = useDerivedValue(() => {
    return interpolate(
      rotateY.value,
      [-Math.PI / 8, 0, Math.PI / 8],
      [10, 0, -10],
      Extrapolation.CLAMP
    );
  });
  const shadowDy = useDerivedValue(() => {
    return interpolate(
      rotateX.value,
      [-Math.PI / 8, 0, Math.PI / 8],
      [7, 0, 10],
      Extrapolation.CLAMP
    );
  });

  // 3D transform for the square
  const rTransform = useDerivedValue(() => [
    { perspective: 200 },
    { rotateY: rotateY.value },
    { rotateX: rotateX.value },
  ]);

  // Helper: renders the rounded square, optionally with children (e.g. gradients)
  const Square = useCallback(
    ({ children }: { children?: React.ReactNode }) => (
      <RoundedRect
        x={CanvasCenter.x - SquareSize / 2}
        y={CanvasCenter.y - SquareSize / 2}
        width={SquareSize}
        height={SquareSize}
        color="#101010"
        r={35}
      >
        {children}
      </RoundedRect>
    ),
    []
  );

  // Load the logo image for Skia (must be a raster format, e.g. PNG)
  const logo = useImage(require("../../assets/images/icon-transparent.png"));

  return (
    <View style={tw`w-[${CanvasSize.width}px] h-[${CanvasSize.height}px]`}>
      <Canvas
        style={{
          height: CanvasSize.height,
          width: CanvasSize.width,
        }}
      >
        {/* The animated group applies 3D rotation to all children */}
        <Group origin={CanvasCenter} transform={rTransform}>
          <Group>
            {/* The base square */}
            <Square />
            {/* Lighting gradient overlay */}
            <Square>
              <LinearGradient
                start={vec(0, 0)}
                end={vec(0, CanvasSize.height / 1.8)}
                colors={["#2e2e2e", "#0e0e0e"]}
              />
              <Blur blur={10} />
            </Square>
            {/* Shadows for depth */}
            <Shadow color="#4c4c4c" inner blur={0} dx={0} dy={0.8} />
            <Shadow color="#000000" blur={3.5} dx={shadowDx} dy={shadowDy} />
            {/* Centered logo, moves with the square */}
            {logo && (
              <SkiaImage
                image={logo}
                x={CanvasCenter.x - 172 / 2}
                y={CanvasCenter.y - 172 / 2}
                width={172}
                height={172}
                fit="contain"
              />
            )}
          </Group>
        </Group>
      </Canvas>
    </View>
  );
}

