import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import styles from "../../styles";
import constants from "../../constants";

const Container = styled.View`
  border: 0.5px solid ${styles.whiteColor};
  justify-content: center;
  border-radius: 25px;
  margin: ${constants.margin02}px;
  width: ${constants.width * 0.8};
  height: 16%;
`;

const TextInput = styled.TextInput`
  color: ${styles.whiteColor};
  text-align: center;
  font-size: 15;
  font-family: NanumBarunGothicLight;
`;

const AuthInput = ({
  placeholder,
  value,
  keyboardType = "default",
  autoCapitalize = "none",
  returnKeyType = "done",
  onChange,
  onSubmitEditing = () => null,
  autoCorrect = true,
  secureTextEntry
}) => (
  <Container>
    <TextInput
      onChangeText={onChange}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      onSubmitEditing={onSubmitEditing}
      autoCorrect={autoCorrect}
      value={value}
      secureTextEntry={secureTextEntry}
      placeholderTextColor={styles.whiteColor}
    />
  </Container>
);

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad",
    "visible-password"
  ]),
  autoCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
  onChange: PropTypes.func.isRequired,
  returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
  onSubmitEditing: PropTypes.func,
  autoCorrect: PropTypes.bool,
  contextMenuHidden: PropTypes.bool,
  secureTextEntry: PropTypes.bool
};

export default AuthInput;
