///
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

///
import styles from "../../styles";
import constants from "../../constants";
import typeDef from "../../typeDef";

/// Container
const BaseContainer = styled.View`
  flex-direction: row;
  align-items: center;
  position: absolute;
  left: ${props => (props.size ? props.size * 0.15 : constants.height * 0.011)};
`;

const ImageContainer = styled.View`
  flex-direction: row;
  width: ${props => (props.size ? props.size : constants.height * 0.11)};
  height: ${props => (props.size ? props.size : constants.height * 0.11)};
`;

const FileCountText = styled.Text`
  color: ${styles.momentColor};
  font-size: 13;
  font-family: NanumBarunGothicBold;
  margin-left: ${constants.margin02}px;
`;

const ImageItem = styled.Image`
  width: ${props => (props.size ? props.size : constants.height * 0.11)};
  height: ${props => (props.size ? props.size : constants.height * 0.11)};
  position: absolute;
  right: ${props =>
    props.index !== 0 && props.size ? props.index * props.size * 0.1 : 0};
  bottom: ${props =>
    props.index !== 0 && props.size ? props.index * props.size * 0.1 : 0};
`;

const TakenPhoto = ({ size = 0, files = [] }) => {
  let displayFiles = files;
  let imageSize = size;

  if (files.length === 2) {
    imageSize = size * 0.9;
  } else if (files.length >= 3) {
    imageSize = size * 0.8;
    displayFiles = displayFiles.filter((element, index, array) => {
      return index >= array.length - 3;
    });
  } else {
    imageSize = size;
  }

  return (
    <BaseContainer size={size}>
      <ImageContainer size={size}>
        {displayFiles.length !== 0
          ? displayFiles.map((file, index) => (
              <ImageItem
                key={index}
                source={{ uri: file }}
                index={index}
                size={imageSize}
              ></ImageItem>
            ))
          : null}
      </ImageContainer>
      <FileCountText>{files.length !== 0 ? files.length : null}</FileCountText>
    </BaseContainer>
  );
};

TakenPhoto.propTypes = {
  size: PropTypes.number.isRequired,
  files: PropTypes.array
};

export default TakenPhoto;
