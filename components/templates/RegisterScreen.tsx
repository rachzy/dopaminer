import { StyleSheet } from "react-native";
import { View } from "../atoms/Themed";
import Title from "../atoms/Title";
import RegisterForm from "../organisms/RegisterForm";

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title>Vamos Criar Seu Perfil de Usuário:</Title>
      </View>
      <RegisterForm />
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
});
