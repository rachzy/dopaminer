import { Pressable, PressableProps, StyleSheet } from "react-native";
import { Text, useThemeColor } from "./Themed";
import React from "react";

interface IPressableProps extends PressableProps {
  label: string;
}

export function DefaultPressable(props: IPressableProps) {
  const { label, ...otherProps } = props;
  const color = useThemeColor({ light: "#FFFFFF", dark: "#1A2C47" }, "text");

  return (
    <Pressable style={styles.button} {...otherProps}>
      <Text style={[{ color }, styles.label]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#07F9A2",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    borderRadius: 24,
    width: "100%",
  },
  label: {
    fontSize: 24,
  },
});
