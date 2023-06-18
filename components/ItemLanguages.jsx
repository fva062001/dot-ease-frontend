import React from "react";
import {View, Text, Image, StyleSheet} from "react-native";

function ItemLanguages({fromLanguage, toLanguage}) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        marginHorizontal: 10,
      }}>
      <Image
        style={styles.languageIcon}
        source={require("../assets/braille.png")}
      />
      <Text style={styles.itemLanguage}>{fromLanguage}</Text>
      <Text style={{fontSize: 18, color: "#3643CC", marginHorizontal: 8}}>
        to
      </Text>
      <Image
        style={styles.languageIcon}
        source={require("../assets/spain.png")}
      />
      <Text style={styles.itemLanguage}>{toLanguage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemLanguage: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginStart: 8,
  },
  languageIcon: {
    height: 25,
    width: 25,
  },
});
export default ItemLanguages;
