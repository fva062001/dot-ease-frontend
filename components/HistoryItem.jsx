import React from "react";
import {View, Text, StyleSheet, Image, Pressable} from "react-native";
import {useNavigate} from "react-router-native";

function HistoryItem({item}) {
  const navigate = useNavigate();

  return (
    <Pressable
      onPress={() => {
        navigate(`/history/${item.id}`);
      }}
      key={item.id}
      style={styles.item}>
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
            fontWeight: "bold",
            marginStart: 8,
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
            fontWeight: "bold",
            color: "white",
            marginStart: 8,
          }}>
          {item.toLanguage}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: "#5865F2",
  },
});

export default HistoryItem;
