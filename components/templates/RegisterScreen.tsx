import { StyleSheet } from "react-native";
import { Text, View } from "../atoms/Themed";
import { IFormField } from "../../interfaces/FormField";
import formatDate from "../../util/formatDate";
import Form from "../organisms/Form";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { State, useRegisterFormStore } from "../../store/forms/register";

export default function RegisterScreen() {
  const formValues = useRegisterFormStore((state) => state.values);
  const setFormValues = useRegisterFormStore((state) => state.setValues);
  const [formFields, setFormFields] = useState<IFormField[]>([
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

  function handleSubmit() {
    const newValues: State["values"] = {};
    formFields.forEach((field) => {
      newValues[field.name as keyof State["values"]] = field.value;
    });

    setFormValues({values: newValues});
  }

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  return (
    <View style={styles.container}>
      <Form
        title="Vamos Criar Seu Perfil de Usuário:"
        fields={formFields}
        setFields={setFormFields}
        button={{ label: "Próximo" }}
        onSubmit={handleSubmit}
      />
      <Text style={styles.bottomText}>
        Já possui uma conta?{" "}
        <Link href={"/auth/login"}>
          <Text style={{ color: "#07F9A2" }}>Faça login!</Text>
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    rowGap: 8,
  },
  titleContainer: {
    marginVertical: 24,
  },
  bottomText: {
    marginVertical: 12,
  },
});
