import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import styles from "../../styles";
import constants from "../../constants";

const Container = styled.View`
  border: 0.5px ${styles.whiteColor};
  justify-content: center;
  border-radius: 25px;
  margin: ${constants.margin02}px;
  width: ${constants.width * 0.8};
  height: 16%;
`;

const Text = styled.Text`
  color: ${props => (props.textColor ? props.textColor : "black")};
  text-align: center;
  font-size: 15;
  font-family: NanumBarunGothicLight;
`;

const AuthTextBox = ({ text = false, textColor = null, bgColor = null }) => (
  <Container bgColor={bgColor}>
    <Text textColor={textColor}>{text}</Text>
  </Container>
);

AuthTextBox.propTypes = {
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  bgColor: PropTypes.string
};

export default AuthTextBox;
