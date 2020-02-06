import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
import { ScrollView, Image } from "react-native";
import styles from "../../styles";
import constants from "../../constants";

///
import UserName from "../Name/UserName";

/// Styled Components

/// Container
const BaseContainer = styled.View`
  flex-direction: row;
  width: ${constants.width};
  height: ${styles.headerHeight};
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : styles.whiteColor};
`;

const LeftContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: ${constants.width};
  height: ${styles.headerHeight};
  position: absolute;
`;

const CenterContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${constants.width};
  height: ${styles.headerHeight};
  position: absolute;
`;

const RightContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: ${constants.width};
  height: ${styles.headerHeight};
  position: absolute;
`;

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${styles.headerHeight};
  height: ${styles.headerHeight};
`;

const Text = styled.Text`
  color: ${styles.blackColor};
  text-align: center;
  font-size: 13;
  font-family: NanumBarunGothicBold;
`;

const HeaderBase = withNavigation(
  ({
    navigation,
    leftItem = [],
    centerItem = [],
    rightItem = [],
    backgroundColor,
    avatar,
    username
  }) => {
    return (
      <BaseContainer backgroundColor={backgroundColor}>
        <LeftContainer>
          {leftItem.map(value => (
            <ItemContainer onPress={value.link} key={value.object.key}>
              {value.object.type === "icon" ? (
                <Image
                  source={value.object.iconUri}
                  style={value.object.style}
                />
              ) : null}
              {value.object.type === "word" ? (
                <Text>{value.object.text}</Text>
              ) : null}
            </ItemContainer>
          ))}
        </LeftContainer>
        <CenterContainer>
          {centerItem.map(value => (
            <ItemContainer onPress={value.link} key={value.object.key}>
              {value.object.type === "icon" ? (
                <Image
                  source={value.object.iconUri}
                  style={value.object.style}
                />
              ) : null}
              {value.object.type === "word" ? (
                <Text>{value.object.text}</Text>
              ) : null}
            </ItemContainer>
          ))}

          {/* Username */}
          {avatar !== undefined && username !== undefined ? (
            <UserName
              onPress={() => {}}
              avatar={avatar}
              avatarSize={"25"}
              username={username}
              usernameSize={"20"}
              usernameColor={styles.blackColor}
            />
          ) : null}
        </CenterContainer>
        <RightContainer>
          {rightItem.map(value => (
            <ItemContainer onPress={value.link} key={value.object.key}>
              {value.object.type === "icon" ? (
                <Image
                  source={value.object.iconUri}
                  style={value.object.style}
                />
              ) : null}
              {value.object.type === "word" ? (
                <Text>{value.object.text}</Text>
              ) : null}
            </ItemContainer>
          ))}
        </RightContainer>
      </BaseContainer>
    );
  }
);

HeaderBase.propTypes = {
  leftItem: PropTypes.array,
  centerItem: PropTypes.array,
  rightItem: PropTypes.array,
  backgroundColor: PropTypes.any,
  avatar: PropTypes.any,
  username: PropTypes.any
};

export default HeaderBase;
