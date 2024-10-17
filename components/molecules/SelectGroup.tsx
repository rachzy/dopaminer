import { StyleSheet } from "react-native";
import { View } from "../atoms/Themed";
import Label from "../atoms/Label";
import { Picker, PickerProps } from "@react-native-picker/picker";
import { IFormField } from "../../interfaces/FormField";

interface IProps extends PickerProps {
  field: IFormField;
}

// This function represents a select group component that includes a label and a picker.
// It accepts a field and other picker properties as props.
export default function SelectGroup(props: IProps) {
  const { field, ...otherProps } = props;
  const { label } = field;

  function mapOptions() {
    return field.options!.map((option) => (
      <Picker.Item
        key={option.label}
        {...option}
      />
    ));
  }
  return (
    <View style={styles.inputContainer}>
      <Label>{label}</Label>
      <Picker
        style={styles.picker}
        selectedValue={field.value}
        selectionColor={"black"}
        dropdownIconColor={"white"}
        dropdownIconRippleColor={"#FFFFFF10"}
        itemStyle={{color: "black"}}
        mode="dropdown"
        {...otherProps}
      >
        {mapOptions()}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginVertical: 12,
  },
  picker: {
    backgroundColor: "#FFFFFF10",
    padding: 8,
    borderRadius: 8,
    width: "100%",
    color: "white",
  },
});
