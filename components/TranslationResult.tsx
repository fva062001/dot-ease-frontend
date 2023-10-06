import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';

function TranslationResult({message, handleBack}) {
  const goBack = () => {
    handleBack();
  };

  return (
    <View className="relative min-h-9/12 bg-white mt-[20px] rounded-tl-lg rounded-tr-lg flex-col items-center w-[100vw]">
      <View className="flex-row mt-[20px] mx-auto">
        <View>
          <Text className="text-[24px] text-[#5865F2] font-bold mx-[20px]">
            Braille
          </Text>
        </View>
        <Image
          className="h-[25px] w-[25px]"
          source={require('../assets/arrows.png')}
        />
        <View>
          <Text className="text-[24px] text-[#5865F2] font-bold mx-[20px]">
            Spanish
          </Text>
        </View>
      </View>
      <View className="mt-[40px] h-[40%] border-b-[1px] w-10/12">
        <Text className="text-justify text-[24px] font-normal">{message}</Text>
      </View>
      <Pressable onPress={handleBack}>
        <Image
          className="h-[60px] w-[60px] mt-[80px]"
          source={require('../assets/backButton.png')}
        />
      </Pressable>
    </View>
  );
}

export default TranslationResult;
