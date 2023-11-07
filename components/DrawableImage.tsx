import React, {useState} from 'react';
import {View, Image, Dimensions, Pressable, Text} from 'react-native';
import {Svg, Line} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';
import * as FileSystem from 'expo-file-system';
import {ActivityIndicator} from 'react-native';
import Toast from 'react-native-toast-message';

const screenWidth = Dimensions.get('window').width;

function DrawableImage({source, handleBack}) {
  const [lines, setLines] = useState([]);
  const [viewHeight, setViewHeight] = useState(0);
  const [imageResponse, setImageResponse] = useState(null);
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
  const [segmentationPreview, setSegmentationPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = (event) => {
    const {locationX} = event.nativeEvent;
    setLines([locationX]);
  };

  const deleteLine = () => {
    setLines([]);
  };

  const getBase64FromAssetURI = async (assetUri) => {
    try {
      const fileData = await FileSystem.readAsStringAsync(assetUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return fileData;
    } catch (error) {
      console.error('Error reading asset data:', error);
      return null;
    }
  };

  const handleCheck = async () => {
    if (lines.length === 0) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'No se ha seleccionado ninguna línea',
        visibilityTime: 1500,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      return;
    }
    setIsLoading(true);
    const base64 = await getBase64FromAssetURI(source.uri);
    await fetch('http://143.110.157.201:5000/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: base64,
        base64: true,
        viewWidth: screenWidth,
        startingPoint: Math.floor(lines[0]),
      }),
    })
      .then((e) => {
        return e.json();
      })
      .then((data) => {
        setSegmentationPreview(`data:image/png;base64,${data.image}`);
        setIsLoading(false);
      })
      .catch((e) => {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error al segmentar la imagen',
          visibilityTime: 1500,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        setIsLoading(false);
      });
  };

  const handleRetrySegmentation = () => {
    setSegmentationPreview(null);
    setLines([]);
  };

  const handleTraduction = async () => {
    setIsLoading(true);
    const base64 = await getBase64FromAssetURI(source.uri);
    await fetch('http://143.110.157.201:5000/translate/segmented', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: base64,
        viewWidth: screenWidth,
        startingPoint: Math.floor(lines[0]),
      }),
    })
      .then((e) => {
        return e.json();
      })
      .then((data) => {
        setIsLoading(false);
        handleBack(data);
      })
      .catch((e) => {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error al traducir la imagen',
          visibilityTime: 1500,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        setIsLoading(false);
      });
  };

  return (
    <>
      {segmentationPreview !== null && (
        <View className="relative bg-black w-full h-full flex justify-center items-center">
          <Toast />

          <View className="w-full h-[30%] border-dashed border-gray-400 border-y-[1px]  z-10">
            <Image
              onLayout={(event) => {
                const {height} = event.nativeEvent.layout;
                setViewHeight(height);
              }}
              className="w-full h-full"
              source={{uri: segmentationPreview}}
              resizeMode="contain"
            />
          </View>
          <View className="flex justify-center items-center bg-white absolute h-[20%] space-y-4 w-full bottom-0 rounded-tr-[20px] rounded-tl-[20px]">
            <Pressable
              className="w-11/12 rounded-[10px] bg-[#5965f2] px-8 py-4"
              onPress={handleRetrySegmentation}>
              <Text className="text-xl text-center text-white">
                Intentar Nuevamente
              </Text>
            </Pressable>
            <Pressable
              className="w-11/12 rounded-[10px] bg-[#5965f2] px-8 py-4 flex-row space-x-4"
              onPress={handleTraduction}>
              <Text className="text-xl text-center text-white">
                Realizar Traducción
              </Text>
              {isLoading && <ActivityIndicator color={'#ffffff'} />}
            </Pressable>
          </View>
        </View>
      )}
      {segmentationPreview === null && (
        <View className="relative bg-black w-full h-full flex justify-center items-center">
          <Toast />

          <>
            <Pressable
              onPress={deleteLine}
              className="absolute p-2 rounded-full bg-white z-10 top-10 right-4">
              <Icon
                name="trash"
                style={{color: 'black', fontSize: 35, fontWeight: 'bold'}}
              />
            </Pressable>
            <View className="w-full h-[30%] border-dashed border-gray-400 border-y-[1px]  z-10">
              <Image
                onLayout={(event) => {
                  const {height} = event.nativeEvent.layout;
                  setViewHeight(height);
                }}
                className="w-full h-full"
                source={{uri: source.uri}}
                resizeMode="contain"
              />
            </View>
            <Pressable
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                marginLeft: 'auto',
                width: '100%',
                height: viewHeight,
                zIndex: 20,
                marginTop: -viewHeight / 2,
              }}
              onTouchEnd={handlePress}>
              <Svg>
                {lines.map((x, index) => (
                  <Line
                    key={index}
                    x1={x}
                    y1="0"
                    x2={x}
                    y2={viewHeight}
                    stroke="red"
                    strokeWidth="2"
                  />
                ))}
              </Svg>
            </Pressable>
            <View className="flex justify-center items-center bg-white absolute h-[15%] w-full bottom-0 rounded-tr-[20px] rounded-tl-[20px]">
              <Pressable
                className="rounded-[10px] bg-[#5965f2] px-8 py-4 flex-row space-x-4"
                onPress={handleCheck}>
                <Text className="text-xl text-white">
                  Verificar Segmentación
                </Text>
                {isLoading && <ActivityIndicator color={'#ffffff'} />}
              </Pressable>
            </View>
          </>
        </View>
      )}
    </>
  );
}

export default DrawableImage;
