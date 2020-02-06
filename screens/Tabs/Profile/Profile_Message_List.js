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

/// Search
const SearchContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-bottom: ${constants.margin05};
`;

/// Icon
const IconContainer = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-top: ${constants.margin02};
`;

const Icon = styled.Image`
  width: ${constants.width * 0.05};
  height: ${constants.width * 0.05};
`;

/// Item
const ItemContainer = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: ${constants.margin05};
`;

const ItemTopContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${constants.margin02};
`;

const ItemBottomContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;

///
const Contents = styled.Text`
  color: ${styles.blackColor};
  font-family: ${"NanumBarunGothicLight"};
  font-size: 15;
`;

const Time = styled.Text`
  color: ${styles.blackColor};
  font-family: ${"NanumBarunGothicBold"};
  font-size: 13;
`;

const Profile_Message_List = ({ navigation }) => {
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
        rightItem={[
          {
            object: HeaderStyles.PLUS,
            link: () =>
              navigation.push("Profile_Message_New", {
                fromScreen: navigation.state.routeName
              })
          }
        ]}
      />
      <SearchContainer>
        <InputBase
          onChangeText={() => {}}
          placeholder={"사용자를 입력하세요."}
          fontSize={30}
          returnKeyType={"done"}
          keyboardType={"default"}
          color={styles.blackColor}
          placeholderTextColor={styles.darkGreyColor}
          fontFamily={"NanumBarunGothicBold"}
          isLine={true}
          lineColor={styles.darkGreyColor}
          textAlign={"center"}
        />
        <IconContainer>
          <Icon
            source={require("../../../assets/iconmonstr-circle-moment.png")}
          />
        </IconContainer>
      </SearchContainer>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ width: "80%" }}
        contentContainerStyle={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ItemContainer
          onPress={() =>
            navigation.push("ProfileMessageNavigation", {
              fromScreen: navigation.state.routeName
            })
          }
        >
          <ItemTopContainer>
            <UserName
              onPress={() => {}}
              avatar={styles.TempImage2}
              avatarSize={"25"}
              username={"david sa"}
              usernameSize={"20"}
              usernameColor={styles.blackColor}
            />
            <WordButton
              onPress={() => {}}
              size={"20"}
              text={"삭제"}
              color={styles.momentColor}
            />
          </ItemTopContainer>
          <ItemBottomContainer>
            <Contents>
              김상욱의 과학 공부 왜 세익스피어는 교양이지만 열역학 제2법칙은
              교양이 아닌 걸까?
            </Contents>
            <Time>10시간전</Time>
          </ItemBottomContainer>
        </ItemContainer>
      </ScrollView>
    </BaseContainer>
  );
};

export default Profile_Message_List;
