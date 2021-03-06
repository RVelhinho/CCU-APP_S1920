import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
const {width, height} = Dimensions.get('screen')
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default function ValidationScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.firstRowWrapper}>
        <TouchableOpacity  style={styles.closeIconWrapper} onPress={ () => props.navigation.goBack()}>
          <Ionicons
            name={'md-close'}
            size={35}
            style={styles.closeStyle}
          />
        </TouchableOpacity>
        <Text style={styles.firstRowTextWrapper}>
          Ticket Validation 
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/images/validation.png')}></Image>
      </View>
      <View style={styles.awaitingValidationContainer}>
        <Text style={styles.requestSentence}>
          Please approach the device to the sensor
        </Text>
        <Text style={styles.awaitingSentence}>
          Waiting...
        </Text>
      </View>
    </View>
  );
}

ValidationScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer:{
    paddingTop: height * 0.05,
    alignItems: 'center',
  },
  awaitingValidationContainer:{
    width: width,
    marginTop: height * 0.1,
    alignItems: 'center',
  },
  requestSentence:{
    fontSize: responsiveFontSize(2.5),
  },
  awaitingSentence:{
    marginTop: height * 0.05,
    fontSize: responsiveFontSize(3.5),
  },
  firstRowWrapper:{
    flexDirection:'row'
  },
  firstRowTextWrapper:{
    fontSize:responsiveFontSize(4), 
    width: width * 0.8, 
    height: height * 0.1, 
    alignItems:'center', 
    justifyContent:'flex-end', 
    paddingLeft:width * 0.02, 
    paddingTop: height * 0.04
  },
  closeIconWrapper:{
    width : width * 0.2, 
    height: height * 0.08, 
    alignItems:'flex-start', 
    justifyContent:'center', 
    paddingLeft: width * 0.06, 
    paddingTop: height * 0.05
  },
});
