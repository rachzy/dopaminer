import { PressableProps, StyleSheet } from "react-native";
import { Text, View, useThemeColor } from "./Themed";
import AwesomeButton from "react-native-really-awesome-button";

interface IPressableProps extends PressableProps {
  label: string;
}

export function DefaultPressable(props: IPressableProps) {
  const { label, ...otherProps } = props;
  const color = useThemeColor({ light: "#FFFFFF", dark: "#1A2C47" }, "text");

  function handleButtonClick() {

  }

  return (
    <View style={{ width: "100%" }}>
      <AwesomeButton
        backgroundColor="#07F9A2"
        borderRadius={24}
        stretch
        dangerouslySetPressableProps={otherProps}
        raiseLevel={0}
        height={30}
        paddingHorizontal={0}
        paddingBottom={12}
        paddingTop={4}
        textSize={0}
        onPress={handleButtonClick}
      >
        <Text style={[{ color }, styles.label]}>{label}</Text>
      </AwesomeButton>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 26,
  },
});
