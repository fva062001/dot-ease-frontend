import React, {useState, useEffect, useRef} from "react";
import {StyleSheet, Text, View, SafeAreaView, Image} from "react-native";
import {Camera} from "expo-camera";
import {Pressable} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import uuid from 'react-native-uuid';
import {useNavigate} from 'react-router-native';
import frameIcon from '../assets/frame.png';
import AdvertisementInfo from '../components/AdvertisementInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TranslationResult from '../components/TranslationResult';

export default function CameraPage() {
  const navigate = useNavigate();
  const cameraRef = useRef();
  const [translationDetail, setTranslationDetail] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [showInformation, setShowInformation] = useState(false);
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.granted === true);
    })();
  }, []);

  const goBack = () => {
    setTranslationDetail(null);
  };

  const takePicture = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    const file = newPhoto.base64;
    setPhoto(newPhoto);

    const data = await fetch('http://127.0.0.1:5000/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({file}),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showInfo = () => {
    setShowInformation((prev) => !prev);
  };

  const goHome = () => {
    navigate('/');
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem(`${uuid.v4()}`, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      base64: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      const file = result.base64;
      const fileId = result.assetId;

      const item = {
        title: 'Some test data',
        translationResult: 'Some test data',
      };

      await fetch('http://127.0.0.1:5000/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({file}),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setTranslationDetail(data);
          storeData({title: data.message, translationResult: data.message});
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  };

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
          style={{height: '100%', width: '100%'}}
          ratio={'16:9'}
          ref={cameraRef}></Camera>

        {translationDetail === null && (
          <View style={styles.buttonsContainer}>
            <Pressable onPress={showInfo}>
              <Icon
                name="info"
                style={{color: '#06283D', fontSize: 40}}
              />
            </Pressable>
            <Pressable onPress={takePicture}>
              <Icon
                name="target"
                style={{color: '#06283D', fontSize: 50, fontWeight: 'bold'}}
              />
            </Pressable>
            <Pressable onPress={pickImage}>
              <Icon
                name="folder"
                style={{color: '#06283D', fontSize: 40}}
              />
            </Pressable>
          </View>
        )}
        {translationDetail && (
          <View style={styles.resultContainer}>
            <TranslationResult
              handleBack={goBack}
              message={translationDetail.message}
            />
          </View>
        )}
        <Pressable
          style={styles.homeButton}
          onPress={goHome}>
          <Icon
            name="home"
            style={{color: 'white', fontSize: 30}}
          />
        </Pressable>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  cameraContainer: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  resultContainer: {
    height: '80%',
    zIndex: 50,
    position: 'absolute',
    bottom: -200,
  },
  buttonsContainer: {
    zIndex: 50,
    bottom: 0,
    height: '20%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    position: 'absolute',
    width: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  homeButton: {
    position: 'absolute',
    zIndex: 50,
    top: 40,
    left: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: '#5865F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
