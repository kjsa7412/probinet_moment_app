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
import PostMultiple from "../../../components/Post/PostMultiple";

/// Styled Components
const BaseContainer = styled.View`
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

/// Header
const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 90%;
`;

const HeaderLeftContainer = styled.TouchableOpacity`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 15%;
`;

const HeaderCenterContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
`;

const HeaderRightContainer = styled.TouchableOpacity`
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 15%;
`;

/// Title
const TitleContainer = styled.View`
  flex-direction: column;
  align-items: center;
  margin-top: ${constants.margin03};
  margin-bottom: ${constants.margin01};
`;

/// Location
const LocationContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${constants.margin01};
`;

const Location = styled.Image`
  width: ${constants.width * 0.03};
  height: ${constants.width * 0.03};
  margin-right: ${constants.margin01};
`;

/// Search
const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
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

const Search = ({ navigation }) => {
  const fromScreen = navigation.getParam("fromScreen", "");
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0, x: 0, y: 0 });

  return (
    <BaseContainer
      onLayout={event => {
        setBaseSize(event.nativeEvent.layout);
      }}
    >
      <HeaderContainer>
        <HeaderLeftContainer onPress={() => {}}>
          <Image
            style={{ width: 35, height: 35 }}
            source={require("../../../assets/iconmonstr-circle-moment.png")}
          />
        </HeaderLeftContainer>
        <HeaderCenterContainer>
          <TitleContainer>
            <Text
              style={{
                color: styles.blackColor,
                fontFamily: "NanumBarunGothicLight",
                fontSize: 20
              }}
            >
              2020년 2월 4일 17:40
            </Text>
            <LocationContainer>
              <Location
                source={require("../../../assets/iconmonstr-location-black.png")}
              />
              <Text
                style={{
                  color: styles.greyColor,
                  fontFamily: "NanumBarunGothicLight",
                  fontSize: 13
                }}
              >
                busan, republic of korea
              </Text>
            </LocationContainer>
          </TitleContainer>
        </HeaderCenterContainer>
        <HeaderRightContainer
          onPress={() =>
            navigation.push("Search_Main", {
              fromScreen: navigation.state.routeName,
              id: "a"
            })
          }
        >
          <Image
            style={{ width: 35, height: 35 }}
            source={require("../../../assets/iconmonstr-circle-moment.png")}
          />
        </HeaderRightContainer>
      </HeaderContainer>

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
        <SearchContainer>
          <SearchIconContainer>
            <Icon
              source={require("../../../assets/iconmonstr-circle-moment.png")}
            />
          </SearchIconContainer>
          <SearchBarContainer>
            <InputBase
              onChangeText={() => {}}
              placeholder={"태그를 검색해보세요."}
              fontSize={15}
              returnKeyType={"done"}
              keyboardType={"default"}
              color={styles.blackColor}
              placeholderTextColor={styles.darkGreyColor}
              fontFamily={"NanumBarunGothicLight"}
            />
          </SearchBarContainer>
          <DeleteIconContainer>
            <Icon
              source={require("../../../assets/iconmonstr-circle-moment.png")}
            />
          </DeleteIconContainer>
        </SearchContainer>
        <PostMultiple
          post={[
            { id: "1", cover: styles.TempImage1 },
            { id: "2", cover: styles.TempImage1 },
            { id: "3", cover: styles.TempImage1 },
            { id: "4", cover: styles.TempImage1 },
            { id: "5", cover: styles.TempImage1 },
            { id: "6", cover: styles.TempImage1 },
            { id: "7", cover: styles.TempImage1 }
          ]}
        />
      </ScrollView>
    </BaseContainer>
  );
};

export default Search;
