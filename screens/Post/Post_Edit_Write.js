/// Import
import React, { useState, useEffect } from "react";
import { Text, ScrollView, Image } from "react-native";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
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
import InputBase from "../../components/Input/InputBase";

/// Styled Components
const BaseContainer = styled.View`
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const Post_Edit_Write = ({ navigation }) => {
  const postId = navigation.getParam("id", "");
  const fromScreen = navigation.getParam("fromScreen", "");
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0, x: 0, y: 0 });
  let description = useInput(navigation.getParam("description", ""));

  ///
  const editPostWrite = () => {
    navigation.state.params.postData.action = typeDef.EDIT_DESCRIPTION;
    navigation.state.params.postData.description = description.value;
    navigation.state.params.handleEditPost();
    navigation.navigate(fromScreen);
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
            object: HeaderStyles.WORD_WRITE,
            link: () => {
              editPostWrite();
            }
          }
        ]}
      />

      <InputBase
        {...description}
        value={description.value}
        placeholder={"내용을 입력해주세요."}
        fontSize={20}
        multiline={true}
        returnKeyType={"next"}
        keyboardType={"default"}
        width={constants.width * 0.8}
        color={styles.blackColor}
        placeholderTextColor={styles.greyColor}
        fontFamily={"NanumBarunGothicBold"}
        textAlign={"center"}
      />
    </BaseContainer>
  );
};

export default Post_Edit_Write;
