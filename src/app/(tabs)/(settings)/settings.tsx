import Button from "@/components/ui/button";
import { useSession } from "@/lib/auth/auth-context";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useState } from "react";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <View className="mb-8">
      <Text className="font-display mb-4 text-lg text-neutral-900 dark:text-neutral-100">
        {title}
      </Text>
      <View className="space-y-2">{children}</View>
    </View>
  );
}

interface SettingsItemProps {
  title: string;
  subtitle?: string;
  icon?: keyof typeof EvilIcons.glyphMap;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showChevron?: boolean;
}

function SettingsItem({
  title,
  subtitle,
  icon,
  onPress,
  rightElement,
  showChevron = true,
}: SettingsItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-neutral-50 flex-row items-center justify-between rounded-lg p-4 dark:bg-neutral-900"
    >
      <View className="flex-1 flex-row items-center">
        {icon && (
          <EvilIcons name={icon} size={20} color="#979797" className="mr-3" />
        )}
        <View className="flex-1">
          <Text className="font-body text-base text-neutral-900 dark:text-neutral-100">
            {title}
          </Text>
          {subtitle && (
            <Text className="font-body mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      <View className="flex-row items-center">
        {rightElement}
        {showChevron && onPress && (
          <EvilIcons
            name="chevron-right"
            size={20}
            color="#979797"
            className="ml-2"
          />
        )}
      </View>
    </Pressable>
  );
}

export default function Settings() {
  const { signOut, session } = useSession();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);

  return (
    <ScrollView
      className="flex-1 bg-neutral-100 dark:bg-background"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="p-6">
        {/* Account Section */}
        <SettingsSection title="Account">
          <SettingsItem
            title="Student ID"
            subtitle="Not available"
            icon="user"
            showChevron={false}
          />
          <SettingsItem
            title="Email"
            subtitle="Not available"
            icon="envelope"
            showChevron={false}
          />
          <SettingsItem
            title="Change Password"
            subtitle="Update your login credentials"
            icon="lock"
            onPress={() => console.log("Change password")}
          />
        </SettingsSection>

        {/* App Preferences */}
        <SettingsSection title="App Preferences">
          <SettingsItem
            title="Dark Mode"
            subtitle="Use dark theme throughout the app"
            icon="gear"
            rightElement={
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: "#767577", true: "#2563eb" }}
                thumbColor={darkModeEnabled ? "#ffffff" : "#f4f3f4"}
              />
            }
            showChevron={false}
          />
          <SettingsItem
            title="Biometric Login"
            subtitle="Use fingerprint or face ID to sign in"
            icon="eye"
            rightElement={
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                trackColor={{ false: "#767577", true: "#2563eb" }}
                thumbColor={biometricEnabled ? "#ffffff" : "#f4f3f4"}
              />
            }
            showChevron={false}
          />
          <SettingsItem
            title="Auto Sync"
            subtitle="Automatically sync grades and data"
            icon="refresh"
            rightElement={
              <Switch
                value={autoSyncEnabled}
                onValueChange={setAutoSyncEnabled}
                trackColor={{ false: "#767577", true: "#2563eb" }}
                thumbColor={autoSyncEnabled ? "#ffffff" : "#f4f3f4"}
              />
            }
            showChevron={false}
          />
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection title="Notifications">
          <SettingsItem
            title="Push Notifications"
            subtitle="Receive alerts for new grades and updates"
            icon="bell"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#767577", true: "#2563eb" }}
                thumbColor={notificationsEnabled ? "#ffffff" : "#f4f3f4"}
              />
            }
            showChevron={false}
          />
          <SettingsItem
            title="Grade Alerts"
            subtitle="Get notified when new grades are posted"
            icon="check"
            onPress={() => console.log("Grade alerts settings")}
          />
        </SettingsSection>

        {/* Data & Privacy */}
        <SettingsSection title="Data & Privacy">
          <SettingsItem
            title="Export Data"
            subtitle="Download your academic data"
            icon="link"
            onPress={() => console.log("Export data")}
          />
          <SettingsItem
            title="Clear Cache"
            subtitle="Free up storage space"
            icon="trash"
            onPress={() => console.log("Clear cache")}
          />
          <SettingsItem
            title="Privacy Policy"
            subtitle="Read our privacy policy"
            icon="star"
            onPress={() => console.log("Privacy policy")}
          />
        </SettingsSection>

        {/* Support */}
        <SettingsSection title="Support">
          <SettingsItem
            title="Help & FAQ"
            subtitle="Get help and find answers"
            icon="question"
            onPress={() => console.log("Help & FAQ")}
          />
          <SettingsItem
            title="Contact Support"
            subtitle="Reach out to our support team"
            icon="comment"
            onPress={() => console.log("Contact support")}
          />
          <SettingsItem
            title="About"
            subtitle="App version and information"
            icon="question"
            onPress={() => console.log("About")}
          />
        </SettingsSection>

        {/* Sign Out */}
        <View className="mt-8">
          <Button variant="destructive" onPress={signOut} className="w-full">
            Sign Out
          </Button>
        </View>

        {/* Version Info */}
        <View className="mt-8 items-center">
          <Text className="font-body text-sm text-neutral-500 dark:text-neutral-400">
            Version 1.0.0
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
