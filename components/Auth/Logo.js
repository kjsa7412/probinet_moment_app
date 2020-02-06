import React from "react";
import styled from "styled-components";
import styles from "../../styles";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LogoText = styled.Text`
  font-size: 40;
  color: white;
  font-family: NanumBarunGothicLight;
`;
const LogoBottomText = styled.Text`
  font-size: 13;
  color: ${styles.logoBottomTextColor};
  font-family: NanumBarunGothicLight;
`;

const Logo = () => (
  <View>
    <LogoText>MOMENT</LogoText>
    <LogoBottomText>At The Moment</LogoBottomText>
  </View>
);

export default Logo;
