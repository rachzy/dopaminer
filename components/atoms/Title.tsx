import { StyleSheet } from "react-native";
import { Text, TextProps } from "./Themed";

// This function represents a title component that displays text with a specific style.
// It accepts children and other text properties as props.
export default function Title(props: TextProps) {
  return (
    <Text style={[styles.title, props.style]} fontFamily="700">
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
  },
});
