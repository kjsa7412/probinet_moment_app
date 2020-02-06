import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ActivityIndicator } from "react-native";
import constants from "../../constants";

const Touchable = styled.TouchableOpacity`
  margin: ${constants.margin01}px;
  width: ${constants.width * 0.4};
  height: 50%;
`;

const Container = styled.View`
  background-color: ${props => (props.bgColor ? props.bgColor : "white")};
  justify-content: center;
  border-radius: 25px;
  flex: 1;
`;

const Text = styled.Text`
  color: ${props => (props.textColor ? props.textColor : "black")};
  text-align: center;
  font-size: 15;
  font-family: NanumBarunGothicLight;
`;

const LogInButton = ({
  text,
  onPress,
  loading = false,
  textColor = null,
  bgColor = null
}) => (
  <Touchable disabled={loading} onPress={onPress}>
    <Container bgColor={bgColor}>
      {loading ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <Text textColor={textColor}>{text}</Text>
      )}
    </Container>
  </Touchable>
);

LogInButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  textColor: PropTypes.string,
  bgColor: PropTypes.string
};

export default LogInButton;
