import { Image, Pressable, StyleSheet } from "react-native";
import DefaultPfp from "../../assets/images/default-pfp.png";
import { View } from "../atoms/Themed";
import Title from "../atoms/Title";
import AddButton from "../atoms/AddButton";

import { router } from "expo-router";
import { useState } from "react";

import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { DefaultPressable } from "../atoms/DefaultPressable";
import { useRegisterFormStore } from "../../store/forms/register";

export default function UploadPfpScreen() {
  const setRegisterFormValues = useRegisterFormStore(
    (state) => state.setValues
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [permissionsResponse, requestPermission] =
    MediaLibrary.usePermissions();

  async function handleChangePfpButtonPress() {
    if (!permissionsResponse?.granted) {
      requestPermission();
    }

    if (!permissionsResponse?.granted && !permissionsResponse?.canAskAgain) {
      return router.replace("/(modals)/noMediaAccess");
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) return;

    setSelectedImage(result.assets[0].uri);
  }

  function handleNextButtonPress() {
    if (selectedImage) {
      setRegisterFormValues({ profilePicture: selectedImage });
    }
    
    router.push("/auth/register/firstTask");
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Title style={{ textAlign: "center" }}>
          Adicione Sua Foto de Perfil{" "}
        </Title>
        <View style={styles.imageContainer}>
          <Pressable onPress={handleChangePfpButtonPress}>
            <Image
              source={selectedImage ? { uri: selectedImage } : DefaultPfp}
              style={{
                objectFit: "cover",
                width: 172,
                height: 172,
                borderRadius: 172 / 2,
              }}
            />
          </Pressable>
          <View>
            <AddButton
              style={styles.addButton}
              width={64}
              height={64}
              onPress={handleChangePfpButtonPress}
            />
          </View>
        </View>
        <DefaultPressable
          style={{ marginTop: 32 }}
          label="Próximo"
          onPress={handleNextButtonPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  addButton: {
    position: "absolute",
    marginTop: -55,
    marginLeft: 30,
  },
});
