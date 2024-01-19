import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Slot />
      <StatusBar backgroundColor={"#000"} translucent />
    </>
  );
}
