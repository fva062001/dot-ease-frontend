import React from "react";
import {View, Text} from 'react-native';
function AdvertisementInfo() {
  return (
    <View className="bg-black opacity-70 w-full h-full flex justify-center absolute z-30">
      <Text className="text-[#9E9E9E] text-[20px] mx-[20px] text-justify border-[2px] p-[20px] border-[#9E9E9E] rounded-lg border-dashed">
        Ensure you have good lighting conditions in the area where you'll be
        using the app.
        {'\n'}
        {'\n'}
        Position the braille text you want to read within the camera's view.
        {'\n'}
        {'\n'}
        Hold your device steady and align the text within the on-screen
        guidelines.
        {'\n'}
        {'\n'}
        Ensure the braille dots are clear and well-defined in the camera
        preview.
      </Text>
    </View>
  );
}
export default AdvertisementInfo;
