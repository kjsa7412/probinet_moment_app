///
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import styles from "../../styles";
import constants from "../../constants";

/// Container
const BaseContainer = styled.View`
  flex-direction: column;
  width: ${props => (props.width ? props.width : "100%")};
`;

const TextInput = styled.TextInput`
  text-align: ${props => props.textAlign};
  font-family: ${props => props.fontFamily};
  font-size: ${props => props.fontSize};
  color: ${props => props.color};
  width: 100%;
`;

const Line = styled.View`
  border: 0.5px solid
  border-color: ${props => props.lineColor};
  border-top-width: 0.5;
  width: 100%;
`;

const InputBase = ({
  width,
  onChange = () => {},
  onSubmitEditing = () => null,
  autoCapitalize = "none",
  autoCorrect = false,
  keyboardType = "default",
  multiline = false,
  returnKeyType = "done",
  secureTextEntry = false,
  maxLength = null,
  value = null,
  placeholder = "",
  placeholderTextColor = null,
  textAlign = "left",
  fontFamily = "NanumBarunGothicBold",
  fontSize = "50",
  color = styles.blackColor,
  isLine = false,
  lineColor = styles.darkGreyColor,
  defaultValue = ""
}) => {
  return (
    <BaseContainer width={width}>
      <TextInput
        onChangeText={onChange}
        onSubmitEditing={onSubmitEditing}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        keyboardType={keyboardType}
        multiline={multiline}
        returnKeyType={returnKeyType}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        textAlign={textAlign}
        fontFamily={fontFamily}
        fontSize={fontSize}
        color={color}
        defaultValue={defaultValue}
      />
      {isLine ? <Line lineColor={lineColor} /> : null}
    </BaseContainer>
  );
};

InputBase.propTypes = {
  width: PropTypes.any,
  onChange: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  autoCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
  autoCorrect: PropTypes.bool,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad",
    "visible-password"
  ]),
  multiline: PropTypes.bool,
  returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
  secureTextEntry: PropTypes.bool,
  maxLength: PropTypes.number,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  textAlign: PropTypes.string,
  fontFamily: PropTypes.any,
  fontSize: PropTypes.number,
  color: PropTypes.string,
  isLine: PropTypes.bool,
  lineColor: PropTypes.string,
  defaultValue: PropTypes.string
};

export default InputBase;
