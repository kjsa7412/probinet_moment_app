///
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

///
import styles from "../../styles";
import constants from "../../constants";
import typeDef from "../../typeDef";

/// Container
const BaseContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: ${constants.margin01}px;
`;

const CounterText = styled.Text`
  color: ${props => (props.fontColor ? props.fontColor : 0)};
  font-size: ${props => (props.fontSize ? props.fontSize : 0)};
  font-family: ${props =>
    props.fontFamily ? props.fontFamily : "NanumBarunGothic"};
`;

const TimeCounter = ({
  counter,
  fontSize = 10,
  fontColor = null,
  fontFamily = null
}) => {
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0, x: 0, y: 0 });
  // const [hour, setHour] = useState();
  // const [minute, setMinute] = useState();
  // const [second, setSecond] = useState();

  return (
    <BaseContainer
      onLayout={event => {
        setBaseSize(event.nativeEvent.layout);
      }}
    >
      {// 시간
      Math.floor(counter.value / 3600) !== 0 ? (
        <CounterText
          fontSize={fontSize}
          fontColor={fontColor}
          fontFamily={fontFamily}
        >
          {(Math.floor(counter.value / 3600) % 12) + ":"}
        </CounterText>
      ) : null}
      {
        // 분
        <CounterText
          fontSize={fontSize}
          fontColor={fontColor}
          fontFamily={fontFamily}
        >
          {(Math.floor(counter.value / 60) % 60) + ":"}
        </CounterText>
      }

      {
        // 초
        <CounterText
          fontSize={fontSize}
          fontColor={fontColor}
          fontFamily={fontFamily}
        >
          {counter.value % 60 === 0
            ? "00"
            : counter.value % 60 < 10
            ? "0" + (counter.value % 60)
            : counter.value % 60}
        </CounterText>
      }
    </BaseContainer>
  );
};

TimeCounter.propTypes = {
  counter: PropTypes.object.isRequired,
  fontSize: PropTypes.number.isRequired,
  fontColor: PropTypes.string,
  fontFamily: PropTypes.string
};

export default TimeCounter;
