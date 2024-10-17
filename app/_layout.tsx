import { Stack, router } from "expo-router";
import { BackHandler } from "react-native";

export default function RootLayout() {
  // This function handles the back button press on Android devices.
  // If the router can go back, it navigates to the previous screen.
  // Otherwise, it does nothing.
  function handleBack() {
    if (!router.canGoBack) return false;
    
    router.back();
    return true;
  }

  BackHandler.addEventListener("hardwareBackPress", handleBack);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(modals)/noMediaAccess" options={{ presentation: "modal" }} />
    </Stack>
  );
}
