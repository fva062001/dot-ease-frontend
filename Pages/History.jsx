import {StyleSheet, ScrollView} from "react-native";
import HistoryItem from "../components/HistoryItem";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useEffect, useState} from 'react';

export default function History() {
  const [data, setData] = useState([]);

  const getMultiple = async (keys) => {
    let values;
    try {
      values = await AsyncStorage.multiGet(keys);
    } catch (e) {
      console.log(e);
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
    <ScrollView style={styles.historyContainer}>
      {data !== [] ? (
        data.map((item) => (
          <HistoryItem
            key={item.id}
            item={item}
          />
        ))
      ) : (
        <View>
          <Text>No History found</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    height: '70%',
    marginTop: 20,
    maxHeight: '70%',
  },
});
