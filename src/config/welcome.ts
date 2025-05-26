export interface WelcomeParagraph {
  text: string;
  isTitle: boolean;
}

export const WELCOME_PARAGRAPHS: WelcomeParagraph[] = [
  {
    text: "Welcome to Acumen",
    isTitle: true,
  },
  {
    text: "The most beautiful and intuitive way to track your academic journey. Transform how you see your grades, progress, and achievements.",
    isTitle: false,
  },
  {
    text: "Experience education data like never before with elegant visualizations, smart insights, and seamless grade tracking.",
    isTitle: false,
  },
];

export const ANIMATION_CONFIG = {
  WORD_DELAY: 200, // milliseconds between words
  ANIMATION_DURATION: 800, // duration of each word animation
  PARAGRAPH_GAP: 600, // gap between paragraphs
  TRANSLATE_Y_DISTANCE: 4, // pixels to move up during animation
} as const;
