import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  name: "Scora",
  slug: "scora",
  scheme: "scora",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#1E1E1F",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "org.scora.app",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#1E1E1F",
    },
    package: "org.scora.app",
  },
  web: {
    favicon: "./assets/images/favicon.png",
  },
  extra: {
    eas: {
      projectId: "e60c5ae1-c77b-4403-86dd-6cd08378db7e",
    },
  },
  experiments: {
    typedRoutes: true,
  },
  plugins: [
    "expo-router",
    "expo-quick-actions",
    "react-native-bottom-tabs",
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
        },
      },
    ],
    [
      "expo-font",
      {
        fonts: [
          "./assets/fonts/Satoshi-Light.otf",
          "./assets/fonts/Satoshi-Regular.otf",
          "./assets/fonts/Satoshi-Medium.otf",
          "./assets/fonts/Satoshi-Bold.otf",
          "./assets/fonts/Satoshi-Black.otf",
        ],
      },
    ],
  ],
});

