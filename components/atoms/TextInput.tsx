import { StyleSheet, TextInputProps } from "react-native";
import { Input } from "./Themed";

export default function TextInput(props: TextInputProps) {
  const { style, ...otherProps } = props;
  return <Input style={[styles.input, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  input: {
    padding: 8,
    borderRadius: 8,
    width: "100%",
    color: "white",
  },
});
