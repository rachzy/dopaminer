import { Image, StyleSheet } from "react-native";
import { View } from "../atoms/Themed";

import Title from "../atoms/Title";
import LoginForm from "../organisms/LoginForm";

import DopaminerLogo from "../../assets/images/dopaminer-logo.png";
import DopaminerLabel from "../../assets/images/dopaminer-label.png";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={DopaminerLogo} style={{ width: 96, height: 96 }} />
        <Image source={DopaminerLabel} />
      </View>
      <View style={styles.titleContainer}>
        <Title>Bem Vindo!</Title>
      </View>
      <LoginForm />
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
});
