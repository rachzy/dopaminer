import { useState } from "react";
import { IFormField } from "../../interfaces/FormField";
import InputGroup from "../molecules/InputGroup";
import { View } from "../atoms/Themed";
import { DefaultPressable } from "../atoms/DefaultPressable";
import { StyleSheet } from "react-native";
import Title from "../atoms/Title";

interface IProps {
  title: string;
  fields: IFormField[];
  setFields: React.Dispatch<React.SetStateAction<IFormField[]>>;
  button: {
    label: string;
    onPress?: () => void;
  };
  onSubmit?: () => void;
}

export default function Form({
  title,
  fields,
  setFields,
  button,
  onSubmit,
}: IProps) {
  function handleFieldChange(name: string, value: string) {
    setFields((currentValue) =>
      currentValue.map((field) => {
        if (field.name === name) {
          return { ...field, value };
        }
        return field;
      })
    );
  }

  function clearErrors() {
    setFields((currentValue) =>
      currentValue.map((field) => {
        return { ...field, errorValue: null };
      })
    );
  }

  function validateForm() {
    const newFields = fields.map((field) => {
      let error = null;

      if (field.refine && !field.refine(field.value)) {
        error = "Valor ou formato inválido";
      }

      if (field.min && field.value.length < field.min) {
        error = `Pelo menos ${field.min} caracteres.`;
      }

      if (!field.value) {
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

  function handleButtonPress() {
    clearErrors();

    if (!validateForm()) return;
    button.onPress && button.onPress();
    onSubmit && onSubmit();
  }

  function mapFields() {
    return fields.map((field) => {
      const { min, max, onChange, ...otherProps } = field;
      return (
        <InputGroup
          key={field.label}
          onChange={(e) => {
            if (field.onChange && !field.onChange(e)) return;
            if (e.nativeEvent.text.length > max) return;
            handleFieldChange(field.name, e.nativeEvent.text);
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
