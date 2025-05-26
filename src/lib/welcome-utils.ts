import {
  ANIMATION_CONFIG,
  SPECIAL_WORDS,
  WELCOME_PARAGRAPHS,
  type WelcomeParagraph,
  type WordStyle,
} from "@/config/welcome";

export interface ParagraphWithDelay extends WelcomeParagraph {
  delay: number;
}

export const calculateParagraphDelays = (): ParagraphWithDelay[] => {
  return WELCOME_PARAGRAPHS.map((paragraph, index) => {
    let delay = 0;

    // Calculate delay based on previous paragraphs
    for (let i = 0; i < index; i++) {
      const previousWordCount = WELCOME_PARAGRAPHS[i].text.split(" ").length;
      const previousDuration = previousWordCount * ANIMATION_CONFIG.WORD_DELAY;
      delay += previousDuration + ANIMATION_CONFIG.PARAGRAPH_GAP;
    }

    return {
      ...paragraph,
      delay,
    };
  });
};

// Find special styling for a word (case-insensitive)
export const getWordStyle = (word: string): WordStyle | undefined => {
  const cleanWord = word.toLowerCase().replace(/[.,!?;:]$/, ""); // Remove punctuation
  return SPECIAL_WORDS.find((style) => style.word.toLowerCase() === cleanWord);
};

// Check if a word should have special treatment
export const isSpecialWord = (word: string): boolean => {
  return getWordStyle(word) !== undefined;
};

