import { IFormField } from "../../interfaces/FormField";
import InputGroup from "../molecules/InputGroup";
import { View } from "../atoms/Themed";
import { DefaultPressable } from "../atoms/DefaultPressable";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
} from "react-native";
import Title from "../atoms/Title";
import { isValid, parse } from "date-fns";
import formatDate from "../../util/formatDate";
import { ptBR } from "date-fns/locale";
import { Picker } from "@react-native-picker/picker";
import SelectGroup from "../molecules/SelectGroup";

interface IProps {
  title: string | React.ReactNode;
  fields: IFormField[];
  setFields: React.Dispatch<React.SetStateAction<IFormField[]>>;
  button: {
    label: string;
    onPress?: () => void;
  };
  onSubmit?: () => void;
}

// This function represents a form component that includes input fields, a title, and a submit button.
// It accepts title, fields, setFields, button, and onSubmit as props.
export default function Form({
  title,
  fields,
  setFields,
  button,
  onSubmit,
}: IProps) {
  // This function handles changes to the input fields.
  // It updates the value of the corresponding field in the form state.
  function handleFieldChange(
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    field: IFormField
  ) {
    const { type } = field;

    if (type === "date") {
      const { text } = e.nativeEvent;
      const char = text.charAt(text.length - 1);

      if (!isNaN(parseInt(char)) && (text.length === 2 || text.length === 5)) {
        e.nativeEvent.text = `${text}/`;
      }
    }

    const { name } = field;
    const value = e.nativeEvent.text;

    setFields((currentValue) =>
      currentValue.map((inField) => {
        if (inField.name === name) {
          return { ...inField, value };
        }
        return inField;
      })
    );
  }

  // This function handles changes to the picker fields.
  // It updates the value of the corresponding field in the form state.
  function handlePickerChange(field: IFormField, value: any) {
    const { name } = field;

    setFields((currentValue) =>
      currentValue.map((inField) => {
        if (inField.name === name) {
          return { ...inField, value };
        }
        return inField;
      })
    );
  }

  // This function clears the error messages for all fields in the form.
  function clearErrors() {
    setFields((currentValue) =>
      currentValue.map((field) => {
        return { ...field, errorValue: null };
      })
    );
  }

  // This function validates the form fields and returns true if all fields are valid.
  function validateForm() {
    const newFields = fields.map((field) => {
      let error = null;

      const { refine, value, min, type } = field;

      switch (type) {
        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) error = "Email inválido";
          break;
        case "date":
          if (value.split("/").length !== 3) {
            error = "Formato de data inválido";
            break;
          }

          const date = formatDate(value) as Date;

          if (isNaN(date.getTime())) {
            error = "Data inválida";
            break;
          }

          const parsed = parse(value, "P", new Date(), { locale: ptBR });
          if (!isValid(parsed)) {
            error = "Data inválida";
            break;
          }

          if (date.getTime() > Date.now()) {
            error = "Data inválida";
          }
          break;
        default:
          break;
      }

      if (refine && !refine(value)) {
        error = "Valor ou formato inválido";
      }

      if (min && value.length < min) {
        error = `Pelo menos ${min} caracteres.`;
      }

      if (!value) {
        error = "Campo obrigatório";
      }

      return {
        ...field,
        error,
      };
    });

    setFields(newFields);
    return newFields.every((field) => field.error === null);
  }

  // This function handles the press event of the submit button.
  // It clears the errors, validates the form, and calls the onSubmit function if the form is valid.
  function handleButtonPress() {
    clearErrors();

    if (!validateForm()) return;
    button.onPress && button.onPress();
    onSubmit && onSubmit();
  }

  // This function maps the form fields to their corresponding input components.
  function mapFields() {
    return fields.map((field) => {
      const { min, max, onChange, type, ...otherProps } = field;

      if (type === "select") {
        return (
          <SelectGroup
            key={field.name}
            field={field}
            onValueChange={(itemValue) => {
              handlePickerChange(field, itemValue);
            }}
          />
        );
      }

      return (
        <InputGroup
          key={field.name}
          onChange={(e) => {
            if (field.onChange && !field.onChange(e)) return;
            if (e.nativeEvent.text.length > max!) return;
            handleFieldChange(e, field);
          }}
          {...otherProps}
        />
      );
    });
  }

  return (
    <View style={styles.formContainer}>
      <View style={styles.titleContainer}>
        <Title>{title}</Title>
      </View>
      {mapFields()}
      <View style={styles.buttonContainer}>
        <DefaultPressable label="Próximo" onPress={handleButtonPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "80%",
  },
  titleContainer: {
    marginVertical: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
