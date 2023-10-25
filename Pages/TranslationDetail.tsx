import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {getDataById} from '../utils/MockData';
import {useParams} from 'react-router-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigate} from 'react-router-native';
import ItemLanguages from '../components/ItemLanguages';

function TranslationDetail() {
  const {id: paramId} = useParams();
  const [item, setItem] = useState({});
  const navigate = useNavigate();

  const getTranslation = async (id) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`${id}`);
      console.log(jsonValue);
      setItem(JSON.parse(jsonValue));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTranslation(paramId);
  }, []);

  return (
    <View
      key={item.id}
      className="relative mt-10 bg-[#5865f2] rounded-2xl my-[10px] mx-[20px] px-[10px] py-[20px]">
      <View className="flex flex-row">
        <View>
          <Text className="text-2xl font-bold mb-[8px] mx-[10px] text-white">
            {item.message}
          </Text>
          <ItemLanguages
            fromLanguage={`Braille`}
            toLanguage={`Spanish`}
          />
        </View>
        <Pressable
          onPress={() => {
            navigate(`/`);
          }}
          className="absolute bg-white rounded-lg top-0 right-[10px]">
          <Icon
            style={styles.homeButton}
            name="arrow-left"
          />
        </Pressable>
      </View>

      <View className="mx-[15px] my-[40px]">
        <Text className="text-white text-justify leading-[25px] text-lg">
          {item.message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeButton: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 30,
    padding: 10,
    alignSelf: 'center',
  },
});
export default TranslationDetail;
