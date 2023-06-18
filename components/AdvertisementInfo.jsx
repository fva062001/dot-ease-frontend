import React from "react";
import {View, Text, StyleSheet} from "react-native";
function AdvertisementInfo() {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.text}>
        Ensure you have good lighting conditions in the area where you'll be
        using the app.
        {"\n"}
        {"\n"}
        Position the braille text you want to read within the camera's view.
        {"\n"}
        {"\n"}
        Hold your device steady and align the text within the on-screen
        guidelines.
        {"\n"}
        {"\n"}
        Ensure the braille dots are clear and well-defined in the camera
        preview.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    zIndex: 3,
  },
  text: {
    color: "white",
    fontSize: 20,
    marginHorizontal: 20,
    textAlign: "justify",
    borderColor: "white",
    borderWidth: 1,
    padding: 20,
    borderRadius: 20,
    borderStyle: "dashed",
    color: "#9E9E9E",
    borderColor: "#9E9E9E",
  },
});
export default AdvertisementInfo;
