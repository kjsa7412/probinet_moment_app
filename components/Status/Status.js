import React, { useState, useEffect } from "react";
import { Text, ScrollView, Image, View } from "react-native";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import styled from "styled-components";
import constants from "../../constants";
import styles from "../../styles";
import typeDef from "../../typeDef";

/// Container
const BaseContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${constants.width * 0.25}
  background-color:${styles.momentColor};
  margin-bottom: ${constants.margin05};
`;

const StatusConatiner = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%
  height: 100%
`;

const StatusItemConatiner = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${props => props.itemWidth};
  height: 100%;
`;

const WordStatus = styled.Text`
  color: ${styles.whiteColor};
  text-align: center;
  font-family: NanumBarunGothicBold;
  font-size: 15;
`;

const NumberStatus = styled.Text`
  color: ${styles.whiteColor};
  text-align: center;
  font-family: NanumBarunGothicBold;
  font-size: 30;
`;

const DescStatus = styled.Text`
  color: ${styles.whiteColor};
  text-align: center;
  font-family: NanumBarunGothicLight;
  font-size: 15;
  margin-top: ${constants.margin01};
`;

const Status = ({ navigation, isMe = false }) => {
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0, x: 0, y: 0 });

  return (
    <BaseContainer
      onLayout={event => {
        setBaseSize(event.nativeEvent.layout);
      }}
    >
      {isMe ? (
        <StatusConatiner>
          <StatusItemConatiner
            onPress={() =>
              navigation.push("Profile_Follower", {
                fromScreen: navigation.state.routeName
              })
            }
            itemWidth={"25%"}
          >
            <NumberStatus>1K</NumberStatus>
            <DescStatus>팔로워</DescStatus>
          </StatusItemConatiner>
          <StatusItemConatiner
            onPress={() =>
              navigation.push("Profile_Following", {
                fromScreen: navigation.state.routeName
              })
            }
            itemWidth={"25%"}
          >
            <NumberStatus>1K</NumberStatus>
            <DescStatus>팔로잉</DescStatus>
          </StatusItemConatiner>
          <StatusItemConatiner
            onPress={() =>
              navigation.push("Profile_Message_List", {
                fromScreen: navigation.state.routeName
              })
            }
            itemWidth={"25%"}
          >
            <NumberStatus>50</NumberStatus>
            <DescStatus>메시지</DescStatus>
          </StatusItemConatiner>
          <StatusItemConatiner
            onPress={() =>
              navigation.push("Profile_Setting", {
                fromScreen: navigation.state.routeName
              })
            }
            itemWidth={"25%"}
          >
            <WordStatus>Setting</WordStatus>
          </StatusItemConatiner>
        </StatusConatiner>
      ) : (
        <StatusConatiner>
          <StatusItemConatiner
            onPress={() =>
              navigation.push("ProfileMessageNavigation", {
                fromScreen: navigation.state.routeName
              })
            }
            itemWidth={"50%"}
          >
            <WordStatus>Message</WordStatus>
          </StatusItemConatiner>
          <StatusItemConatiner onPress={() => {}} itemWidth={"50%"}>
            <WordStatus>Follow</WordStatus>
          </StatusItemConatiner>
        </StatusConatiner>
      )}
    </BaseContainer>
  );
};

Status.propTypes = {
  navigation: PropTypes.any,
  isMe: PropTypes.bool
};

export default Status;
