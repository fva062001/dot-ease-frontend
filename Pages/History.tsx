import {ScrollView, View, Text, Image, Pressable} from 'react-native';
import HistoryItem from '../components/HistoryItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import noHistory from '../assets/noHistoryAvatar.jpg';
import {useNavigate} from 'react-router-native';

export default function History() {
  const [data, setData] = useState([]);

  const getMultiple = async (keys) => {
    let values;
    try {
      values = await AsyncStorage.multiGet(keys).then(() => {});
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

    const allAvailableTranslations = [];
    values.forEach((element) => {
      const itemObject = {
        id: element[0],
        ...JSON.parse(element[1]),
      };
      allAvailableTranslations.push(itemObject);
    });
    setData(allAvailableTranslations);
  };
  const navigate = useNavigate();

  const getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      console.log(e);
    }
    getMultiple(keys);
  };

  useEffect(() => {
    getAllKeys();
  }, []);

  return (
    <>
      {data.length > 0 ? (
        <>
          <ScrollView className="h-[70%] mt-[20px] max-h-[70%]">
            {data.map((item) => (
              <HistoryItem
                key={item.id}
                item={item}
              />
            ))}
          </ScrollView>
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
        </>
      ) : (
        <View className="relative flex justify-center items-center h-full w-10/12 mx-auto space-y-4">
          <Image
            className="w-72 h-72"
            source={noHistory}
          />
          <Text className="text-2xl font-bold">No Se Encontró Historial</Text>
          <Text className="text-center mx-6 text-lg font-normal">
            ¡Ups! Parece que no se encuentra el historial por ningún lado. Pero
            no te preocupes, ¡vamos a emprender un nuevo viaje de traducción!
          </Text>
          <Pressable
            className="bg-[#5865F2] w-full items-center rounded-lg px-12 py-4 mt-6 mx-auto absolute -bottom-20"
            title={''}
            onPress={() => {
              navigate('/camera');
            }}>
            <Text className="text-white font-bold text-lg">
              Comencemos la traducción
            </Text>
          </Pressable>
        </View>
      )}
    </>
  );
}
