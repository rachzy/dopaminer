import { StyleSheet } from "react-native";
import { DefaultPressable } from "../atoms/DefaultPressable";
import { Text, View } from "../atoms/Themed";
import InputGroup from "../molecules/InputGroup";
import { Link } from "expo-router";

export default function LoginForm() {
  return (
    <View style={styles.formContainer}>
      <InputGroup label="Email" placeholder="Digite seu email..." />
      <InputGroup label="Senha" placeholder="Digite sua senha..." password />
      <View style={styles.buttonContainer}>
        <DefaultPressable label="Acessar" />
        <Text>
          Novo por aqui?{" "}
          <Link href={"/auth/register"}>
            <Text style={{ color: "#07F9A2" }}>Crie sua conta!</Text>
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
