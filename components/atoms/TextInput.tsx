import { StyleSheet, TextInputProps } from "react-native";
import { Input } from "./Themed";

export default function TextInput(props: TextInputProps) {
  return <Input style={styles.input} {...props} />;
}

const styles = StyleSheet.create({
  input: {
    padding: 8,
    borderRadius: 8,
    width: "100%",
    color: "white",
  },
});
