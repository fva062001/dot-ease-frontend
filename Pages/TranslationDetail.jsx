import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Image, Pressable} from "react-native";
import {getDataById} from "../utils/MockData";
import {useParams} from "react-router-native";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigate} from 'react-router-native';
import ItemLanguages from '../components/ItemLanguages';

function TranslationDetail() {
  const {id: paramId} = useParams();
  const [item, setItem] = useState({});
  const navigate = useNavigate();

  const getTranslation = async (id) => {
    let jsonValue = '';
    try {
      jsonValue = await AsyncStorage.getItem(`${id}`);
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
      style={styles.item}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <View>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <ItemLanguages
            fromLanguage={`Braille`}
            toLanguage={`Spanish`}
          />
        </View>
        <Pressable
          onPress={() => {
            navigate(`/`);
          }}
          style={styles.homeButtonPosition}>
          <Icon
            style={styles.homeButton}
            name="arrow-left"
          />
        </Pressable>
      </View>

      <View style={{marginHorizontal: 15, marginVertical: 40}}>
        <Text style={styles.itemParagraph}>{item.translationResult}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    position: "relative",
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: "#5865F2",
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    marginHorizontal: 10,
    color: "white",
  },
  itemParagraph: {
    color: "white",
    textAlign: "justify",
    lineHeight: 25,
    fontSize: 18,
  },

  homeButtonPosition: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 10,
    top: 0,
    right: 10,
  },
  homeButton: {
    fontWeight: "bold",
    color: "black",
    fontSize: 30,
    padding: 10,
    alignSelf: "center",
  },
});
export default TranslationDetail;
