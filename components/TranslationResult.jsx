import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

function TranslationResult({message, handleBack}) {
  const goBack = () => {
    handleBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.languages}>
        <View>
          <Text style={styles.languageTitle}>Braille</Text>
        </View>
        <Image
          style={styles.languageIcon}
          source={require('../assets/arrows.png')}
        />
        <View>
          <Text style={styles.languageTitle}>Spanish</Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 40,
          height: '40%',
          borderBottomWidth: 1,
          width: '80%',
        }}>
        <Text style={styles.text}>{message}</Text>
      </View>
      <Pressable onPress={handleBack}>
        <Image
          style={{height: 60, width: 60, marginTop: 80}}
          source={require('../assets/backButton.png')}
        />
      </Pressable>
    </View>
  );
}

export default TranslationResult;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    minHeight: '70%',
    minWidth: '100%',
    backgroundColor: '#fff',
    marginTop: 20,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  languages: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 'auto',
  },
  languageTitle: {
    fontSize: 24,
    color: '#5865F2',
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  languageIcon: {
    height: 25,
    width: 25,
  },
  text: {
    fontSize: 24,
    textAlign: 'justify',
    fontWeight: 400,
  },
});
