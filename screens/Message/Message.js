/// Import
import React, { useState, useEffect } from "react";
import { Text, ScrollView, Image } from "react-native";
import styled from "styled-components";
import styles from "../../styles";
import constants from "../../constants";

// apollo
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

/// Components
import HeaderBase from "../../components/Header/HeaderBase";
import HeaderStyles from "../../components/Header/HeaderStyles";
import WordButton from "../../components/Button/WordButton";
import InputBase from "../../components/Input/InputBase";
import MessageItem from "../../components/Item/MessageItem";

/// Styled Components
const BaseContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const ContentsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 80%;
`;

const MessageContainer = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  width: 100%;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top:${constants.margin03}
  margin-bottom:${constants.margin03}
`;

const Message = ({ navigation }) => {
  const fromScreen = navigation.getParam("fromScreen", "");
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0, x: 0, y: 0 });

  return (
    <BaseContainer
      onLayout={event => {
        setBaseSize(event.nativeEvent.layout);
      }}
    >
      <HeaderBase
        leftItem={[
          {
            object: HeaderStyles.BACK,
            link: () => navigation.navigate(fromScreen)
          }
        ]}
        avatar={styles.TempImage2}
        username={"DAVID SA"}
      />
      <ScrollView
        style={{
          width: baseSize.width * 0.8,
          height: baseSize.height * 0.6
        }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <MessageItem
          message={styles.TempText1}
          date={"10시간전"}
          isMe={false}
        />
        <MessageItem
          photo={styles.TempImage1}
          message={styles.TempText1}
          date={"10시간전"}
          isMe={true}
        />
        <MessageItem
          message={styles.TempText1}
          date={"10시간전"}
          isMe={false}
        />
        <MessageItem
          photo={styles.TempImage1}
          message={styles.TempText1}
          date={"10시간전"}
          isMe={true}
        />
      </ScrollView>
      <ContentsContainer>
        <MessageContainer>
          <InputBase
            onChangeText={() => {}}
            placeholder={"메시지를 입력해주세요."}
            placeholderTextColor={styles.blackColor}
            fontSize={15}
            multiline={true}
            returnKeyType={"next"}
            keyboardType={"default"}
            isLine={true}
            fontFamily={"NanumBarunGothicLight"}
          />
        </MessageContainer>
        <ButtonContainer>
          <WordButton onPress={() => {}} text={"업로드"} size={"30"} />
          <WordButton onPress={() => {}} text={"전송하기"} size={"30"} />
        </ButtonContainer>
      </ContentsContainer>
    </BaseContainer>
  );
};

export default Message;
