/// Import
import React, { useState, useEffect } from "react";
import { Text, ScrollView, Image } from "react-native";
import styled from "styled-components";
import styles from "../../../styles";
import typeDef from "../../../typeDef";
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
import PostBasic from "../../../components/Post/PostBasic";
import PostMultiple from "../../../components/Post/PostMultiple";
import Status from "../../../components/Status/Status";

/// Styled Components
const TouchableOpacity = styled.TouchableOpacity``;

const BaseContainer = styled.View`
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

/// Photo + Avatar
const PAConatiner = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  height: ${constants.width * 0.75};
  margin-top: ${constants.margin05};
  margin-bottom: ${constants.margin05};
`;

const Photo = styled.Image`
  width: 100%;
  height: ${constants.width * 0.6};
`;

const AvatarConatiner = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: ${constants.width * 0.75};
  position: absolute;
`;

const BlankAvatar = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${constants.width * 0.3};
  height: ${constants.width * 0.3};
  border-radius: ${(constants.width * 0.3) / 2};
  background-color: ${styles.whiteColor};
`;

const Avatar = styled.Image`
  width: ${constants.width * 0.3 - 4};
  height: ${constants.width * 0.3 - 4};
  border-radius: ${(constants.width * 0.3) / 2};
`;

/// Username
const UsernameConatiner = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: ${constants.margin05};
`;

const Username = styled.Text`
  color: ${styles.blackColor};
  font-family: NanumBarunGothicBold;
  font-size: 50;
`;

/// Bio
const BioConatiner = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin-bottom: ${constants.margin05};
`;

const Bio = styled.Text`
  color: ${styles.blackColor};
  text-align: center;
  font-family: NanumBarunGothicLight;
  font-size: 15;
`;

/// Post Option
const PostOptionConatiner = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${constants.width * 0.2};
  margin-bottom: ${constants.margin05};
`;

const OnePost = styled.Image`
  width: ${constants.width * 0.07};
  height: ${constants.width * 0.07};
`;

const MultiplePost = styled.Image`
  width: ${constants.width * 0.07};
  height: ${constants.width * 0.07};
`;

/// OnePost
const OnePostContainer = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: ${constants.margin05};
`;

const Profile_User = ({ navigation }) => {
  const fromScreen = navigation.getParam("fromScreen", "");
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const [postOption, setPostOption] = useState(typeDef.Profile_PostOption_One);

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
        <PAConatiner>
          <Photo source={{ uri: styles.TempImage1 }} />
          <AvatarConatiner>
            <BlankAvatar>
              <Avatar source={{ uri: styles.TempImage2 }} />
            </BlankAvatar>
          </AvatarConatiner>
        </PAConatiner>
        <UsernameConatiner>
          <Username>DAVID SA</Username>
        </UsernameConatiner>
        <Status navigation={navigation} isMe={false} />
        <BioConatiner>
          <Bio>
            김상욱의 과학 공부 왜 세익스피어는 교양이지만 열역학 제2법칙은
            교양이 아닌 걸까?
          </Bio>
        </BioConatiner>
        <PostOptionConatiner>
          <TouchableOpacity
            onPress={() => {
              setPostOption(typeDef.Profile_PostOption_One);
            }}
          >
            <OnePost
              source={require("../../../assets/iconmonstr-circle-moment.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPostOption(typeDef.Profile_PostOption_Multiple);
            }}
          >
            <MultiplePost
              source={require("../../../assets/iconmonstr-circle-moment.png")}
            />
          </TouchableOpacity>
        </PostOptionConatiner>

        {postOption === typeDef.Profile_PostOption_One ? (
          <OnePostContainer
            onPress={() =>
              navigation.push("Post", {
                fromScreen: navigation.state.routeName,
                id: "a"
              })
            }
          >
            <PostBasic
              navigation={navigation}
              id={"a"}
              postType={typeDef.POSTTYPE_PHOTO}
              photo={[styles.TempImage1, styles.TempImage1]}
              audio={""}
              audioCount={"0:30"}
              contents={"당신의 낭만적인 순간은 언제였나요?"}
              time={"2020.2.4  17:40"}
              location={"busan, republic of korea"}
              avatar={styles.TempImage2}
              username={"david sa"}
            />
          </OnePostContainer>
        ) : null}

        {postOption === typeDef.Profile_PostOption_Multiple ? (
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
        ) : null}
      </ScrollView>
    </BaseContainer>
  );
};

export default Profile_User;
