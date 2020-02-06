/// Import
import React, { useState, useEffect } from "react";
import { Text, ScrollView, Image } from "react-native";
import styled from "styled-components";
import styles from "../../../styles";
import constants from "../../../constants";

// apollo
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

/// Components
import HeaderBase from "../../../components/Header/HeaderBase";
import HeaderStyles from "../../../components/Header/HeaderStyles";
import InputBase from "../../../components/Input/InputBase";
import UserName from "../../../components/Name/UserName";
import WordButton from "../../../components/Button/WordButton";

/// Styled Components
const BaseContainer = styled.View`
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

/// Item
const ItemContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin-top: ${constants.margin05};
  margin-bottom: ${constants.margin02};
`;
const ItemContainer_Top = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${constants.margin02};
`;
const ItemContainer_Body = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin-bottom: ${constants.margin02};
`;

const ItemContainer_Bottom = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

/// Icon
const IconContainer = styled.TouchableOpacity`
  margin-right: ${constants.margin02};
`;

const Post = styled.Image`
  width: ${constants.width * 0.1};
  height: ${constants.width * 0.1};
`;

const User = styled.Image`
  width: ${constants.width * 0.1};
  height: ${constants.width * 0.1};
  border-radius: ${(constants.width * 0.1) / 2};
`;

/// Text
const Time = styled.Text`
  color: ${styles.blackColor};
  font-family: NanumBarunGothicBold;
  font-size: 13;
`;

const Message = styled.Text`
  color: ${styles.blackColor};
  font-family: NanumBarunGothicLight;
  font-size: 15;
`;

const Alarm = ({ navigation }) => {
  const fromScreen = navigation.getParam("fromScreen", "");
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0, x: 0, y: 0 });

  return (
    <BaseContainer
      onLayout={event => {
        setBaseSize(event.nativeEvent.layout);
      }}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ width: "90%" }}
        contentContainerStyle={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ItemContainer>
          <ItemContainer_Top>
            <UserName
              onPress={() =>
                navigation.push("Profile_User", {
                  fromScreen: navigation.state.routeName
                })
              }
              avatar={styles.TempImage2}
              avatarSize={"20"}
              username={"david sa"}
              usernameSize={"13"}
              usernameColor={styles.blackColor}
            />
            <Time>10시간전</Time>
          </ItemContainer_Top>
          <ItemContainer_Body>
            <Message>
              김상욱의 과학 공부 왜 세익스피어는 교양이지만 열역학 제2법칙은
              교양이 아닌 걸까?
            </Message>
          </ItemContainer_Body>
          <ItemContainer_Bottom>
            <IconContainer>
              <Post source={{ uri: styles.TempImage1 }} />
            </IconContainer>
            <IconContainer
              onPress={() =>
                navigation.push("Profile_User", {
                  fromScreen: navigation.state.routeName
                })
              }
            >
              <User source={{ uri: styles.TempImage2 }} />
            </IconContainer>
          </ItemContainer_Bottom>
        </ItemContainer>
        <ItemContainer>
          <ItemContainer_Top>
            <UserName
              onPress={() =>
                navigation.push("Profile_User", {
                  fromScreen: navigation.state.routeName
                })
              }
              avatar={styles.TempImage2}
              avatarSize={"20"}
              username={"david sa"}
              usernameSize={"13"}
              usernameColor={styles.blackColor}
            />
            <Time>10시간전</Time>
          </ItemContainer_Top>
          <ItemContainer_Body>
            <Message>
              김상욱의 과학 공부 왜 세익스피어는 교양이지만 열역학 제2법칙은
              교양이 아닌 걸까?
            </Message>
          </ItemContainer_Body>
          <ItemContainer_Bottom>
            <IconContainer>
              <Post source={{ uri: styles.TempImage1 }} />
            </IconContainer>
            <IconContainer
              onPress={() =>
                navigation.push("Profile_User", {
                  fromScreen: navigation.state.routeName
                })
              }
            >
              <User source={{ uri: styles.TempImage2 }} />
            </IconContainer>
          </ItemContainer_Bottom>
        </ItemContainer>
      </ScrollView>
    </BaseContainer>
  );
};

export default Alarm;
