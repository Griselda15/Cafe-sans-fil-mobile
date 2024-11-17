import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="login" options={{ headerShown: true, headerTitle: "Login Page" }} />
			<Stack.Screen name="onboarding" options={{ headerShown: true }} />
			<Stack.Screen name="resetPwd" options={{ headerShown: true }} />
      <Stack.Screen name="homepage" options={{ headerShown: true, headerTitle: "Home" }} />
    </Stack>
  );
}
