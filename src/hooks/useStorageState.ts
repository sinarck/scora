import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useReducer } from "react";
import { Platform } from "react-native";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

/**
 * Internal hook for managing async state with loading indicator.
 * @template T - The type of the state value
 */
function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
  return useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null,
    ): [boolean, T | null] => [false, action],
    initialValue,
  ) as UseStateHook<T>;
}

/**
 * Persists a value to secure storage (native) or localStorage (web).
 * @param key - Storage key
 * @param value - Value to store, or null to remove
 */
export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === "web") {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

/**
 * Hook for managing persistent storage state with loading indicator.
 * Uses SecureStore on native platforms and localStorage on web.
 * @param key - Storage key to use
 * @returns A tuple containing [loading state, value, setter function]
 */
export function useStorageState(key: string): UseStateHook<string> {
  // Public
  const [state, setState] = useAsyncState<string>();

  // Get
  useEffect(() => {
    if (Platform.OS === "web") {
      try {
        if (typeof localStorage !== "undefined") {
          setState(localStorage.getItem(key));
        }
      } catch (e) {
        console.error("Local storage is unavailable:", e);
      }
    } else {
      SecureStore.getItemAsync(key).then((value) => {
        setState(value);
      });
    }
  }, [key, setState]);

  // Set
  const setValue = useCallback(
    (value: string | null) => {
      setState(value);
      if (Platform.OS === "web") {
        if (value === null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, value);
        }
      } else {
        if (value === null) {
          SecureStore.deleteItemAsync(key);
        } else {
          SecureStore.setItemAsync(key, value);
        }
      }
    },
    [key, setState],
  );

  return [state, setValue];
}

/**
 * Hook for managing persistent object storage state with loading indicator.
 * Automatically handles JSON serialization/deserialization.
 * @param key - Storage key to use
 * @returns A tuple containing [loading state, value, setter function]
 */
export function useObjectStorageState<T>(key: string): UseStateHook<T> {
  const [[isLoading, stringValue], setStringValue] = useStorageState(key);

  const [state, setState] = useAsyncState<T>();

  // Deserialize on load
  useEffect(() => {
    if (!isLoading) {
      try {
        if (stringValue) {
          const parsedValue = JSON.parse(stringValue) as T;
          setState(parsedValue);
        } else {
          setState(null);
        }
      } catch (error) {
        console.error(`Failed to parse stored object for key "${key}":`, error);
        setState(null);
        setStringValue(null); // Clear invalid data
      }
    }
  }, [isLoading, stringValue, key, setState, setStringValue]);

  const setValue = useCallback(
    (value: T | null) => {
      try {
        if (value === null) {
          setStringValue(null);
          setState(null);
        } else {
          const serialized = JSON.stringify(value);
          setStringValue(serialized);
          setState(value);
        }
      } catch (error) {
        console.error(`Failed to serialize object for key "${key}":`, error);
      }
    },
    [key, setStringValue, setState],
  );

  return [state, setValue];
}
