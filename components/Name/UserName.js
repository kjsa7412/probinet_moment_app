///
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

///
import styles from "../../styles";
import constants from "../../constants";

///
const UsernameContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Avatar = styled.Image`
  width: ${props => (props.avatarSize ? props.avatarSize : "0")};
  height: ${props => (props.avatarSize ? props.avatarSize : "0")};
  border-radius: ${props => (props.avatarSize ? props.avatarSize / 2 : "0")};
  margin-right: ${constants.margin02};
`;

const Username = styled.Text`
  font-size: ${props => (props.usernameSize ? props.usernameSize : "0")};
  color: ${props =>
    props.usernameColor ? props.usernameColor : styles.blackColor};
  font-family: NanumBarunGothicBold;
`;

const UserName = ({
  onPress = () => {},
  avatar,
  avatarSize,
  username,
  usernameSize,
  usernameColor
}) => {
  return (
    <UsernameContainer onPress={onPress}>
      <Avatar avatarSize={avatarSize} source={{ uri: avatar }} />
      <Username usernameSize={usernameSize} usernameColor={usernameColor}>
        {username}
      </Username>
    </UsernameContainer>
  );
};

UserName.propTypes = {
  onPress: PropTypes.func,
  avatar: PropTypes.any,
  avatarSize: PropTypes.any,
  username: PropTypes.any,
  usernameSize: PropTypes.any,
  usernameColor: PropTypes.any
};

export default UserName;
