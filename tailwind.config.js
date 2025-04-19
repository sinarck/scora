module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        light: {
          text: "#11181C",
          background: "#fff",
          tint: "#0a7ea4",
          icon: "#687076",
          "tab-icon-default": "#687076",
          "tab-icon-selected": "#0a7ea4",
        },
        // Dark theme colors
        dark: {
          text: "#ECEDEE",
          background: "#151718",
          tint: "#fff",
          icon: "#9BA1A6",
          "tab-icon-default": "#9BA1A6",
          "tab-icon-selected": "#fff",
        },
      },
    },
  },
  plugins: [],
};

