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
`;

const OutLineContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: ${props => (props.size ? props.size : constants.height * 0.07)};
  height: ${props => (props.size ? props.size : constants.height * 0.07)};
  border-radius: ${props => (props.size ? props.size : 50)}px;
  border: 5px
    ${props => (props.takeType === typeDef.MULTI_PICTURE ? "dotted" : "solid")}
    ${props =>
      props.takeType === typeDef.VIDEO
        ? styles.recordRedColor
        : styles.momentColor};
`;

const InnerContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: ${props => (props.size ? props.size * 0.9 : constants.height * 0.06)};
  height: ${props => (props.size ? props.size * 0.9 : constants.height * 0.06)};
  background-color: ${props =>
    props.recording === true ? styles.recordRedColor : styles.momentColor};
  border-radius: ${props => (props.size ? props.size : 50)}px;
  border: 2px solid ${styles.whiteColor};
`;

const CompleteText = styled.Text`
  color: ${styles.whiteColor};
  font-size: 10;
  font-family: NanumBarunGothicBold;
`;

const TakeButton = ({
  onPress,
  size = null,
  takeType = typeDef.ONE_PICTURE,
  recording = false
}) => {
  return (
    <BaseContainer onPress={onPress}>
      <OutLineContainer size={size} takeType={takeType}>
        <InnerContainer size={size} recording={recording}>
          {recording ? <CompleteText>완료</CompleteText> : null}
        </InnerContainer>
      </OutLineContainer>
    </BaseContainer>
  );
};

TakeButton.propTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number.isRequired,
  takeType: PropTypes.string.isRequired,
  recording: PropTypes.bool
};

export default TakeButton;
