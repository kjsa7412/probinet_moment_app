///
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

///
import styles from "../../styles";
import constants from "../../constants";
import typeDef from "../../typeDef";

/// Container
const BaseContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  position: absolute;
  left: ${props =>
    props.size
      ? constants.width / 2 + props.size * 0.8
      : constants.width / 2 + constants.height * 0.06 * 0.8 - 2};
`;

const InnerContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: ${props =>
    props.size ? props.size * 0.9 - 2 : constants.height * 0.06 - 2};
  height: ${props =>
    props.size ? props.size * 0.9 - 2 : constants.height * 0.06 - 2};
  background-color: ${styles.momentColor};
  border-radius: ${props => (props.size ? props.size : 50)}px;
`;

const CompleteText = styled.Text`
  color: ${styles.whiteColor};
  font-size: 10;
  font-family: NanumBarunGothicBold;
`;

const TakeCompleteButton = ({ onPress, size = null }) => {
  return (
    <BaseContainer onPress={onPress} size={size}>
      <InnerContainer size={size}>
        <CompleteText>완료</CompleteText>
      </InnerContainer>
    </BaseContainer>
  );
};

TakeCompleteButton.propTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number.isRequired
};

export default TakeCompleteButton;
