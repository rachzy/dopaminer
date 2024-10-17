import { Text, View } from "../../components/atoms/Themed";

import DopaminerSad from "../../assets/images/icons/callbacks/dopaminer-sad.png";
import { Image, StyleSheet } from "react-native";
import Title from "../../components/atoms/Title";
import { DefaultPressable } from "../../components/atoms/DefaultPressable";
import { router } from "expo-router";

// This function represents a modal that informs the user that the app does not have permission to access their media files.
export default function ModalNoMediaAccess() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image source={DopaminerSad} />
        <Title>Eita...</Title>
        <Text style={styles.description}>
          Parece que nós não temos permissão de acessar seus arquivos de mídia.
        </Text>
        <Text style={styles.description}>
          Você terá que nos dar essa permissão manualmente nas configurações do
          seu celular.
        </Text>
          <DefaultPressable label="Voltar" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "70%",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
  },
});
