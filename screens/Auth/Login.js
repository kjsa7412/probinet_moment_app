import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { CONFIRM_PASSWORD } from "./AuthQueries";

import { useQuery } from "react-apollo-hooks";
import { useLogIn } from "../../AuthContext";

import styles from "../../styles";
import constants from "../../constants";

/// Components
import AuthButton from "../../components/Auth/AuthButton";
import AuthInput from "../../components/Auth/AuthInput";
import Logo from "../../components/Auth/Logo";
import LogInButton from "../../components/Auth/LogInButton";

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

export default ({ navigation, shouldFetch }) => {
  const emailOrUsernameInput = useInput(navigation.getParam("email", ""));
  const passwordInput = useInput("");
  const logIn = useLogIn();
  const [loading, setLoading] = useState(false);

  var { data, refetch } = useQuery(CONFIRM_PASSWORD, {
    variables: {
      term: emailOrUsernameInput.value,
      password: passwordInput.value
    },
    skip: !shouldFetch
  });

  const handleLogin = async () => {
    // 예외 처리 1. 입력을 하지 않은 경우
    if (emailOrUsernameInput.value === "") {
      return Alert.alert("email can't be empty");
    }
    if (passwordInput.value === "") {
      return Alert.alert("password can't be empty");
    }

    try {
      setLoading(true);
      shouldFetch = true;
      const {
        data: { confirmPassword }
      } = await refetch();

      if (confirmPassword === "Wrong password") {
        Alert.alert("Can't Login, Wrong password");
        passwordInput.setValue("");
      } else if (confirmPassword === "Wrong email or username") {
        Alert.alert("Can't Login, Wrong email or username");
        emailOrUsernameInput.setValue("");
        passwordInput.setValue("");
      } else if (confirmPassword !== "" || confirmPassword !== false) {
        logIn(confirmPassword);
      } else {
        console.log("Can't Login");
        Alert.alert("Can't Login");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Can't Login ");
    } finally {
      setLoading(false);
      shouldFetch = false;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <BaseContainer>
        <Top>
          <Logo />
        </Top>
        <Center>
          <AuthInput
            {...emailOrUsernameInput}
            placeholder="email or username"
            keyboardType="email-address"
            returnKeyType="send"
            onSubmitEditing={handleLogin}
            autoCorrect={false}
          />
          <AuthInput
            {...passwordInput}
            placeholder="password"
            returnKeyType="send"
            onSubmitEditing={handleLogin}
            autoCorrect={false}
            secureTextEntry={true}
          />
          <AuthButton
            text="log in"
            loading={loading}
            onPress={handleLogin}
            textColor={styles.momentColor}
            bgColor={styles.whiteColor}
          />
        </Center>
        <Bottom>
          <LogInButton
            text={"sing up"}
            onPress={() => navigation.navigate("AuthHome")}
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
