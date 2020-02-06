import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import styled from "styled-components";
import Swiper from "react-native-swiper";
import { Video, Audio } from "expo-av";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";

import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";

import axios from "axios";
import options from "../../apollo";

import styles from "../../styles";
import constants from "../../constants";
import typeDef from "../../typeDef";
import useCounter from "../../hooks/useCounter";

/// Components
import HeaderBase from "../../components/Header/HeaderBase";
import HeaderStyles from "../../components/Header/HeaderStyles";
import NumberCounter from "../../components/Photo/NumberCounter";
import TimeCounter from "../../components/Photo/TimeCounter";
import Loader from "../../components/Loader";
import { Alert } from "react-native";

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

const TopContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 85%;
`;

const ImageScreen = styled.Image`
  width: 100%;
  height: 100%;
`;

const SwiperImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const RecordContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 15%;
  background-color: ${styles.blackColorOpacity};
  position: absolute;
  bottom: 0;
`;

const RecordContainer_Top = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
`;

const RecordContainer_Bottom = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
`;

const RecordTextContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const RecordingStatusContainer = styled.View`
  width: ${props => (props.size ? props.size : 0)};
  height: ${props => (props.size ? props.size : 0)};
  background-color: ${styles.recordRedColor};
  border-radius: ${props => (props.size ? props.size / 2 : 50)}px;
`;

const RecordText = styled.Text`
  color: ${styles.whiteColor};
  font-size: ${props => (props.fontSize ? props.fontSize : 13)};
  font-family: ${props =>
    props.fontFamily ? props.fontFamily : "NanumBarunGothic"};
`;

const BottomContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 15%;
`;

const UploadContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;
const UploadText = styled.Text`
  color: ${styles.momentColor};
  font-size: 40;
  font-family: NanumBarunGothic;
`;

/// Query
const ADD_POST = gql`
  mutation addPost(
    $description: String
    $fileType: Int!
    $files: [String!]!
    $voiceFile: String
    $voiceTime: Int
    $videoTime: Int
    $address: String
    $location: String
  ) {
    addPost(
      description: $description
      fileType: $fileType
      files: $files
      voiceFile: $voiceFile
      voiceTime: $voiceTime
      videoTime: $videoTime
      address: $address
      location: $location
    ) {
      id
      user {
        id
        avatar
        username
      }
      description
      fileType
      files
      voiceFile
      voiceTime
      videoTime
      address
      location
      createdAt
      comments {
        id
        text
        user {
          id
          avatar
          username
        }
        createdAt
      }
    }
  }
`;

const Upload_Prepare = ({ navigation }) => {
  /// ------------------------ navigation parmeter
  const fromScreen = navigation.getParam("fromScreen", "");
  const takeType = navigation.getParam("takeType", "");
  const files = navigation.getParam("files", []);
  const videoRecordingTime = navigation.getParam("videoRecordingTime", 0);

  /// ------------------------ state
  /// size
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const [loading, setLoading] = useState(false);
  const [uploadFlag, setUploadFlag] = useState(true);

  /// recoding 관련
  const [cameraRollPermission, setCameraRollPermission] = useState(false);
  const [audioRecordingPermission, setAudioRecordingPermission] = useState(
    false
  );
  const [recording, setRecording] = useState(false);
  const [record, setRecord] = useState(null);
  const [recordLocation, setRecordLocation] = useState("");

  /// counter
  const numberCounter = useCounter(false, 5);
  const recordingCounter = useCounter(true, 0);

  /// file 관련
  const [location, setLocation] = useState("");
  const [fileLocations, setFileLocations] = useState([]);

  // if (record !== null) {
  //   //console.log("--------------------------------");
  //   //console.log("record", record);
  //   // console.log("record._canRecord", record._canRecord);
  //   // console.log("record._finalDurationMillis", record._finalDurationMillis);
  //   // console.log("record._isDoneRecording", record._isDoneRecording);
  //   // console.log("record._uri", record._uri);
  // }

  /// ------------------------ mutation
  const [addPostMutation] = useMutation(ADD_POST, {
    variables: {
      fileType:
        takeType === typeDef.ONE_PICTURE
          ? typeDef.ONE_PICTURE_NUMBER
          : takeType === typeDef.MULTI_PICTURE
          ? typeDef.MULTI_PICTURE_NUMBER
          : takeType === typeDef.VIDEO
          ? typeDef.VIDEO_NUMBER
          : null,
      files: fileLocations,
      voiceFile: recordLocation,
      voiceTime: record === null ? 0 : record._finalDurationMillis,
      videoTime: videoRecordingTime,
      address: "",
      location: ""
    }
  });

  /// ------------------------ function
  /// 녹음 처리
  const startRecording = async () => {
    try {
      setRecording(true);
      recordingCounter.start();

      const status = await record.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      if (
        status !== undefined &&
        status !== null &&
        status.canRecord === true
      ) {
        const status2 = await record.startAsync();
        setRecord(record);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const endRecording = async () => {
    recordingCounter.stop();

    if (record !== null && recording === true) {
      const status = await record.stopAndUnloadAsync();

      if (status.isDoneRecording === true) {
        try {
          /// record file upload

          if (Platform.OS === "ios") {
            const formData = new FormData();
            const name = record._uri;
            const [, type] = name.split(".");

            formData.append("file", {
              name,
              type:
                type.toLowerCase() === "m4a"
                  ? "audio/m4a"
                  : type.toLowerCase() === "caf"
                  ? "audio/x-caf"
                  : type.toLowerCase(),
              uri: record._uri,
              mimetype:
                type.toLowerCase() === "m4a"
                  ? "audio/m4a"
                  : type.toLowerCase() === "caf"
                  ? "audio/x-caf"
                  : type.toLowerCase()
            });

            const {
              data: { location }
            } = await axios.post(options.uri + "api/upload", formData, {
              headers: {
                "content-type": "multipart/form-data"
              }
            });

            setRecordLocation(location);
          } else {
            const asset = await MediaLibrary.createAssetAsync(record.getURI());

            const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);

            const formData = new FormData();
            const name = asset.filename;
            const [, type] = name.split(".");

            formData.append("file", {
              name,
              type:
                type.toLowerCase() === "m4a"
                  ? "audio/m4a"
                  : type.toLowerCase() === "caf"
                  ? "audio/x-caf"
                  : type.toLowerCase(),
              uri: assetInfo.localUri
            });

            const {
              data: { location }
            } = await axios.post(options.uri + "api/upload", formData, {
              headers: {
                "content-type": "multipart/form-data"
              }
            });

            setRecordLocation(location);
          }
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      Alert.alert("record  null");
    }
  };

  /// 라이브러리에 저장
  const saveLibrary = () => {
    // 파일 각각에 대해 라이브러리에 저장하고.
    // server 에 업로드 asset array 를 반환

    files.map(async uri => {
      const asset = await MediaLibrary.createAssetAsync(uri);
      const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);

      const formData = new FormData();
      const name = asset.filename;
      const [, type] = name.split(".");

      formData.append("file", {
        name,
        type:
          type.toLowerCase() === "jpg"
            ? "image/jpeg"
            : type.toLowerCase() === "mov"
            ? "video/quicktime"
            : type.toLowerCase() === "mp4"
            ? "video/mp4"
            : type.toLowerCase(),
        uri: assetInfo.localUri
      });

      const {
        data: { location }
      } = await axios.post(options.uri + "api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data"
        }
      });

      setLocation(location);
    });
  };

  const uploadPost = async () => {
    numberCounter.stop();
    setLoading(true);
    endRecording();
    saveLibrary();
  };

  /// post 게시
  const addPostHandler = async () => {
    setUploadFlag(false);
    try {
      const {
        data: { addPost }
      } = await addPostMutation();
      if (addPost !== undefined && addPost.id !== undefined) {
        navigation.navigate("TabNavigation");
      } else {
        console.log("upload fail");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const cameraRollAskPermission = async () => {
    try {
      setLoading(true);
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status === "granted") {
        setCameraRollPermission(true);
      }
    } catch (e) {
      console.log(e);
      setCameraRollPermission(false);
    } finally {
      setLoading(false);
    }
  };

  const audioRecordingAskPermission = async () => {
    try {
      setLoading(true);
      const { status } = await Permissions.askAsync(
        Permissions.AUDIO_RECORDING
      );

      if (status === "granted") {
        setAudioRecordingPermission(true);
      }
    } catch (e) {
      console.log(e);
      setAudioRecordingPermission(false);
    } finally {
      setLoading(false);
    }
  };

  /// numberCounter timeout 처리
  if (
    uploadFlag === true &&
    files.length === fileLocations.length &&
    ((recording === false && recordLocation === "") ||
      (recording === true && recordLocation !== ""))
  ) {
    addPostHandler();
  }

  /// numberCounter timeout 처리
  if (numberCounter.getStatus() !== typeDef.STOP && numberCounter.value === 0) {
    numberCounter.clearCounter();
    startRecording();
  }

  /// file upload 후 location 모으기
  if (location !== "") {
    const newFileLocations = fileLocations.concat(location);
    setFileLocations(newFileLocations);
    setLocation("");
  }

  useEffect(() => {
    numberCounter.start();
    cameraRollAskPermission();
    audioRecordingAskPermission();

    if (Platform.OS === "ios") {
      Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: true
      });
    }
    const newRecording = new Audio.Recording();
    setRecord(newRecording);
  }, []);

  return (
    <BaseContainer>
      <HeaderBase
        leftItem={[
          {
            object: HeaderStyles.WORD_CANCLE,
            link: () => {
              navigation.navigate(fromScreen);

              if (record !== null && recording === true) {
                recordingCounter.stop();
                record.stopAndUnloadAsync();
              } else {
                numberCounter.stop();
              }
            }
          }
        ]}
      />
      <MainContainer
        onLayout={event => {
          setBaseSize(event.nativeEvent.layout);
        }}
      >
        <TopContainer>
          {takeType !== typeDef.VIDEO && files.length > 1 ? (
            <Swiper
              activeDotColor={styles.whiteColor}
              autoplay={false}
              loop={false}
              paginationStyle={{ bottom: baseSize.height * 0.8 }}
            >
              {files.map((value, index) => (
                <SwiperImage key={index} source={{ uri: value }} />
              ))}
            </Swiper>
          ) : takeType !== typeDef.VIDEO ? (
            <ImageScreen
              source={{ uri: files.length !== 0 ? files[0] : null }}
            />
          ) : takeType === typeDef.VIDEO ? (
            <Video
              source={{ uri: files.length !== 0 ? files[0] : null }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay={true}
              isLooping={true}
              style={{
                width: baseSize.width,
                height: baseSize.height * 0.85
              }}
            />
          ) : null}

          <RecordContainer>
            {recording ? (
              <RecordContainer_Top>
                <RecordText fontSize={20} fontFamily={"NanumBarunGothicBold"}>
                  녹음중
                </RecordText>
              </RecordContainer_Top>
            ) : (
              <RecordContainer_Top>
                <NumberCounter
                  counter={numberCounter}
                  textColor={styles.recordRedColor}
                  fontFamily={"NanumBarunGothicBold"}
                  fontSize={20}
                ></NumberCounter>

                <RecordText fontSize={20} fontFamily={"NanumBarunGothicBold"}>
                  초 후 녹음이 시작됩니다.
                </RecordText>
              </RecordContainer_Top>
            )}

            {recording ? (
              <RecordContainer_Bottom>
                <RecordTextContainer>
                  <RecordingStatusContainer size={7} />
                  <TimeCounter
                    counter={recordingCounter}
                    fontSize={13}
                    fontColor={styles.whiteColor}
                    fontFamily={"NanumBarunGothicBold"}
                  ></TimeCounter>
                </RecordTextContainer>
              </RecordContainer_Bottom>
            ) : (
              <RecordContainer_Bottom>
                <RecordTextContainer>
                  <RecordText
                    fontSize={13}
                    fontFamily={"NanumBarunGothicLight"}
                  >
                    녹음을 원하지 않는 경우
                  </RecordText>
                </RecordTextContainer>
                <RecordTextContainer>
                  <RecordText
                    fontSize={13}
                    fontFamily={"NanumBarunGothicLight"}
                  >
                    {"시작 전에 "}
                  </RecordText>
                  <RecordText fontSize={13} fontFamily={"NanumBarunGothicBold"}>
                    {"게시하기 "}
                  </RecordText>

                  <RecordText
                    fontSize={13}
                    fontFamily={"NanumBarunGothicLight"}
                  >
                    버튼을 눌러주세요.
                  </RecordText>
                </RecordTextContainer>
              </RecordContainer_Bottom>
            )}
          </RecordContainer>
        </TopContainer>

        <BottomContainer>
          {loading ? (
            <Loader />
          ) : (
            <UploadContainer
              onPress={async () => {
                uploadPost();
              }}
            >
              <UploadText>게시하기</UploadText>
            </UploadContainer>
          )}
        </BottomContainer>
      </MainContainer>
    </BaseContainer>
  );
};

export default Upload_Prepare;
