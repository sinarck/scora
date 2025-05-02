module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Satoshi-Regular"],
        light: ["Satoshi-Light"],
        medium: ["Satoshi-Medium"],
        bold: ["Satoshi-Bold"],
        black: ["Satoshi-Black"],
      },
      colors: {
        // Backgrounds & Surfaces
        background: "#1E1E1F",
        surface: "#1A1A24",
        "surface-hover": "#242430",
        border: "#303040",
        input: "#303040",

        // Text & Content
        primary: "#7B61FF",
        "primary-foreground": "#FFFFFF",
        secondary: "#A0A0B8",
        "secondary-foreground": "#FFFFFF",
        foreground: "#F0F0F5",
        "foreground-muted": "#A0A0B8",

        // Accent Colors
        accent: {
          DEFAULT: "#7B61FF",
          foreground: "#FFFFFF",
          hover: "#9D8BFF",
          pressed: "#5C4AE0",
          subtle: "#2A2640",
        },

        // Functional Colors
        destructive: "#EF4444",
        "destructive-foreground": "#FFFFFF",
        success: "#10B981",
        warning: "#FBBF24",
        error: "#EF4444",
      },
    },
  },
  plugins: [],
};

