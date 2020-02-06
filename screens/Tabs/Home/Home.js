/// Import
import React, { useState, useEffect } from "react";
import { Text, ScrollView, Image, View, RefreshControl } from "react-native";
import styled from "styled-components";
import styles from "../../../styles";
import constants from "../../../constants";

// apollo
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

/// Components
import Loader from "../../../components/Loader";
import HeaderBase from "../../../components/Header/HeaderBase";
import HeaderStyles from "../../../components/Header/HeaderStyles";
import PostBasic from "../../../components/Post/PostBasic";
import typeDef from "../../../typeDef";

/// Query
const SEE_POST_LIST = gql`
  query seePostList_Home {
    seePostList_Home {
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
    }
  }
`;

/// Styled Components
const BaseContainer = styled.View`
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const PostContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${constants.margin05};
`;

const FloorContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${constants.width * 0.1};
`;

const Home = ({ navigation }) => {
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const [refreshing, setRefreshing] = useState(false);

  /// Graphql
  let postList = useQuery(SEE_POST_LIST, {
    fetchPolicy: "network-only"
  });

  const refresh = async () => {
    try {
      setRefreshing(true);
      await postList.refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <BaseContainer
      onLayout={event => {
        setBaseSize(event.nativeEvent.layout);
      }}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
        contentContainerStyle={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        {postList.loading ? (
          <Loader />
        ) : (
          postList.data.seePostList_Home.map(value => (
            <PostContainer key={value.id}>
              <PostBasic
                navigation={navigation}
                id={value.id}
                postType={value.fileType}
                photo={value.files}
                audio={value.voiceFile}
                audioCount={value.voiceTime}
                contents={value.description}
                time={value.createdAt}
                location={value.location}
                address={value.address}
                avatar={value.user.avatar}
                username={value.user.username}
                video={""}
                videoCover={styles.TempImage1}
                videoCount={value.videoTime}
              />
            </PostContainer>
          ))
        )}
        <FloorContainer />
      </ScrollView>
    </BaseContainer>
  );
};

export default Home;
