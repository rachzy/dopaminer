import { StyleSheet } from "react-native";
import { Text, TextProps } from "./Themed";

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
