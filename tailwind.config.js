import { platformSelect } from "nativewind/theme";
const colors = require("./src/config/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      padding: {
        page: "24px",
      },
    },
    fontFamily: {
      body: platformSelect({
        ios: "Urbanist",
        android: "Urbanist_400Regular",
      }),
      // TODO: Fix Space Grotesk font family on iOS
      display: platformSelect({
        ios: "SpaceGrotesk",
        android: "SpaceGrotesk_400Regular",
      }),
    },
    colors,
  },
  plugins: [],
};
