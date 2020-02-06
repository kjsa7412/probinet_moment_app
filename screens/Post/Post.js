/// Import
import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  Image,
  View,
  RefreshControl,
  Alert
} from "react-native";
import styled from "styled-components";
import styles from "../../styles";
import typeDef from "../../typeDef";
import constants from "../../constants";

// apollo
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "react-apollo-hooks";

/// Components
import Loader from "../../components/Loader";
import HeaderBase from "../../components/Header/HeaderBase";
import HeaderStyles from "../../components/Header/HeaderStyles";
import PostBasic from "../../components/Post/PostBasic";
import PostEditBox from "../../components/Post/PostEditBox";
import Comment from "../../components/Comment/Comment";

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

const EDIT_POST = gql`
  mutation editPost(
    $id: String!
    $open: Boolean
    $location: String
    $description: String
    $files: [String!]
    $action: ACTIONS!
  ) {
    editPost(
      id: $id
      open: $open
      location: $location
      description: $description
      files: $files
      action: $action
    ) {
      id
    }
  }
`;

/// Styled Components
const BaseContainer = styled.View`
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const InnerContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
`;

const PostContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${constants.margin05};
  margin-bottom: ${constants.margin05};
`;

let postData = {
  open: true,
  location: "",
  description: "",
  files: [],
  action: ""
};

const Post = ({ navigation }) => {
  ///
  const fromScreen = navigation.getParam("fromScreen", "");
  const postId = navigation.getParam("id", "");

  ///
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const [option, setOption] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  /// Graphql
  let onePost = useQuery(SEE_POST, {
    variables: { id: postId },
    fetchPolicy: "network-only"
  });

  let [editPostMutation] = useMutation(EDIT_POST);

  ///
  const refresh = async () => {
    try {
      setRefreshing(true);
      await onePost.refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const selectOption = () => {
    setOption(!option);
  };

  const handleEditPost = async () => {
    try {
      setLoading(true);
      console.log("2");
      console.log(postData);
      Alert.alert("aaaaaaaaaaaaaaa");
      const {
        data: { result }
      } = await editPostMutation({
        variables: {
          id: postId,
          open: postData.open,
          location: postData.location,
          description: postData.description,
          files: postData.files,
          action: postData.action
        }
      });
      if (result !== "" || result !== undefined) {
        if (postData.action === typeDef.DELETE_POST) {
          navigation.goBack();
        } else {
          refresh();
        }
      } else {
        console.log("nok");
        // Alert.alert("Wrong secret!");
      }
    } catch (e) {
      console.log(e);
      // Alert.alert("Can't confirm secret");
    } finally {
      console.log("ok2");
      setLoading(false);
    }
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
            object: HeaderStyles.BACK,
            link: () => navigation.navigate(fromScreen)
          }
        ]}
        rightItem={[
          {
            object: HeaderStyles.MENU,
            link: () => {
              selectOption();
            }
          }
        ]}
      />
      <InnerContainer>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
          contentContainerStyle={{
            flexDirection: "column",
            alignItems: "center"
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
        >
          {onePost.loading ? (
            <Loader />
          ) : (
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <PostContainer>
                <PostBasic
                  navigation={navigation}
                  id={onePost.data.seeOnePost.id}
                  postType={onePost.data.seeOnePost.fileType}
                  photo={onePost.data.seeOnePost.files}
                  audio={onePost.data.seeOnePost.voiceFile}
                  audioCount={onePost.data.seeOnePost.voiceTime}
                  contents={onePost.data.seeOnePost.description}
                  time={onePost.data.seeOnePost.createdAt}
                  location={onePost.data.seeOnePost.location}
                  address={onePost.data.seeOnePost.address}
                  avatar={onePost.data.seeOnePost.user.avatar}
                  username={onePost.data.seeOnePost.user.username}
                  video={""}
                  videoCover={styles.TempImage1}
                  videoCount={onePost.data.seeOnePost.videoTime}
                />
              </PostContainer>
              <Comment comment={onePost.data.seeOnePost.comments} />
            </View>
          )}
        </ScrollView>
        {option ? (
          <PostEditBox
            navigation={navigation}
            id={postId}
            height={baseSize.height - styles.headerHeight}
            isMe={true}
            handleEditPost={handleEditPost}
            postData={postData}
            description={onePost.data.seeOnePost.description}
          />
        ) : null}
      </InnerContainer>
    </BaseContainer>
  );
};

export default Post;
