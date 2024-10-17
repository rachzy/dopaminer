import { StyleSheet, TextInputProps } from "react-native";
import Label from "../atoms/Label";
import TextInput from "../atoms/TextInput";
import { Text, View } from "../atoms/Themed";

interface IProps extends TextInputProps {
  label: string;
  password?: boolean;
  error?: string | null;
}

// This function represents an input group component that includes a label, a text input, and an error message.
// It accepts label, password, error, and other text input properties as props.
export default function InputGroup(props: IProps) {
  const { label, error, password, ...otherProps } = props;
  return (
    <View style={styles.inputContainer}>
      <Label>{label}</Label>
      <TextInput
        secureTextEntry={password}
        style={error ? { borderWidth: 1, borderColor: "red" } : {}}
        {...otherProps}
      />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginVertical: 12,
  },
});
