import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigate} from 'react-router-native';

function MainLayout({children, title}) {
  const navigate = useNavigate();

  const deleteHistory = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }
  };

  return (
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
      <Pressable
        className="bg-[#06283d] items-center rounded-full p-6 mt-6 mx-auto"
        title={''}
        onPress={() => {
          navigate('/camera');
        }}>
        <Icon
          style={{marginHorizontal: 5, marginVertical: 5}}
          name="camera"
          size={20}
          color="white"
        />
      </Pressable>
    </View>
  );
}
export default MainLayout;
