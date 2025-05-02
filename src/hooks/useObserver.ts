import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useEffect } from "react";

/**
 * A hook that listens for notification responses and handles navigation based on notification data.
 * When a notification is received or tapped, it checks for a URL in the notification data and
 * redirects the user to that route using expo-router.
 */
export default function useObserver() {
  useEffect(() => {
    let isMounted = true;

    function redirect(notification: Notifications.Notification) {
      const url = notification.request.content.data?.url;
      if (url) {
        router.push(url);
      }
    }

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return;
      }
      redirect(response?.notification);
    });

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        redirect(response.notification);
      }
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
}

