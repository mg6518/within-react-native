import React from "react";
import { textStyles } from "../../../styles";
import {
  Dimensions,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ViewStyle,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useAppSelector } from "../../redux/hooks";
import { getTheme } from "../../redux/selectors";
import { addShadow } from "../../util/styleDecorators";

type SubmitButtonProps = {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
};

function SubmitButton({ text, onPress, style }: SubmitButtonProps) {
  const theme = useAppSelector(getTheme);
  const windowDimensions = useWindowDimensions();
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{
        width: Dimensions.get("screen").width * 0.8,
        ...style,
      }}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        colors={[theme.primary, theme.light]}
        style={addShadow(4)({
          height: windowDimensions.height * 0.04,
          minHeight: 30,
          width: "100%",
          marginBottom: windowDimensions.height * 0.02,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
        })}
      >
        <Text style={{ ...textStyles.buttonText, color: theme.text.primary }}>
          {text.toUpperCase()}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default SubmitButton;
