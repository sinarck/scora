import { StyleProp, ViewStyle } from "react-native";

export function cn(
  ...styles: (StyleProp<ViewStyle> | undefined)[]
): StyleProp<ViewStyle> {
  return styles.filter(Boolean) as StyleProp<ViewStyle>;
}
