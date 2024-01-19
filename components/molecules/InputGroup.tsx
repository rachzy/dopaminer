import { StyleSheet } from "react-native";
import Label from "../atoms/Label";
import TextInput from "../atoms/TextInput";
import { View } from "../atoms/Themed";

interface IProps {
  label: string;
  placeholder: string;
  password?: boolean;
  value?: string;
}

export default function InputGroup({
  label,
  placeholder,
  password,
  value,
}: IProps) {
  return (
    <View style={styles.inputContainer}>
      <Label>{label}</Label>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={password}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginVertical: 12,
  },
});
