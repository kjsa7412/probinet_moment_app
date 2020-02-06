import { gql } from "apollo-boost";

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

export const EDIT_POST = gql`
  query editPost(
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
