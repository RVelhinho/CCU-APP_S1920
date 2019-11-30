import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export default function LinksScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Validar Titulo
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/images/validation.png')}></Image>
      </View>
      <View style={styles.awaitingValidationContainer}>
        <Text style={styles.requestSentence}>
          Por favor aproximar do Sensor.
        </Text>
        <Text style={styles.awaitingSentence}>
          Aguardando...
        </Text>
      </View>
    </View>
  );
}

LinksScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer:{
    paddingTop: 30,
    height: 100,
    alignItems:'center',
  },
  title:{
    fontSize: 35,
  },
  imageContainer:{
    alignItems: 'center',
  },
  awaitingValidationContainer:{
    marginTop: 20,
    height: 200,
    alignItems: 'center',
  },
  requestSentence:{
    fontSize: 25,
  },
  awaitingSentence:{
    fontSize: 35,
  },
});
