import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Image, Pressable} from "react-native";
import {getDataById} from "../utils/MockData";
import {useParams} from "react-router-native";
import Icon from "react-native-vector-icons/Feather";
import {useNavigate} from "react-router-native";

function TranslationDetail() {
  const {id} = useParams();
  const [item, setItem] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setItem(getDataById(+id));
  }, [id]);

  return (
    <View key={item.id} style={styles.item}>
      <View style={{display: "flex", flexDirection: "row"}}>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 8,
              marginHorizontal: 10,
              color: "white",
            }}>
            {item.title}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginHorizontal: 10,
            }}>
            <Image
              style={{
                height: 25,
                width: 25,
              }}
              source={require("../assets/braille.png")}
            />
            <Text
              style={{
                fontSize: 18,
                color: "white",
                marginStart: 8,
                fontWeight: "bold",
              }}>
              {item.fromLanguage}
            </Text>
            <Text style={{fontSize: 18, color: "#3643CC", marginHorizontal: 8}}>
              to
            </Text>
            <Image
              style={{
                height: 25,
                width: 25,
              }}
              source={require("../assets/spain.png")}
            />
            <Text
              style={{
                fontSize: 18,
                color: "white",
                fontWeight: "bold",
                marginStart: 8,
              }}>
              {item.toLanguage}
            </Text>
          </View>
        </View>
        <Pressable
          onPress={() => {
            navigate(`/`);
          }}
          style={{
            position: "absolute",
            backgroundColor: "white",
            borderRadius: 10,
            top: 0,
            right: 10,
          }}>
          <Icon
            style={{
              fontWeight: "bold",
              color: "black",
              fontSize: 30,
              padding: 10,
              alignSelf: "center",
            }}
            name="arrow-left"
          />
        </Pressable>
      </View>

      <View style={{marginHorizontal: 15, marginVertical: 40}}>
        <Text
          style={{
            color: "white",
            textAlign: "justify",
            lineHeight: 25,
            fontSize: 18,
          }}>
          {item.translationResult}
        </Text>
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
});
export default TranslationDetail;
