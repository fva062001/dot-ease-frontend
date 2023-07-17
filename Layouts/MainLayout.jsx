import React from "react";
import {StyleSheet, Text, View, Pressable} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigate} from 'react-router-native';

function MainLayout({children, title}) {
  const navigate = useNavigate();

  const deleteHistory = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text
          onPress={() => {
            navigate('/');
          }}
          style={styles.title}>
          {title}
        </Text>
        <Icon
          onPress={deleteHistory}
          style={styles.title}
          name="trash"
        />
      </View>
      <View style={styles.childrenContainer}>{children}</View>
      <Pressable
        style={styles.cameraButton}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 20,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  title: {
    marginVertical: 20,
    marginHorizontal: 25,
    color: '#06283D',
    fontSize: 25,
    fontWeight: 'bold',
  },
  childrenContainer: {
    height: '70%',
  },

  cameraButton: {
    backgroundColor: '#06283D',
    alignSelf: 'center',
    borderRadius: 50,
    padding: 20,
    marginTop: 40,
  },

  status: {
    backgroundColor: '#fff',
  },
});
export default MainLayout;
