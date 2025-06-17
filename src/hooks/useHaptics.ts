import * as Haptics from "expo-haptics";
import { useMemo } from "react";

type FeedbackType =
  | "selection"
  | "light"
  | "medium"
  | "heavy"
  | "success"
  | "warning"
  | "error";

// Hook for triggering haptic feedback on supported devices
export const useHaptics = (feedbackType: FeedbackType = "selection") => {
  const hapticHandlers = useMemo(() => {
    const createHapticHandler = (type: Haptics.ImpactFeedbackStyle) => {
      return () => Haptics.impactAsync(type);
    };

    const createNotificationFeedback = (
      type: Haptics.NotificationFeedbackType
    ) => {
      return () => Haptics.notificationAsync(type);
    };

    return {
      selection: Haptics.selectionAsync,
      light: createHapticHandler(Haptics.ImpactFeedbackStyle.Light),
      medium: createHapticHandler(Haptics.ImpactFeedbackStyle.Medium),
      heavy: createHapticHandler(Haptics.ImpactFeedbackStyle.Heavy),
      success: createNotificationFeedback(
        Haptics.NotificationFeedbackType.Success
      ),
      warning: createNotificationFeedback(
        Haptics.NotificationFeedbackType.Warning
      ),
      error: createNotificationFeedback(Haptics.NotificationFeedbackType.Error),
    };
  }, []);

  return hapticHandlers[feedbackType];
};

