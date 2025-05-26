import {
  ANIMATION_CONFIG,
  WELCOME_PARAGRAPHS,
  type WelcomeParagraph,
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
