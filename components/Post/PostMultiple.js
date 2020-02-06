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

/// Case
const BaseContainer = styled.View`
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

const Cover = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${constants.width * 0.02};
`;

const PostMultiple = ({ post = [{ id, cover }], isCheck = false }) => {
  return (
    <BaseContainer>
      {post.map(value => (
        <ItemContainer key={value.id}>
          <Cover source={{ uri: value.cover }} />
          {isCheck ? (
            <ButtonContainer>
              <Button_Check
                source={require("../../assets/iconmonstr-circle-moment.png")}
              />
            </ButtonContainer>
          ) : null}
        </ItemContainer>
      ))}
    </BaseContainer>
  );
};

PostMultiple.propTypes = {
  post: PropTypes.array,
  isCheck: PropTypes.bool
};

export default PostMultiple;
