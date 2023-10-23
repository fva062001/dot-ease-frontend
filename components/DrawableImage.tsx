import React, {useState} from 'react';
import {View, Image, Dimensions, Pressable, Text} from 'react-native';
import {Svg, Line} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';
import * as FileSystem from 'expo-file-system';


const screenWidth = Dimensions.get('window').width;

function DrawableImage({source}) {
  const [lines, setLines] = useState([]);
  const [viewHeight, setViewHeight] = useState(0);
  const [imageResponse, setImageResponse] = useState(null);
  const [dimensions, setDimensions] = useState({width: 0, height: 0});

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

  const handleConfirm = async () => {
    const base64 = await getBase64FromAssetURI(source.uri);
    console.log(screenWidth);
    console.log(lines[0]);

    try {
      const response = await fetch(
        'http://143.110.157.201:5000/translate/segmented',
        {
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
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.error('HTTP error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <View className="relative bg-black w-full h-full flex justify-center items-center">
      <Pressable
        onPress={deleteLine}
        className="absolute p-2 rounded-full bg-white z-10 top-20 right-8">
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
          className="rounded-[10px] bg-[#5965f2] px-8 py-4"
          onPress={handleConfirm}>
          <Text className="text-xl text-white">Confirmar Selección</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default DrawableImage;
