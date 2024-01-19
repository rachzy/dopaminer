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
  button: {
    label: string;
    onPress?: () => void;
  };
}

export default function Form({ title, fields, button }: IProps) {
  const [inputs, setInputs] = useState<IFormField[]>(fields);

  function handleInputChange(name: string, value: string) {
    setInputs((currentValue) =>
      currentValue.map((input) => {
        if (input.name === name) {
          return { ...input, value };
        }
        return input;
      })
    );
  }

  function clearErrors() {
    setInputs((currentValue) =>
      currentValue.map((input) => {
        return { ...input, errorValue: null };
      })
    );
  }

  function validateForm() {
    const newInputs = inputs.map((input) => {
      let error = null;

      if (input.refine && !input.refine(input.value)) {
        error = "Formato inválido";
      }

      if (input.min && input.value.length < input.min) {
        error = `Pelo menos ${input.min} caracteres.`;
      }

      if (!input.value) {
        error = "Campo obrigatório";
      }

      return {
        ...input,
        error,
      };
    });

    setInputs(newInputs);
    return newInputs.every((input) => input.error === null);
  }

  function handleButtonPress() {
    clearErrors();

    if (!validateForm()) return;
    button.onPress && button.onPress();
  }

  function mapInputs() {
    return inputs.map((input) => {
      const { min, max, onChange, ...otherProps } = input;
      return (
        <InputGroup
          key={input.label}
          onChange={(e) => {
            if (input.onChange && !input.onChange(e)) return;
            if (e.nativeEvent.text.length > max) return;
            handleInputChange(input.name, e.nativeEvent.text);
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
      {mapInputs()}
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
