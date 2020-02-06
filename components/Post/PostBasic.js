///
import React from "react";
import styled from "styled-components";
import { ScrollView, Text } from "react-native";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";

///
import styles from "../../styles";
import constants from "../../constants";
import typeDef from "../../typeDef";

/// Container
const Touchable = styled.TouchableOpacity``;

const BaseContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${constants.width * 0.9};
`;

/// Cover
const CoverContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: ${constants.width * 0.9};
  height: ${constants.width * 0.9};
  margin-bottom: ${constants.margin02};
`;

const Cover = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${constants.width * 0.02};
`;

/// Video
const VideoContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: ${constants.width * 0.9};
  height: ${constants.width * 0.9};
  margin-bottom: ${constants.margin02};
`;

const VideoCountContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${constants.width * 0.12};
  height: ${constants.width * 0.06};
  margin-top: ${constants.margin03};
  margin-bottom: ${constants.margin03};
  margin-left: ${constants.margin03};
  margin-right: ${constants.margin03};
  border-radius: ${constants.width * 0.02};
  background-color: ${styles.blackColor};
  opacity: 0.5;
  position: absolute;
`;

/// Body
const BodyContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: ${constants.width * 0.9};
`;

const BodyLeftContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 15%;
`;

const BodyCenterContainer = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 70%;
`;

const BodyRightContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 15%;
  background-color: ${styles.redColor};
`;

const BodyContentsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : 0)};
`;

const BodyContentsContainer_Touch = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : 0)};
`;

/// BodyCenter - location
const Location = styled.Image`
  width: ${constants.width * 0.03};
  height: ${constants.width * 0.03};
  margin-right: ${constants.margin01};
`;

/// BodyCenter - avatar
const Avatar = styled.Image`
  width: ${constants.width * 0.05};
  height: ${constants.width * 0.05};
  margin-right: ${constants.margin01};
  border-radius: ${(constants.width * 0.05) / 2};
`;

/// BodyLeft - Audio
const AudioContainer = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Audio = styled.Image`
  width: ${constants.width * 0.08};
  height: ${constants.width * 0.08};
  margin-bottom: ${constants.margin01};
  border-radius: ${(constants.width * 0.08) / 2};
`;

const PostBasic = ({
  navigation,
  id,
  postType = typeDef.POSTTYPE_PHOTO,
  photo = [],
  video,
  videoCover,
  videoCount,
  audio,
  audioCount,
  contents,
  time,
  location,
  address,
  avatar,
  username
}) => {
  return (
    <BaseContainer>
      {postType === typeDef.POSTTYPE_PHOTO ? (
        <CoverContainer>
          <Swiper activeDotColor={"#FFFFFF"} autoplay={false} loop={false}>
            {photo.map((value, index) => (
              <Cover key={index} source={{ uri: value }} />
            ))}
          </Swiper>
        </CoverContainer>
      ) : (
        <VideoContainer>
          <Cover source={{ uri: videoCover }} />
          <VideoCountContainer>
            <Text
              style={{
                color: styles.whiteColor,
                fontFamily: "NanumBarunGothicBold",
                fontSize: 13
              }}
            >
              {videoCount}
            </Text>
          </VideoCountContainer>
        </VideoContainer>
      )}
      <BodyContainer>
        <BodyLeftContainer>
          {audio === undefined || audio === null || audio === "" ? null : (
            <AudioContainer>
              <Audio source={require("../../assets/iconmonstr-play.png")} />
              <Text
                style={{
                  color: styles.blackColor,
                  fontFamily: "NanumBarunGothicBold",
                  fontSize: 10
                }}
              >
                {audioCount}
              </Text>
            </AudioContainer>
          )}
        </BodyLeftContainer>
        <BodyCenterContainer
          onPress={() =>
            navigation.push("Post", {
              fromScreen: navigation.state.routeName,
              id: id
            })
          }
        >
          {contents === undefined ||
          contents === null ||
          contents === "" ? null : (
            <BodyContentsContainer marginBottom={constants.margin03}>
              <Text
                style={{
                  color: styles.blackColor,
                  fontFamily: "NanumBarunGothicLight",
                  fontSize: 15
                }}
              >
                {contents}
              </Text>
            </BodyContentsContainer>
          )}
          {time === undefined || time === null || time === "" ? null : (
            <BodyContentsContainer marginBottom={constants.margin01}>
              <Text
                style={{
                  color: styles.blackColor,
                  fontFamily: "NanumBarunGothicLight",
                  fontSize: 13
                }}
              >
                {time}
              </Text>
            </BodyContentsContainer>
          )}
          {location === undefined ||
          location === null ||
          location === "" ? null : (
            <BodyContentsContainer marginBottom={constants.margin01}>
              <Location
                source={require("../../assets/iconmonstr-location-black.png")}
              />
              <Text
                style={{
                  color: styles.greyColor,
                  fontFamily: "NanumBarunGothicLight",
                  fontSize: 13
                }}
              >
                {location}
              </Text>
            </BodyContentsContainer>
          )}

          <BodyContentsContainer_Touch
            onPress={() =>
              navigation.push("Profile_User", {
                fromScreen: navigation.state.routeName
              })
            }
            marginBottom={constants.margin01}
          >
            <Avatar source={{ uri: avatar }} />
            <Text
              style={{
                color: styles.blackColor,
                fontFamily: "NanumBarunGothicBold",
                fontSize: 13
              }}
            >
              {username}
            </Text>
          </BodyContentsContainer_Touch>
        </BodyCenterContainer>
        <BodyRightContainer></BodyRightContainer>
      </BodyContainer>
    </BaseContainer>
  );
};

PostBasic.propTypes = {
  navigation: PropTypes.any,
  id: PropTypes.any,
  postType: PropTypes.any,
  photo: PropTypes.array,
  video: PropTypes.any,
  videoCover: PropTypes.any,
  videoCount: PropTypes.any,
  audio: PropTypes.any,
  audioCount: PropTypes.any,
  contents: PropTypes.any,
  time: PropTypes.any,
  location: PropTypes.any,
  address: PropTypes.any,
  avatar: PropTypes.any,
  username: PropTypes.any
};

export default PostBasic;
