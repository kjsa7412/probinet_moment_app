import React, { useState, useEffect } from "react";
import { Text, ScrollView, Image, View } from "react-native";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import styled from "styled-components";
import constants from "../../constants";
import styles from "../../styles";
import typeDef from "../../typeDef";

///
import UserName from "../Name/UserName";
import InputBase from "../Input/InputBase";

/// Container
const BaseContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${constants.width * 0.9};
  border-radius: 10;
  background-color: ${styles.momentColor};
`;

const InputContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${constants.margin03}
  margin-bottom: ${constants.margin03}
`;

const ContentContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${constants.width * 0.8};

  margin-bottom: ${constants.margin03};
`;

const ContentTopContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${constants.margin02};
`;

const ContentBottomContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const Comment = ({ comment = [] }) => {
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0, x: 0, y: 0 });

  return (
    <BaseContainer
      onLayout={event => {
        setBaseSize(event.nativeEvent.layout);
      }}
    >
      <InputContainer>
        <InputBase
          onChangeText={() => {}}
          placeholder={"댓글을 입력해주세요"}
          fontSize={15}
          returnKeyType={"go"}
          keyboardType={"default"}
          width={constants.width * 0.8}
          isLine={true}
          color={styles.whiteColor}
          placeholderTextColor={styles.whiteColor}
          lineColor={styles.whiteColor}
          fontFamily={"NanumBarunGothicLight"}
        />
      </InputContainer>
      {comment.map((value, index) => (
        <ContentContainer key={index}>
          <ContentTopContainer>
            <UserName
              onPress={() => {}}
              avatar={value.user.avatar}
              avatarSize={"20"}
              username={value.user.username}
              usernameSize={"13"}
              usernameColor={styles.whiteColor}
            />
            <Text
              style={{
                color: styles.whiteColor,
                fontFamily: "NanumBarunGothicBold",
                fontSize: 13
              }}
            >
              {value.createdAt}
            </Text>
          </ContentTopContainer>
          <ContentBottomContainer>
            <Text
              style={{
                color: styles.whiteColor,
                fontFamily: "NanumBarunGothicLight",
                fontSize: 15
              }}
            >
              {value.text}
            </Text>
          </ContentBottomContainer>
        </ContentContainer>
      ))}
    </BaseContainer>
  );
};

Comment.propTypes = {
  comment: PropTypes.array
};

export default Comment;
