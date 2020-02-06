import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { CONFIRM_SECRET } from "./AuthQueries";

import AuthTextBox from "../../components/Auth/AuthTextBox";

import styles from "../../styles";
import constants from "../../constants";

/// Components
import AuthButton from "../../components/Auth/AuthButton";
import AuthInput from "../../components/Auth/AuthInput";
import LogInButton from "../../components/Auth/LogInButton";
import Logo from "../../components/Auth/Logo";

const BaseContainer = styled.View`  
  align-items: center;
  flex : 1
  background-color: ${styles.momentColor};
`;

const Top = styled.View`
  width : ${constants.width}
  height : 40%
  justify-content: center;
  align-items: center;
`;

const Center = styled.View`
  width : ${constants.width}
  height : 50%
  align-items: center;
  padding-top : ${constants.margin10}px;
`;

const Bottom = styled.View`
  width : ${constants.width}
  height : 10%
  justify-content : center;
  align-items: center;
`;

const BottomText = styled.Text`
  font-size: 6;
  font-family: NanumBarunGothicLight;
  color: ${styles.whiteColor};
  margin: ${constants.margin03}px;
`;

export default ({ navigation }) => {
  const userId = navigation.getParam("userId", "");
  const email = useInput(navigation.getParam("email", ""));
  const confirmInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: confirmInput.value,
      email: email.value
    }
  });
  const handleConfirm = async () => {
    const { value } = confirmInput;
    if (value === "" || !value.includes(" ")) {
      return Alert.alert("Invalid secret");
    }
    try {
      setLoading(true);
      const {
        data: { confirmSecret }
      } = await confirmSecretMutation();
      if (confirmSecret !== "" || confirmSecret !== false) {
        navigation.navigate("SignupDetail", { confirmSecret, userId });
      } else {
        Alert.alert("Wrong secret!");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Can't confirm secret");
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <BaseContainer>
        <Top>
          <Logo />
        </Top>

        <Center>
          <AuthTextBox text={email.value} textColor={styles.whiteColor} />
          <AuthInput
            {...confirmInput}
            placeholder="secret"
            returnKeyType="send"
            onSubmitEditing={handleConfirm}
            autoCorrect={false}
          />
          <AuthButton
            text="confirm"
            loading={loading}
            onPress={handleConfirm}
            textColor={styles.momentColor}
            bgColor={styles.whiteColor}
          />
        </Center>

        <Bottom>
          <LogInButton
            text={"back"}
            onPress={() =>
              navigation.navigate("AuthHome", { email: email.value })
            }
            textColor={styles.momentColor}
            bgColor={styles.whiteColor}
          ></LogInButton>

          <BottomText>
            "가입 진행 시 , 이용약관 및 개인정보처리방침에 대해 동의한 것으로
            간주됩니다."
          </BottomText>
        </Bottom>
      </BaseContainer>
    </TouchableWithoutFeedback>
  );
};
