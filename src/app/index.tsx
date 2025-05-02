import {
  Blur,
  Canvas,
  Fill,
  Group,
  LinearGradient,
  RadialGradient,
  RoundedRect,
  Shadow,
  vec,
} from "@shopify/react-native-skia";
import { useCallback } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
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

const App = () => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const deviceRotation = useAnimatedSensor(SensorType.ROTATION, {
    interval: 20,
  });

  const rotationGravity = useAnimatedSensor(SensorType.GRAVITY, {
    interval: 20,
  });

  const rotateY = useDerivedValue(() => {
    const { roll } = deviceRotation.sensor.value;
    return interpolate(
      roll,
      [-1, 0, 1],
      [Math.PI / 8, 0, -Math.PI / 8],
      Extrapolation.CLAMP
    );
  });

  const rotateX = useDerivedValue(() => {
    const { z } = rotationGravity.sensor.value;
    return interpolate(
      z,
      [-9, -6, -1],
      [-Math.PI / 8, 0, Math.PI / 8],
      Extrapolation.CLAMP
    );
  });

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

  const rTransform = useDerivedValue(() => {
    return [
      { perspective: 200 },
      { rotateY: rotateY.value },
      { rotateX: rotateX.value },
    ];
  });

  const GoodOldSquare = useCallback(
    ({ children }: { children?: React.ReactNode }) => {
      return (
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
      );
    },
    []
  );

  return (
    <View style={styles.fill}>
      <Canvas style={StyleSheet.absoluteFill}>
        <Fill>
          <RadialGradient
            c={vec(windowWidth / 2, windowHeight / 2)}
            r={windowWidth / 1.5}
            colors={["#252525", "#000000"]}
          />
          <Blur blur={50} />
        </Fill>
      </Canvas>
      <View style={styles.container}>
        <Canvas
          style={{
            height: CanvasSize.height,
            width: CanvasSize.width,
          }}
        >
          <Group origin={CanvasCenter} transform={rTransform}>
            <Group>
              <GoodOldSquare />
              <GoodOldSquare>
                <LinearGradient
                  start={vec(0, 0)}
                  end={vec(0, CanvasSize.height / 1.8)}
                  colors={["#2e2e2e", "#0e0e0e"]}
                />
                <Blur blur={10} />
              </GoodOldSquare>
              <Shadow color="#4c4c4c" inner blur={0} dx={0} dy={0.8} />
              <Shadow color="#000000" blur={3.5} dx={shadowDx} dy={shadowDy} />
            </Group>
          </Group>
        </Canvas>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

