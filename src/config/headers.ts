import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import colors from "./colors";

export const options: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: "transparent",
  },
  headerLargeStyle: {
    backgroundColor: "transparent",
  },
  headerTintColor: colors.text,
  headerLargeTitle: true,
  headerBlurEffect: "systemChromeMaterial",
};
