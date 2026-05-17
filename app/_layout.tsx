import { Stack } from "expo-router";
import "../global.css";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Trang Chu" }} />
      <Stack.Screen name="income" options={{ title: "Tong Thu" }} />
      <Stack.Screen name="expense" options={{ title: "Tong Chi" }} />
      <Stack.Screen name="savings" options={{ title: "Tiet Kiem" }} />
    </Stack>
  );
}
