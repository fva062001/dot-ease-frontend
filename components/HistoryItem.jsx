import React from "react";
import {View, Text, StyleSheet, Image, Pressable} from "react-native";
import {useNavigate} from "react-router-native";
import ItemLanguages from "./ItemLanguages";

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
      <ItemLanguages fromLanguage={"Braille"} toLanguage={"Español"} />
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
