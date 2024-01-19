/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  useColorScheme,
  View as DefaultView,
  TextInputProps,
  TextInput,
} from "react-native";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";

import Colors from "../../constants/Colors";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type textFonts = "500" | "700" | "italic_700" | "800";

interface ITextProps extends TextProps {
  fontFamily?: textFonts;
}

export function Text(props: ITextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  let [loaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
  });
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  // the key of the object has to be one of the values of textFonts type
  const fonts: { [key: string]: string } = {
    500: "Poppins_500Medium",
    700: "Poppins_700Bold",
    italic_700: "Poppins_700Bold_Italic",
    800: "Poppins_800ExtraBold",
  };

  const fontFamily = props.fontFamily
    ? fonts[props.fontFamily]
    : "Poppins_500Medium";

  if (!loaded) {
    return null;
  }

  return <DefaultText style={[{ color, fontFamily }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Input(props: TextInputProps) {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: "#fff", dark: "#1A2C47" },
    "background"
  );
  const color = useThemeColor({ light: "#07F9A2", dark: "#FFFFFF33" }, "text");

  return (
    <TextInput
      style={[{ backgroundColor, color }, style]}
      placeholderTextColor={color}
      {...otherProps}
    />
  );
}
