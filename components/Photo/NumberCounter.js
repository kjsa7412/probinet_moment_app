///
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

///
import styles from "../../styles";
import constants from "../../constants";
import typeDef from "../../typeDef";
import useCounter from "../../hooks/useCounter";

/// Container
const BaseContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const CounterText = styled.Text`
  color: ${props => (props.textColor ? props.textColor : styles.blackColor)};
  font-size: ${props => (props.fontSize ? props.fontSize : 10)};
  font-family: ${props =>
    props.fontFamily ? props.fontFamily : "NanumBarunGothic"};
`;

const NumberCounter = ({
  counter,
  textColor = styles.blackColor,
  fontFamily = null,
  fontSize = 0
}) => {
  return (
    <BaseContainer>
      <CounterText
        textColor={textColor}
        fontFamily={fontFamily}
        fontSize={fontSize}
      >
        {counter.value}
      </CounterText>
    </BaseContainer>
  );
};

NumberCounter.propTypes = {
  counter: PropTypes.object.isRequired,
  textColor: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number
};

export default NumberCounter;
