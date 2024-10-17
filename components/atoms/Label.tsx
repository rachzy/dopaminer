import { StyleSheet } from "react-native";
import { Text } from "./Themed";

// This function represents a label component that displays text.
// It accepts children as props to set the content of the label.
export default function Label({ children }: { children: React.ReactNode }) {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    marginLeft: 4,
    fontSize: 18,
  },
});
