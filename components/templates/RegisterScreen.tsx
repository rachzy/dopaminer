import { StyleSheet } from "react-native";
import { Text, View } from "../atoms/Themed";
import { IFormField } from "../../interfaces/FormField";
import formatDate from "../../util/formatDate";
import Form from "../organisms/Form";
import { Link } from "expo-router";
import { useState } from "react";
import { State, useRegisterFormStore } from "../../store/forms/register";
import { router } from "expo-router";
import { isValid, parse } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function RegisterScreen() {
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
        const char = text.charAt(text.length - 1);

        if (
          !isNaN(parseInt(char)) &&
          (text.length === 2 || text.length === 5)
        ) {
          e.nativeEvent.text = `${text}/`;
        }
        return true;
      },
      refine: (value: string) => {
        if (value.split("/").length !== 3) return false;

        const date = formatDate(value) as Date;

        if (isNaN(date.getTime())) return false;

        const parsed = parse(value, "P", new Date(), { locale: ptBR });
        if (!isValid(parsed)) return false;

        if (date.getTime() > Date.now()) return false;

        return true;
      },
    },
  ]);

  function handleSubmit() {
    const newValues: Partial<State["values"]> = {};
    formFields.forEach((field) => {
      newValues[field.name as keyof State["values"]] = field.value;
    });

    setFormValues({ ...newValues });
    router.push("/auth/register/uploadProfilePicture");
  }

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
