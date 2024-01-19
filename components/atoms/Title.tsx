import { StyleSheet } from "react-native";
import { Text } from "./Themed";

export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <Text style={styles.title} fontFamily="700">
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
  },
});
