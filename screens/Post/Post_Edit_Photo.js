/// Import
import React, { useState, useEffect } from "react";
import { Text, ScrollView, Image, View, RefreshControl } from "react-native";
import styled from "styled-components";
import Swiper from "react-native-swiper";
import typeDef from "../../typeDef";
import styles from "../../styles";
import constants from "../../constants";

// apollo
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

/// Components
import Loader from "../../components/Loader";
import HeaderBase from "../../components/Header/HeaderBase";
import HeaderStyles from "../../components/Header/HeaderStyles";

/// Query
const SEE_POST = gql`
  query seeOnePost($id: String!) {
    seeOnePost(id: $id) {
      id
      files
      fileType
      voiceFile
      description
      location
      address
      voiceTime
      videoTime
      createdAt
      user {
        id
        avatar
        username
      }
      comments {
        id
        text
        user {
          id
          avatar
          username
        }
        createdAt
      }
    }
  }
`;

/// Styled Components
const BaseContainer = styled.View`
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

/// Cover
const CoverContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: ${constants.width * 0.9};
  height: ${constants.width * 0.9};
  margin-bottom: ${constants.margin05};
`;

const Cover = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${constants.width * 0.02};
`;

/// Case
const CaseContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: ${constants.width * 0.9};
  margin-bottom: ${constants.margin05};
`;

/// Item
const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  width: ${(constants.width * 0.85) / 2};
  height: ${(constants.width * 0.85) / 2};
  margin-bottom: ${constants.margin05};
`;

/// Item - Button
const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 20%;
  margin-bottom: ${constants.margin05};
  position: absolute;
`;
const Button_Check = styled.Image`
  width: 50%;
  height: 50%;
`;

const Button_UnCheck = styled.Image`
  width: 50%;
  height: 50%;
`;

let files = [
  "https://images.unsplash.com/photo-1580673891739-0a913c117cd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1580698033320-1b9c13881c06?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
];

//let postPhoto = [];

const Post_Edit_Photo = ({ navigation }) => {
  /// getParam
  const postId = navigation.getParam("id", "");
  const fromScreen = navigation.getParam("fromScreen", "");

  /// useState
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const [postPhoto, setPostPhoto] = useState([]);
  const [init, setInit] = useState(true);

  /// Graphql
  let onePost = useQuery(SEE_POST, {
    variables: { id: postId },
    fetchPolicy: "network-only"
  });

  /// 데이터 세팅
  if (init === true) {
    if (!onePost.loading) {
      if (onePost.data !== undefined) {
        let tempData = [];
        onePost.data.seeOnePost.files.map(value =>
          tempData.push({ isChecked: false, file: value })
        );
        setPostPhoto(tempData);
        setInit(false);
      }
    }
  }

  ///
  const editPostPhoto = () => {
    let resultData = [];

    postPhoto.map(value => {
      if (value.isChecked === false) {
        resultData.push(value.file);
      }
    });

    navigation.state.params.postData.action = typeDef.DELETE_PHOTO;
    navigation.state.params.postData.files = resultData;
    navigation.state.params.handleEditPost();
    navigation.navigate(fromScreen);
  };

  const clickPhoto = id => {
    let tempData = postPhoto;

    tempData.map(value => {
      if (value.file === id) {
        value.isChecked ? (value.isChecked = false) : (value.isChecked = true);
      }
    });

    setPostPhoto([...tempData]);
  };

  return (
    <BaseContainer
      onLayout={event => {
        setBaseSize(event.nativeEvent.layout);
      }}
    >
      <HeaderBase
        leftItem={[
          {
            object: HeaderStyles.WORD_CANCLE,
            link: () => navigation.navigate(fromScreen)
          }
        ]}
        rightItem={[
          {
            object: HeaderStyles.WORD_COMPLETE,
            link: () => {
              editPostPhoto();
            }
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
        {init ? (
          <Loader />
        ) : (
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <CoverContainer>
              <Swiper activeDotColor={"#FFFFFF"} autoplay={false} loop={false}>
                {postPhoto.map((value, index) => (
                  <Cover key={index} source={{ uri: value.file }} />
                ))}
              </Swiper>
            </CoverContainer>
            <CaseContainer>
              {postPhoto.map((value, index) => (
                <ItemContainer
                  onPress={() => {
                    clickPhoto(value.file);
                  }}
                  key={index}
                >
                  <Cover source={{ uri: value.file }} />
                  {value.isChecked ? (
                    <ButtonContainer>
                      <Button_Check
                        source={require("../../assets/iconmonstr-circle-moment.png")}
                      />
                    </ButtonContainer>
                  ) : null}
                </ItemContainer>
              ))}
            </CaseContainer>
          </View>
        )}
      </ScrollView>
    </BaseContainer>
  );
};

export default Post_Edit_Photo;
