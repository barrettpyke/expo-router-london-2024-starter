import { Stack, Redirect } from "expo-router";
import React from "react";
import { useAuth } from "@/data/hooks/useAuth";
import colors from "@/constants/colors";
import { Platform } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const { authToken } = useAuth();

  if (!authToken) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.white },
        }}
      />
      <Stack.Screen
        name="works/[id]/index"
        options={{
          ...Platform.select({
            web: {
              presentation: "transparentModal",
              animation: "fade",
            },
            default: {
              presentation: "modal",
            },
          }),
          headerShown: false,
        }}
      />
    </Stack>
  );
}