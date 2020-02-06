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
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: ${constants.margin05};
`;

const ItemTitle = styled.Text`
  color: ${styles.blackColor};
  font-family: ${"NanumBarunGothicBold"};
  font-size: 13;
`;

const ItemDesc = styled.Text`
  color: ${styles.greyColor};
  font-family: ${"NanumBarunGothicLight"};
  font-size: 13;
`;

const Search_Main_Location = ({ navigation }) => {
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
            object: HeaderStyles.LOCATION,
            link: () => {}
          }
        ]}
      />
      <SearchContainer>
        <InputBase
          onChangeText={() => {}}
          placeholder={"위치를 입력하세요."}
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
        <ItemContainer>
          <ItemTitle>동래 홈플러스 </ItemTitle>
          <ItemDesc>Oncheonjang-ro, Dongnae-gu, Busan, Republic of...</ItemDesc>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>동래 홈플러스 </ItemTitle>
          <ItemDesc>Oncheonjang-ro, Dongnae-gu, Busan, Republic of...</ItemDesc>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>동래 홈플러스 </ItemTitle>
          <ItemDesc>Oncheonjang-ro, Dongnae-gu, Busan, Republic of...</ItemDesc>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>동래 홈플러스 </ItemTitle>
          <ItemDesc>Oncheonjang-ro, Dongnae-gu, Busan, Republic of...</ItemDesc>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>동래 홈플러스 </ItemTitle>
          <ItemDesc>Oncheonjang-ro, Dongnae-gu, Busan, Republic of...</ItemDesc>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>동래 홈플러스 </ItemTitle>
          <ItemDesc>Oncheonjang-ro, Dongnae-gu, Busan, Republic of...</ItemDesc>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>동래 홈플러스 </ItemTitle>
          <ItemDesc>Oncheonjang-ro, Dongnae-gu, Busan, Republic of...</ItemDesc>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>동래 홈플러스 </ItemTitle>
          <ItemDesc>Oncheonjang-ro, Dongnae-gu, Busan, Republic of...</ItemDesc>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>동래 홈플러스 </ItemTitle>
          <ItemDesc>Oncheonjang-ro, Dongnae-gu, Busan, Republic of...</ItemDesc>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>동래 홈플러스 </ItemTitle>
          <ItemDesc>Oncheonjang-ro, Dongnae-gu, Busan, Republic of...</ItemDesc>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>동래 홈플러스 </ItemTitle>
          <ItemDesc>Oncheonjang-ro, Dongnae-gu, Busan, Republic of...</ItemDesc>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>동래 홈플러스 </ItemTitle>
          <ItemDesc>Oncheonjang-ro, Dongnae-gu, Busan, Republic of...</ItemDesc>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>동래 홈플러스 </ItemTitle>
          <ItemDesc>Oncheonjang-ro, Dongnae-gu, Busan, Republic of...</ItemDesc>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>동래 홈플러스 </ItemTitle>
          <ItemDesc>Oncheonjang-ro, Dongnae-gu, Busan, Republic of...</ItemDesc>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>동래 홈플러스 </ItemTitle>
          <ItemDesc>Oncheonjang-ro, Dongnae-gu, Busan, Republic of...</ItemDesc>
        </ItemContainer>
      </ScrollView>
    </BaseContainer>
  );
};

export default Search_Main_Location;
