import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Acumen",
  slug: "acumen",
  scheme: "acumen",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "dark",
  newArchEnabled: true,
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#111119",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    userInterfaceStyle: "dark",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#111119",
    },
    userInterfaceStyle: "dark",
  },
  web: {
    favicon: "./assets/images/favicon.png",
  },
});

