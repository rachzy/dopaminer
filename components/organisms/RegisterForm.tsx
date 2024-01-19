import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
} from "react-native";
import { DefaultPressable } from "../atoms/DefaultPressable";
import { Text, View } from "../atoms/Themed";
import InputGroup from "../molecules/InputGroup";
import { Link } from "expo-router";
import { useState } from "react";
import formatDate from "../../util/formatDate";

interface IInput {
  name: string;
  label: string;
  placeholder: string;
  error: string | null;
  value: string;
  min?: number;
  max: number;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => boolean;
  refine?: (value: string) => boolean;
}

export default function RegisterForm() {
  const [inputs, setInputs] = useState<IInput[]>([
    {
      name: "name",
      label: "Nome de usuário",
      placeholder: "Nome",
      error: null,
      value: "",
      min: 3,
      max: 128,
    },
    {
      name: "birthdate",
      label: "Data de nascimento",
      placeholder: "##/##/####",
      error: null,
      value: "",
      min: 10,
      max: 10,
      onChange: (e) => {
        const { text } = e.nativeEvent;
        if (!text) return true;

        const character = text.charAt(text.length - 1);

        if (character === "/") return true;

        return !isNaN(parseInt(character));
      },
      refine: (value: string) => {
        return (
          value.split("/").length === 3 &&
          !isNaN(new Date(formatDate(value)).getTime())
        );
      },
    },
  ]);

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
      {mapInputs()}
      <View style={styles.buttonContainer}>
        <DefaultPressable label="Próximo" onPress={handleButtonPress} />
        <Text>
          Já possui uma conta?{" "}
          <Link href={"/auth/login"}>
            <Text style={{ color: "#07F9A2" }}>Faça login!</Text>
          </Link>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "80%",
  },
  buttonContainer: {
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 12,
  },
});
