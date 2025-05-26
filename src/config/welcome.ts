export interface WelcomeParagraph {
  text: string;
}

// Special word styling configuration
export interface WordStyle {
  word: string;
  icon?: {
    name: string;
    library: "Ionicons" | "MaterialIcons" | "Feather";
    color?: string;
  };
  appIcon?: boolean; // For rendering the app icon
  style?: "highlight" | "accent" | "bold";
}

export const SPECIAL_WORDS: WordStyle[] = [
  {
    word: "Acumen",
    appIcon: true,
    style: "highlight",
  },
  {
    word: "journey",
    icon: {
      name: "rocket",
      library: "Ionicons",
      color: "#f59e0b",
    },
    style: "accent",
  },
  {
    word: "visualizations",
    icon: {
      name: "bar-chart",
      library: "Ionicons",
      color: "#06b6d4",
    },
    style: "accent",
  },
  {
    word: "insights",
    icon: {
      name: "bulb",
      library: "Ionicons",
      color: "#8b5cf6",
    },
    style: "accent",
  },
  {
    word: "achievements",
    icon: {
      name: "trophy",
      library: "Ionicons",
      color: "#eab308",
    },
    style: "accent",
  },
];

export const WELCOME_PARAGRAPHS: WelcomeParagraph[] = [
  {
    text: "Welcome to Acumen",
  },
  {
    text: "The most beautiful and intuitive way to track your academic journey. See your grades, progress, and achievements like never before.",
  },
  {
    text: "Experience education data with elegant visualizations, powerful insights, and seamless tracking.",
  },
];

export const ANIMATION_CONFIG = {
  WORD_DELAY: 200, // milliseconds between words
  ANIMATION_DURATION: 800, // duration of each word animation
  PARAGRAPH_GAP: 600, // gap between paragraphs
  TRANSLATE_Y_DISTANCE: 4, // pixels to move up during animation
} as const;

