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
  background-color: ${styles.momentColor};
`;

const BodyContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
`;

const CustomContainer_1 = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80%;
`;

/// Item
const ItemContainer = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
`;

const Item = styled.Image`
  width: ${constants.width * 0.12};
  height: ${constants.width * 0.12};
  margin-bottom: ${constants.margin02};
`;

/// Text
const TextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: ${constants.width * 0.1};
  margin-top: ${constants.margin01};
`;

/// Icon
const IconContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Icon = styled.Image`
  width: ${constants.width * 0.05};
  height: ${constants.width * 0.05};
`;

const Search_Main = ({ navigation }) => {
  const fromScreen = navigation.getParam("fromScreen", "");
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0, x: 0, y: 0 });

  return (
    <BaseContainer
      onLayout={event => {
        setBaseSize(event.nativeEvent.layout);
      }}
    >
      <HeaderBase
        centerItem={[
          {
            object: HeaderStyles.DELETE,
            link: () => navigation.navigate(fromScreen)
          }
        ]}
        backgroundColor={styles.momentColor}
      />
      <BodyContainer>
        <CustomContainer_1>
          <ItemContainer
            onPress={() =>
              navigation.push("Search_Main_Time", {
                fromScreen: navigation.state.routeName,
                id: "a"
              })
            }
          >
            <Item
              source={require("../../../assets/iconmonstr-circle-moment-Blank.png")}
            />
            <Text
              style={{
                color: styles.whiteColor,
                fontFamily: "NanumBarunGothicLight",
                fontSize: 10
              }}
            >
              Time
            </Text>
            <TextContainer>
              <Text
                style={{
                  color: styles.whiteColor,
                  fontFamily: "NanumBarunGothicLight",
                  fontSize: 20,
                  marginRight: constants.margin03
                }}
              >
                2020년 2월 4일 17:40
              </Text>
              <IconContainer>
                <Icon
                  source={require("../../../assets/iconmonstr-circle-moment-Blank.png")}
                />
              </IconContainer>
            </TextContainer>
          </ItemContainer>
          <ItemContainer
            onPress={() =>
              navigation.push("Search_Main_Location", {
                fromScreen: navigation.state.routeName,
                id: "a"
              })
            }
          >
            <Item
              source={require("../../../assets/iconmonstr-circle-moment-Blank.png")}
            />
            <Text
              style={{
                color: styles.whiteColor,
                fontFamily: "NanumBarunGothicLight",
                fontSize: 10
              }}
            >
              Location
            </Text>
            <TextContainer>
              <Text
                style={{
                  color: styles.whiteColor,
                  fontFamily: "NanumBarunGothicLight",
                  fontSize: 20,
                  marginRight: constants.margin03
                }}
              >
                busan, republic of korea
              </Text>
              <IconContainer>
                <Icon
                  source={require("../../../assets/iconmonstr-circle-moment-Blank.png")}
                />
              </IconContainer>
            </TextContainer>
          </ItemContainer>
          <ItemContainer
            onPress={() =>
              navigation.push("Search_Main_User", {
                fromScreen: navigation.state.routeName,
                id: "a"
              })
            }
          >
            <Item
              source={require("../../../assets/iconmonstr-circle-moment-Blank.png")}
            />
            <Text
              style={{
                color: styles.whiteColor,
                fontFamily: "NanumBarunGothicLight",
                fontSize: 10
              }}
            >
              User
            </Text>
          </ItemContainer>
        </CustomContainer_1>
      </BodyContainer>
    </BaseContainer>
  );
};

export default Search_Main;
