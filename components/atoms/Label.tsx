import { StyleSheet } from "react-native";
import { Text } from "./Themed";

export default function Label({ children }: { children: React.ReactNode }) {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    marginLeft: 4,
    fontSize: 18,
  },
});
