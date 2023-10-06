import React from 'react';
import {View, Text, Image} from 'react-native';

function ItemLanguages({fromLanguage, toLanguage}) {
  return (
    <View className="flex-row mx-[10px]">
      <Image
        className="h-[25px] w-[25px]"
        source={require('../assets/braille.png')}
      />
      <Text className="text-[18px] text-white font-bold ml-[8px]">
        {fromLanguage}
      </Text>
      <Text className="text-[18px] text-[#3643CC] mx-[8px]">to</Text>
      <Image
        className="h-[25px] w-[25px]"
        source={require('../assets/spain.png')}
      />
      <Text className="text-[18px] text-white font-bold ml-[8px]">
        {toLanguage}
      </Text>
    </View>
  );
}

export default ItemLanguages;
