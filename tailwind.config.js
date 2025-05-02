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
        // Base colors
        background: "hsl(0 0% 3.9%)",
        foreground: "hsl(0 0% 98%)",
        card: "hsl(0 0% 3.9%)",
        "card-foreground": "hsl(0 0% 98%)",
        popover: "hsl(0 0% 3.9%)",
        "popover-foreground": "hsl(0 0% 98%)",

        // Primary colors
        primary: "hsl(0 72.2% 50.6%)",
        "primary-foreground": "hsl(0 85.7% 97.3%)",

        // Secondary colors
        secondary: "hsl(0 0% 14.9%)",
        "secondary-foreground": "hsl(0 0% 98%)",

        // Muted colors
        muted: "hsl(0 0% 14.9%)",
        "muted-foreground": "hsl(0 0% 63.9%)",

        // Accent colors
        accent: "hsl(0 0% 14.9%)",
        "accent-foreground": "hsl(0 0% 98%)",

        // Destructive colors
        destructive: "hsl(0 62.8% 30.6%)",
        "destructive-foreground": "hsl(0 0% 98%)",

        // Border and input colors
        border: "hsl(0 0% 14.9%)",
        input: "hsl(0 0% 14.9%)",

        // Ring color
        ring: "hsl(0 72.2% 50.6%)",

        // Chart colors
        "chart-1": "hsl(220 70% 50%)",
        "chart-2": "hsl(160 60% 45%)",
        "chart-3": "hsl(30 80% 55%)",
        "chart-4": "hsl(280 65% 60%)",
        "chart-5": "hsl(340 75% 55%)",
      },
      borderRadius: {
        DEFAULT: "0.75rem",
      },
    },
  },
  plugins: [],
};

