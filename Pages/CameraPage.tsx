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
import {ImageEditor} from 'expo-image-editor';
import DrawableImage from '../components/DrawableImage';
import * as FileSystem from 'expo-file-system';

export default function CameraPage() {
  const navigate = useNavigate();
  const cameraRef = useRef();
  const [translationDetail, setTranslationDetail] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [showInformation, setShowInformation] = useState(false);
  const [imageUri, setImageUri] = useState(undefined);
  const [editorVisible, setEditorVisible] = useState(false);
  const [photo, setPhoto] = useState(null);

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
    const file = newPhoto.uri;
    launchEditor(file);
  };

  const showInfo = () => {
    setShowInformation((prev) => !prev);
  };

  const goHome = () => {
    navigate('/');
  };

  const saveEditedPhoto = async (editedPhotoUri) => {
    try {
      // Generate a new file path for the saved image (you can customize this as needed)
      const newFilePath = `${FileSystem.documentDirectory}edited_photo.jpg`;

      // Copy the edited photo to the new file path
      await FileSystem.copyAsync({
        from: editedPhotoUri,
        to: newFilePath,
      });

      // Now, you can use newFilePath to access the saved photo
      // For example, you can set it in state or perform any other actions with it
      setPhoto(newFilePath);

      console.log('Edited photo saved:', newFilePath);
    } catch (error) {
      console.error('Error saving edited photo:', error);
    }
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem(`${uuid.v4()}`, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };

  const launchEditor = (uri: string) => {
    setImageUri(uri);
    setEditorVisible(true);
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
      const file = result.assets[0].uri;
      launchEditor(file);
    }
  };

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (hasCameraPermission !== true) {
    return <Text>No access to camera. Please change this in settings.</Text>;
  }
  if (hasCameraPermission && photo === null) {
    return (
      <SafeAreaView className="relative h-full w-full">
        <ImageEditor
          visible={editorVisible}
          onCloseEditor={() => setEditorVisible(false)}
          imageUri={imageUri}
          onEditingComplete={async (result) => {
            await saveEditedPhoto(result.uri);
          }}
          mode="crop-only"
        />
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
  if (photo !== null) {
    return <DrawableImage source={{uri: photo}} />;
  }
}
