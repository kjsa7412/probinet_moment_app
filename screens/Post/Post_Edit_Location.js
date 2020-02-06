/// Import
import React, { useState, useEffect } from "react";
import { ScrollView, Image } from "react-native";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import styles from "../../styles";
import constants from "../../constants";

// apollo
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

/// Components
import HeaderBase from "../../components/Header/HeaderBase";
import HeaderStyles from "../../components/Header/HeaderStyles";
import InputBase from "../../components/Input/InputBase";

/// Styled Components
const BaseContainer = styled.View`
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

/// Title
const TitleContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

/// Search
const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${constants.width * 0.9};
  height: ${constants.width * 0.08};
  border-radius: ${constants.width * 0.03};
  background-color: ${styles.lightGreyColor};
  margin-top: ${constants.margin03};
  margin-bottom: ${constants.margin03};
`;

const SearchIconContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 10%;
  height: 100%;
`;

const SearchBarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 80%
  height: 100%;
`;

const DeleteIconContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 10%;
  height: 100%;
`;

const Icon = styled.Image`
  width: 25;
  height: 25;
`;

/// Result
const ResultContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: ${constants.width * 0.9};
  margin-bottom: ${constants.margin05};
`;

const ResultItemContainer = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${constants.margin03};
  margin-bottom: ${constants.margin03};
`;

const Line = styled.View`
  border: 0.5px solid
  border-color: ${props =>
    props.lineColor ? props.lineColor : styles.greyColor};
  border-top-width: 0.5;
  width: 70%;
  margin-top: ${constants.margin03};
`;

const Text = styled.Text`
  text-align: center;
  font-size: 13;
  font-family: NanumBarunGothicBold;
`;

const Post_Edit_Location = ({ navigation }) => {
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
      />
      <TitleContainer>
        <Text
          style={{
            color: styles.blackColor,
            fontFamily: "NanumBarunGothicBold",
            fontSize: 20
          }}
        >
          장소를 선택하세요.
        </Text>
        <Text
          style={{
            color: styles.blackColor,
            fontFamily: "NanumBarunGothicLight",
            fontSize: 10,
            marginTop: constants.margin02
          }}
        >
          게시물 작성 당시 위치를 기반으로 선정된 장소입니다.
        </Text>
      </TitleContainer>
      <SearchContainer>
        <SearchIconContainer>
          <Icon source={require("../../assets/iconmonstr-circle-moment.png")} />
        </SearchIconContainer>
        <SearchBarContainer>
          <InputBase
            onChangeText={() => {}}
            placeholder={"장소를 입력하세요."}
            fontSize={15}
            returnKeyType={"done"}
            keyboardType={"default"}
            color={styles.blackColor}
            placeholderTextColor={styles.darkGreyColor}
            fontFamily={"NanumBarunGothicLight"}
          />
        </SearchBarContainer>
        <DeleteIconContainer>
          <Icon source={require("../../assets/iconmonstr-circle-moment.png")} />
        </DeleteIconContainer>
      </SearchContainer>
      <ResultContainer>
        <ResultItemContainer>
          <Text>Oncheonjang-ro, Dongnae-gu, Busan, Republic of...</Text>
        </ResultItemContainer>
        <Line />
      </ResultContainer>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
        contentContainerStyle={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ResultItemContainer>
          <Text>동래 홈플러스</Text>
        </ResultItemContainer>
        <ResultItemContainer>
          <Text>동래 홈플러스</Text>
        </ResultItemContainer>
        <ResultItemContainer>
          <Text>동래 홈플러스</Text>
        </ResultItemContainer>
        <ResultItemContainer>
          <Text>동래 홈플러스</Text>
        </ResultItemContainer>
        <ResultItemContainer>
          <Text>동래 홈플러스</Text>
        </ResultItemContainer>
        <ResultItemContainer>
          <Text>동래 홈플러스</Text>
        </ResultItemContainer>
        <ResultItemContainer>
          <Text>동래 홈플러스</Text>
        </ResultItemContainer>
        <ResultItemContainer>
          <Text>동래 홈플러스</Text>
        </ResultItemContainer>
        <ResultItemContainer>
          <Text>동래 홈플러스</Text>
        </ResultItemContainer>
        <ResultItemContainer>
          <Text>동래 홈플러스</Text>
        </ResultItemContainer>
        <ResultItemContainer>
          <Text>동래 홈플러스</Text>
        </ResultItemContainer>
        <ResultItemContainer>
          <Text>동래 홈플러스</Text>
        </ResultItemContainer>
        <ResultItemContainer>
          <Text>동래 홈플러스</Text>
        </ResultItemContainer>
        <ResultItemContainer>
          <Text>동래 홈플러스</Text>
        </ResultItemContainer>
        <ResultItemContainer>
          <Text>동래 홈플러스</Text>
        </ResultItemContainer>
        <ResultItemContainer>
          <Text>동래 홈플러스</Text>
        </ResultItemContainer>
      </ScrollView>
    </BaseContainer>
  );
};

export default Post_Edit_Location;
