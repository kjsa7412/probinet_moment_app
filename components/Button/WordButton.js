///
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

///
import styles from "../../styles";
import constants from "../../constants";

/// Container
const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${props => (props.marginTop ? props.marginTop : 0)};
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : 0)};
`;

const TextButton = styled.Text`
  font-size: ${props => (props.size ? props.size : "50")};
  font-family: NanumBarunGothicBold;
  color: ${props => (props.color ? props.color : styles.momentColor)};
`;

const Desc = styled.Text`
  text-align: center;
  font-size: 10;
  font-family: NanumBarunGothicLight;
  color: ${styles.darkGreyColor};
  margin-top: ${constants.margin01};
`;

const WordButton = ({ onPress, text, size, color, margin, desc }) => {
  return (
    <Container marginTop={margin} marginBottom={margin}>
      <Touchable onPress={onPress}>
        <TextButton size={size} color={color}>
          {text}
        </TextButton>
      </Touchable>
      {desc === undefined ? null : <Desc>{desc}</Desc>}
    </Container>
  );
};

WordButton.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
  size: PropTypes.any,
  color: PropTypes.any,
  margin: PropTypes.any,
  desc: PropTypes.any
};

export default WordButton;
