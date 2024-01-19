import { Appearance, StyleSheet, useColorScheme } from "react-native";
import { View } from "../components/atoms/Themed";
import * as Progress from "react-native-progress";
import Colors from "../constants/Colors";
import { router } from "expo-router";

export default function Loading() {
  const colorScheme = Appearance.getColorScheme() as "light" | "dark" | null;
  return (
    <View style={styles.container}>
      <Progress.Circle
        color={Colors[colorScheme || "dark"].tint}
        indeterminate
        endAngle={0.5}
        thickness={5}
        size={75}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
