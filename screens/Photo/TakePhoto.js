import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { Alert } from "react-native";

import styles from "../../styles";
import constants from "../../constants";
import typeDef from "../../typeDef";
import useCounter from "../../hooks/useCounter";

/// Components
import TakeButton from "../../components/Photo/TakeButton";
import Loader from "../../components/Loader";
import TakenPhoto from "../../components/Photo/TakenPhoto";
import TakeCompleteButton from "../../components/Photo/TakeCompleteButton";
import HeaderBase from "../../components/Header/HeaderBase";
import HeaderStyles from "../../components/Header/HeaderStyles";
import TimeCounter from "../../components/Photo/TimeCounter";

/// Styled Components
const BaseContainer = styled.View`
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const MainContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
`;

const CameraScreen = styled.View`
  width: 100%;
  height: 85%;
`;

const MiddleContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
`;

const MiddleRecordingContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 30%;
  position: absolute;
  bottom: -${constants.margin04};
`;

const RecordingStatusContainer = styled.View`
  width: ${props => (props.size ? props.size : 0)};
  height: ${props => (props.size ? props.size : 0)};
  background-color: ${styles.recordRedColor};
  border-radius: ${props => (props.size ? props.size / 2 : 50)}px;
`;

const BottomContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 5%;
`;

const BottomContainerLeft = styled.View`
  width: 30%;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BottomContainerRight = styled.View`
  width: 20%;
  height: 100%;
  align-items: center;
`;

const TypeContainer = styled.TouchableOpacity`
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const TypeText = styled.Text`
  color: ${props =>
    props.focus ? styles.blackColor : styles.typeNotSelectColor};
  font-size: 13;
  font-family: NanumBarunGothicBold;
`;

export default ({ navigation }) => {
  /// ------------------------ state
  /// screen 상태
  const [takeType, setTakeType] = useState(typeDef.ONE_PICTURE);
  const [recording, setRecording] = useState(false);
  /// Permission
  const [cameraPermission, setCameraPermission] = useState(false);
  const [audioPermission, setAudioPermission] = useState(false);
  const [canTakePhoto, setCanTakePhoto] = useState(true);
  /// loader
  const [loading, setLoading] = useState(true);
  /// camera
  const cameraRef = useRef();
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  /// taken file
  const [files, setFiles] = useState([]);
  const [video, setVideo] = useState("");
  /// counter
  const recordingCounter = useCounter(true, 0);

  /// ------------------------ function
  /// take
  const takePhoto = async () => {
    if (!canTakePhoto) {
      switch (takeType) {
        case typeDef.ONE_PICTURE:
          return Alert.alert("Can't take a picture.");
        case typeDef.MULTI_PICTURE:
          /// 10개가 찬 경우
          if (files.length === 10) {
            return Alert.alert("No more pictures can be taken.");
          } else {
            return Alert.alert("Can't take a picture.");
          }

        case typeDef.VIDEO:
          return Alert.alert("Can't take video");

        default:
        // code block
      }
      return;
    }
    try {
      if (
        takeType === typeDef.ONE_PICTURE ||
        takeType === typeDef.MULTI_PICTURE
      ) {
        setCanTakePhoto(false);
        // 사진을 찍는다.
        const { uri } = await cameraRef.current.takePictureAsync({
          quality: 1
        });

        if (takeType === typeDef.ONE_PICTURE) {
          const oneFileArray = [uri];
          setFiles(oneFileArray);

          navigation.push("Upload_Prepare", {
            fromScreen: navigation.state.routeName,
            takeType,
            files: oneFileArray
          });
        } else {
          const takenFiles = files.concat([uri]);
          setFiles(takenFiles);
          if (takenFiles.length === 10) {
            /// 뒤에 setCanTakePhoto(true); 하지 않고 return
            /// canTakePhoto 를 false 로 놔둔다
            return;
          }
        }
        setCanTakePhoto(true);
      } else if (takeType === typeDef.VIDEO) {
        /// 비디오 촬영의 경우

        if (recording) {
          setRecording(false);
          recordingCounter.clearCounter();
          await cameraRef.current.stopRecording();
        } else {
          setRecording(true);
          recordingCounter.start();
          const { uri } = await cameraRef.current.recordAsync();
          setVideo(uri);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const cameraAskPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);

      if (status === "granted") {
        setCameraPermission(true);
      }
    } catch (e) {
      console.log(e);
      setCameraPermission(false);
    } finally {
      setLoading(false);
    }
  };

  const audioAskPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(
        Permissions.AUDIO_RECORDING
      );

      if (status === "granted") {
        setAudioPermission(true);
      }
    } catch (e) {
      console.log(e);
      setAudioPermission(false);
    } finally {
      setLoading(false);
    }
  };

  const checkTakenVideo = async () => {
    try {
      if (video !== "") {
        navigation.push("Upload_Prepare", {
          fromScreen: navigation.state.routeName,
          takeType,
          files: [video],
          videoRecordingTime: recordingCounter.value
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    cameraAskPermission();
    audioAskPermission();
    checkTakenVideo();
  }, [video]);

  return (
    <BaseContainer>
      <HeaderBase
        leftItem={[
          {
            object: HeaderStyles.WORD_CANCLE,
            link: () => navigation.navigate("TabNavigation")
          }
        ]}
      />
      <MainContainer>
        <CameraScreen>
          {loading ? (
            <Loader />
          ) : (
            <Camera
              ref={cameraRef}
              type={cameraType}
              style={{
                flex: 1
              }}
            />
          )}
        </CameraScreen>

        <MiddleContainer>
          {takeType === typeDef.MULTI_PICTURE && files.length !== 0 ? (
            <TakenPhoto size={constants.height * 0.07} files={files} />
          ) : null}
          <TakeButton
            onPress={takePhoto}
            size={constants.height * 0.07}
            takeType={takeType}
            recording={recording}
          />
          {takeType === typeDef.MULTI_PICTURE && files.length !== 0 ? (
            <TakeCompleteButton
              onPress={() => {
                navigation.push("Upload_Prepare", {
                  fromScreen: navigation.state.routeName,
                  takeType,
                  files
                });
              }}
              size={constants.height * 0.07}
            />
          ) : null}
          {takeType === typeDef.VIDEO && recording === true ? (
            <MiddleRecordingContainer>
              <RecordingStatusContainer size={7} />
              <TimeCounter
                counter={recordingCounter}
                fontSize={10}
                fontColor={styles.blackColor}
                fontFamily={"NanumBarunGothicLight"}
              ></TimeCounter>
            </MiddleRecordingContainer>
          ) : null}
        </MiddleContainer>

        <BottomContainer>
          <BottomContainerLeft>
            <TypeContainer
              onPress={() => {
                setTakeType(typeDef.ONE_PICTURE);
                setCanTakePhoto(true);
                setRecording(false);
              }}
            >
              <TypeText focus={takeType === typeDef.ONE_PICTURE ? true : false}>
                한컷
              </TypeText>
            </TypeContainer>
            <TypeContainer
              onPress={() => {
                setTakeType(typeDef.MULTI_PICTURE);
                setRecording(false);
                if (files.length === 10) {
                  setCanTakePhoto(false);
                }
              }}
            >
              <TypeText
                focus={takeType === typeDef.MULTI_PICTURE ? true : false}
              >
                여러컷
              </TypeText>
            </TypeContainer>
          </BottomContainerLeft>
          <BottomContainerRight>
            <TypeContainer
              onPress={() => {
                setTakeType(typeDef.VIDEO);
                setCanTakePhoto(true);
              }}
            >
              <TypeText focus={takeType === typeDef.VIDEO ? true : false}>
                동영상
              </TypeText>
            </TypeContainer>
          </BottomContainerRight>
        </BottomContainer>
      </MainContainer>
    </BaseContainer>
  );
};
