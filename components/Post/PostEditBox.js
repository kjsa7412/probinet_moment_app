///
import React, { useState, useEffect } from "react";
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

/// Base
const BaseContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: ${props => props.height};
  position: absolute;
`;

const BlankContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  background-color: ${styles.blueColor};
  opacity: 0;
`;

/// Option
const OptionContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width:${constants.width * 0.95};
  height:${constants.width * 0.4};
  border-radius: 10;
  background-color: ${styles.blackColor}
  opacity: 0.8;
`;

/// Option - Item
const OptionItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${props => props.width};
  height: ${props => props.height};
`;

const OptionItemContainer_One = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${props => props.width};
  height: ${props => props.height};
`;

const ItemContainer = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${props => props.size};
  height: ${props => props.size};
`;

const ItemImage = styled.Image`
  width: 30%;
  height: 30%;
`;

/// Option - Message
const OptionMessageContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${props => props.width};
  height: ${props => props.height};
`;

const MessageTopContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50%;
`;

/// Text
const TitleText = styled.Text`
  color: ${styles.whiteColor};
  text-align: center;
  font-size: 15;
  font-family: NanumBarunGothicBold;
`;

const DescText = styled.Text`
  color: ${styles.whiteColor};
  text-align: center;
  font-size: 10;
  font-family: NanumBarunGothicLight;
  margin-top: ${constants.margin01};
`;

const Message = styled.Text`
  color: ${styles.whiteColor};
  text-align: center;
  font-size: 20;
  font-family: NanumBarunGothicBold;
`;

const Answer = styled.Text`
  color: ${styles.whiteColor};
  text-align: center;
  font-size: 15;
  font-family: NanumBarunGothicLight;
`;

const PostEditBox = ({
  navigation,
  id,
  height,
  isMe = true,
  handleEditPost = () => {},
  postData,
  description
}) => {
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const [step, setStep] = useState(typeDef.PostEdit_Step_Main);

  return step === typeDef.PostEdit_Step_None ? null : (
    <BaseContainer height={height}>
      <OptionContainer
        onLayout={event => {
          setBaseSize(event.nativeEvent.layout);
        }}
      >
        {/* Me  */}
        {isMe && step === typeDef.PostEdit_Step_Main ? (
          <OptionItemContainer width={"80%"} height={"80%"}>
            <ItemContainer
              onPress={() => {
                setStep(typeDef.PostEdit_Step_Delete);
              }}
              size={baseSize.height * 0.4}
            >
              <ItemImage
                source={require("../../assets/iconmonstr-circle-moment.png")}
              />
              <DescText>삭제</DescText>
            </ItemContainer>

            <ItemContainer
              onPress={() => {
                setStep(typeDef.PostEdit_Step_Public);
              }}
              size={baseSize.height * 0.4}
            >
              <ItemImage
                source={require("../../assets/iconmonstr-circle-moment.png")}
              />
              <DescText>공개</DescText>
            </ItemContainer>

            <ItemContainer
              onPress={() => {
                setStep(typeDef.PostEdit_Step_Write);
              }}
              size={baseSize.height * 0.4}
            >
              <ItemImage
                source={require("../../assets/iconmonstr-circle-moment.png")}
              />
              <DescText>수정</DescText>
            </ItemContainer>
          </OptionItemContainer>
        ) : null}

        {/* User  */}
        {!isMe && step === typeDef.PostEdit_Step_Main ? (
          <OptionItemContainer_One width={"80%"} height={"80%"}>
            <ItemContainer
              onPress={() =>
                navigation.push("Post_Edit_Report", {
                  fromScreen: navigation.state.routeName,
                  id: "a"
                })
              }
              size={baseSize.height * 0.4}
            >
              <ItemImage
                source={require("../../assets/iconmonstr-circle-moment.png")}
              />
              <DescText>신고하기</DescText>
            </ItemContainer>
          </OptionItemContainer_One>
        ) : null}

        {/* Public  */}
        {step === typeDef.PostEdit_Step_Public ? (
          <OptionMessageContainer width={"80%"} height={"80%"}>
            <MessageTopContainer>
              <Message>공개 여부를 선택하세요.</Message>
            </MessageTopContainer>
            <OptionItemContainer width={"90%"} height={"50%"}>
              <ItemContainer
                onPress={() => {
                  postData.action = typeDef.EDIT_PRIVATE;
                  postData.open = true;
                  handleEditPost();
                  setStep(typeDef.PostEdit_Step_None);
                }}
                size={baseSize.height * 0.4}
              >
                <Answer>공개</Answer>
              </ItemContainer>
              <ItemContainer
                onPress={() => {
                  postData.action = typeDef.EDIT_PRIVATE;
                  postData.open = false;
                  handleEditPost();
                  setStep(typeDef.PostEdit_Step_None);
                }}
                size={baseSize.height * 0.4}
              >
                <Answer>비공개</Answer>
              </ItemContainer>
            </OptionItemContainer>
          </OptionMessageContainer>
        ) : null}

        {/* Write */}
        {step === typeDef.PostEdit_Step_Write ? (
          <OptionItemContainer width={"70%"} height={"80%"}>
            <ItemContainer
              onPress={() =>
                navigation.push("Post_Edit_Location", {
                  fromScreen: navigation.state.routeName,
                  handleEditPost: handleEditPost,
                  postData: postData,
                  id: id
                })
              }
              size={baseSize.height * 0.4}
            >
              <ItemImage
                source={require("../../assets/iconmonstr-circle-moment.png")}
              />
              <DescText>장소선택</DescText>
            </ItemContainer>

            <ItemContainer
              onPress={() =>
                navigation.push("Post_Edit_Write", {
                  fromScreen: navigation.state.routeName,
                  handleEditPost: handleEditPost,
                  postData: postData,
                  id: id,
                  description: description
                })
              }
              size={baseSize.height * 0.4}
            >
              <ItemImage
                source={require("../../assets/iconmonstr-circle-moment.png")}
              />
              <DescText>글쓰기</DescText>
            </ItemContainer>
          </OptionItemContainer>
        ) : null}

        {/* Delete */}
        {step === typeDef.PostEdit_Step_Delete ? (
          <OptionItemContainer width={"95%"} height={"80%"}>
            <ItemContainer
              onPress={() => {
                setStep(typeDef.PostEdit_Step_Delete_Post);
              }}
              size={baseSize.height * 0.4}
            >
              <TitleText>포스트</TitleText>
              <DescText>삭제</DescText>
            </ItemContainer>

            <ItemContainer
              onPress={() =>
                navigation.push("Post_Edit_Photo", {
                  fromScreen: navigation.state.routeName,
                  handleEditPost: handleEditPost,
                  postData: postData,
                  id: id
                })
              }
              size={baseSize.height * 0.4}
            >
              <TitleText>사진</TitleText>
              <DescText>삭제</DescText>
            </ItemContainer>

            <ItemContainer
              onPress={() => {
                setStep(typeDef.PostEdit_Step_Delete_Voice);
              }}
              size={baseSize.height * 0.4}
            >
              <TitleText>음성</TitleText>
              <DescText>삭제</DescText>
            </ItemContainer>

            <ItemContainer
              onPress={() => {
                setStep(typeDef.PostEdit_Step_Delete_Location);
              }}
              size={baseSize.height * 0.4}
            >
              <TitleText>장소</TitleText>
              <DescText>삭제</DescText>
            </ItemContainer>

            <ItemContainer
              onPress={() => {
                setStep(typeDef.PostEdit_Step_Delete_Write);
              }}
              size={baseSize.height * 0.4}
            >
              <TitleText>글</TitleText>
              <DescText>삭제</DescText>
            </ItemContainer>
          </OptionItemContainer>
        ) : null}

        {step === typeDef.PostEdit_Step_Delete_Post ||
        step === typeDef.PostEdit_Step_Delete_Voice ||
        step === typeDef.PostEdit_Step_Delete_Location ||
        step === typeDef.PostEdit_Step_Delete_Write ? (
          <OptionMessageContainer width={"80%"} height={"80%"}>
            <MessageTopContainer>
              <Message>삭제 하시겠습니까?</Message>
            </MessageTopContainer>
            <OptionItemContainer width={"90%"} height={"50%"}>
              <ItemContainer
                onPress={() => {
                  switch (step) {
                    case typeDef.PostEdit_Step_Delete_Post:
                      postData.action = typeDef.DELETE_POST;
                      handleEditPost();
                      setStep(typeDef.PostEdit_Step_None);
                      break;
                    case typeDef.PostEdit_Step_Delete_Voice:
                      postData.action = typeDef.DELETE_VOICE;
                      handleEditPost();
                      setStep(typeDef.PostEdit_Step_None);
                      break;
                    case typeDef.PostEdit_Step_Delete_Location:
                      postData.action = typeDef.DELETE_LOCATION;
                      handleEditPost();
                      setStep(typeDef.PostEdit_Step_None);
                      break;
                    case typeDef.PostEdit_Step_Delete_Write:
                      postData.action = typeDef.DELETE_DESCRIPTION;
                      handleEditPost();
                      setStep(typeDef.PostEdit_Step_None);
                      break;
                    default:
                      throw Error("You can't do that. Action is undefined.");
                    // code block
                  }
                }}
                size={baseSize.height * 0.4}
              >
                <Answer>예</Answer>
              </ItemContainer>
              <ItemContainer onPress={() => {}} size={baseSize.height * 0.4}>
                <Answer>아니오</Answer>
              </ItemContainer>
            </OptionItemContainer>
          </OptionMessageContainer>
        ) : null}
      </OptionContainer>
      <BlankContainer />
    </BaseContainer>
  );
};

PostEditBox.propTypes = {
  navigation: PropTypes.any,
  id: PropTypes.any,
  height: PropTypes.any,
  isMe: PropTypes.bool,
  handleEditPost: PropTypes.func,
  postData: PropTypes.any,
  description: PropTypes.any
};

export default PostEditBox;
