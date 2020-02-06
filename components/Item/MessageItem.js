///
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ScrollView, View } from "react-native";
import PropTypes from "prop-types";

///
import styles from "../../styles";
import constants from "../../constants";
import UserName from "../Name/UserName";

/// Container
const BaseContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-top: ${constants.margin03};
  margin-bottom: ${constants.margin03};
`;

const MessageContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${props => props.align};
  width: 100%;
`;

const Photo = styled.Image`
  width: ${props => props.width};
  height: ${props => props.height};
  margin-bottom: ${constants.margin02};
`;

const Text = styled.Text`
  text-align: ${props => props.textAlign};
  font-size: ${props => props.fontsize};
  color: ${props => (props.fontcolor ? props.fontcolor : styles.blackColor)};
  font-family: ${props =>
    props.fontstyle ? props.fontstyle : "NanumBarunGothicLight"};
  margin-top: ${props => (props.marginTop ? props.marginTop : 0)};
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : 0)};
  background-color: ${props => props.backgroundColor};
`;

const MessageItem = ({ photo, message, date, isMe = false }) => {
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0, x: 0, y: 0 });

  let containerAlign;
  let backgroundColor;
  let textAlign;

  if (isMe === true) {
    containerAlign = "flex-end";
    backgroundColor = styles.lightMomentColor;
    textAlign = "right";
  } else {
    containerAlign = "flex-start";
    backgroundColor = styles.whiteColor;
    textAlign = "left";
  }

  return (
    <BaseContainer
      onLayout={event => {
        setBaseSize(event.nativeEvent.layout);
      }}
    >
      <MessageContainer align={containerAlign}>
        {photo === undefined || photo === "" ? null : (
          <Photo
            width={baseSize.width / 2}
            height={baseSize.width / 2}
            source={{ uri: photo }}
          />
        )}
        <Text
          fontsize={15}
          textAlign={textAlign}
          backgroundColor={backgroundColor}
        >
          {message}
        </Text>
        <Text
          fontsize={15}
          textAlign={textAlign}
          fontstyle={"NanumBarunGothicBold"}
          backgroundColor={styles.whiteColor}
        >
          {date}
        </Text>
      </MessageContainer>
    </BaseContainer>
  );
};

MessageItem.propTypes = {
  photo: PropTypes.any,
  message: PropTypes.any,
  date: PropTypes.any,
  isMe: PropTypes.bool
};

export default MessageItem;
