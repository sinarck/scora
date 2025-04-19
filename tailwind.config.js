module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Backgrounds & Surfaces
        background: "#111119",
        surface: "#1A1A24",
        "surface-hover": "#242430",
        border: "#303040",

        // Text & Content
        primary: "#F0F0F5",
        econdary: "#A0A0B8",
        tertiary: "#6B6B80",

        // Accent Colors
        accent: {
          primary: "#7B61FF",
          hover: "#9D8BFF",
          pressed: "#5C4AE0",
          subtle: "#2A2640",
        },

        // Functional Colors
        success: "#10B981",
        warning: "#FBBF24",
        error: "#EF4444",
      },
    },
  },
  plugins: [],
};

