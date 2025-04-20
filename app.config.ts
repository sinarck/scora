import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
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
    backgroundColor: "#161618",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    userInterfaceStyle: "dark",
    bundleIdentifier: "org.acumen.app",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#161618",
    },
    userInterfaceStyle: "dark",
    package: "org.acumen.app",
  },
  web: {
    favicon: "./assets/images/favicon.png",
  },
  extra: {
    eas: {
      projectId: "e60c5ae1-c77b-4403-86dd-6cd08378db7e",
    },
  },
  plugins: ["expo-quick-actions", "expo-font"],
});

