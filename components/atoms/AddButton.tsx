import { Image, Pressable, TouchableHighlightProps } from "react-native";
import AddButtonIcon from "../../assets/images/icons/buttons/add-button.png";

interface IProps extends TouchableHighlightProps {
  width: number;
  height: number;
}

export default function AddButton(props: IProps) {
  const { width, height, style, ...otherProps } = props;
  return (
    <Pressable style={[{ width, height }, style]} {...otherProps}>
      <Image source={AddButtonIcon} style={{ width: "100%", height: "100%" }} />
    </Pressable>
  );
}
