import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

function MainLayout({children, title}) {
  const deleteHistory = async () => {
    try {
      await AsyncStorage.clear()
        .then(() => {
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'History deleted',
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        })
        .catch(() => {
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Error',
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        });
    } catch (e) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };

  return (
    <>
      <View className="relative h-full w-full bg-white mt-[20px]">
        <View className="flex flex-row w-full justify-between">
          <Text
            onPress={() => {
              navigate('/');
            }}
            className="mx-[25px] my-[20px] text-[#06283D] text-2xl font-bold">
            {title}
          </Text>
          <Icon
            onPress={deleteHistory}
            style={{
              marginVertical: 20,
              marginHorizontal: 25,
              color: '#06283D',
              fontSize: 25,
              fontWeight: 'bold',
              height: 25,
              width: 25,
            }}
            name="trash"
          />
        </View>
        <View className="h-[70%]">{children}</View>
      </View>
      <Toast />
    </>
  );
}
export default MainLayout;
