import React, {useState, useEffect, useRef} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {Camera} from 'expo-camera';
import {Pressable} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import uuid from 'react-native-uuid';
import {useNavigate} from 'react-router-native';
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

    const data = await fetch('http://143.110.157.201:5000/translate', {
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
        setTranslationDetail(data);
        storeData({title: data.message, translationResult: data.message});
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

      await fetch('http://143.110.157.201:5000/translate', {
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
      <SafeAreaView className="relative h-full w-full">
        {showInformation && <AdvertisementInfo />}
        <Camera
          style={{height: '100%', width: '100%'}}
          ratio={'16:9'}
          ref={cameraRef}></Camera>

        {translationDetail === null && (
          <View className="absolute bottom-0 h-32 rounded-tl-2xl rounded-tr-2xl rounded-bl-lg rounded-br-lg z-50 w-full bg-white flex flex-row justify-around items-center">
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
          <View className="absolute h-[600px] -bottom-32 z-50">
            <TranslationResult
              handleBack={goBack}
              message={translationDetail.message}
            />
          </View>
        )}
        <Pressable
          className="absolute top-4 left-4 p-4 rounded-full bg-blue-500 z-50 flex items-center justify-center"
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
