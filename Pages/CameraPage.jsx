import React, {useState, useEffect, useRef} from "react";
import {StyleSheet, Text, View, SafeAreaView, Image} from "react-native";
import {Camera} from "expo-camera";
import {Pressable} from "react-native";
import * as MediaLibrary from "expo-media-library";
import Icon from "react-native-vector-icons/Feather";
import {useNavigate} from "react-router-native";
import frameIcon from "../assets/frame.png";
import AdvertisementInfo from "../components/AdvertisementInfo";

export default function CameraPage() {
  const navigate = useNavigate();
  const cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [showInformation, setShowInformation] = useState(false);

  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.granted === true);
    })();
  }, []);

  const takePicture = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    const file = newPhoto.uri;
    setPhoto(newPhoto);
  };

  const showInfo = () => {
    setShowInformation((prev) => !prev);
  };

  const goHome = () => {
    navigate("/");
  };

  // if (photo) {
  //   console.log(photo);
  //   let savePicture = async () => {};
  // }

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (hasCameraPermission !== true) {
    return <Text>No access to camera. Please change this in settings.</Text>;
  }
  if (hasCameraPermission) {
    return (
      <SafeAreaView style={styles.cameraContainer}>
        {showInformation && <AdvertisementInfo />}
        <Camera
          style={{height: "100%", width: "100%"}}
          ratio={"16:9"}
          ref={cameraRef}>
          <View style={styles.buttonsContainer}>
            <Pressable onPress={showInfo}>
              <Icon name="info" style={{color: "#06283D", fontSize: 40}} />
            </Pressable>
            <Pressable onPress={takePicture}>
              <Icon
                name="target"
                style={{color: "#06283D", fontSize: 50, fontWeight: "bold"}}
              />
            </Pressable>
            <Pressable>
              <Image source={frameIcon} style={{width: 40, height: 40}} />
            </Pressable>
          </View>
        </Camera>
        <View style={styles.buttonsContainer}>
          <Pressable onPress={showInfo}>
            <Icon name="info" style={{color: "#06283D", fontSize: 40}} />
          </Pressable>
          <Pressable onPress={takePicture}>
            <Icon
              name="target"
              style={{color: "#06283D", fontSize: 50, fontWeight: "bold"}}
            />
          </Pressable>
          <Pressable>
            <Image source={frameIcon} style={{width: 40, height: 40}} />
          </Pressable>
        </View>
        <Pressable style={styles.homeButton} onPress={goHome}>
          <Icon name="home" style={{color: "white", fontSize: 30}} />
        </Pressable>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraContainer: {
    position: "relative",
    height: "100%",
    width: "100%",
  },
  buttonsContainer: {
    zIndex: 50,
    bottom: 0,
    height: "20%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    position: "absolute",
    width: "100%",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  homeButton: {
    position: "absolute",
    zIndex: 50,
    top: 40,
    left: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: "#5865F2",
    alignItems: "center",
    justifyContent: "center",
  },
});
