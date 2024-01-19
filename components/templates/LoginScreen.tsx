import { Image, StyleSheet } from "react-native";
import { Text, View } from "../atoms/Themed";

import DopaminerLogo from "../../assets/images/dopaminer-logo.png";
import DopaminerLabel from "../../assets/images/dopaminer-label.png";

import { Link } from "expo-router";
import { IFormField } from "../../interfaces/FormField";
import Form from "../organisms/Form";
import { useState } from "react";

export default function LoginScreen() {
  const [formFields, setFormFields] = useState<IFormField[]>([
    {
      name: "email",
      label: "Email",
      placeholder: "Digite seu email...",
      max: 96,
      error: null,
      value: "",
    },
    {
      name: "password",
      label: "Senha",
      placeholder: "Digite sua senha...",
      max: 96,
      error: null,
      value: "",
      password: true,
    },
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={DopaminerLogo} style={{ width: 96, height: 96 }} />
        <Image source={DopaminerLabel} />
      </View>
      <Form
        title="Bem Vindo!"
        fields={formFields}
        setFields={setFormFields}
        button={{ label: "Entrar" }}
      />
      <Text style={styles.bottomText}>
        Novo por aqui?{" "}
        <Link href={"/auth/register"}>
          <Text style={{ color: "#07F9A2" }}>Crie sua conta!</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    marginVertical: 24,
  },
  bottomText: {
    marginVertical: 12,
  },
});
