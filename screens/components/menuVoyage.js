import React from 'react';
import { View, Text, Dimensions, StyleSheet,Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
const {width, height} = Dimensions.get('screen')

export default function MenuVoyage(props) {
  function checkValidityText(){
    if (props.profile.cardStatus == 'valid'){
      return 'Cancel pass'
    }
    else return 'Renew pass now'
  }
  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <TouchableOpacity  style={styles.firstRowBackArrowWrapper} onPress={props.onClosePress}>
            <Ionicons
            name={'ios-arrow-back'}
            size={35}
            />
        </TouchableOpacity>
        <View style={styles.firstRowTextWrapper}>
            <Text style={styles.bigText}>
                Travels
            </Text>
        </View>
      </View>

      <View style={styles.rowWrapper}>
        <View style={styles.columnWrapper}>
          <Text style={styles.mediumText}>{props.profile.voyages}</Text>
          <Text style={styles.mediumText}>Tickets</Text>
        </View>
        <View style={styles.columnWrapper}>
          <Text style={styles.mediumText}>€{props.profile.balance}</Text>
          <Text style={styles.mediumText}>Balance</Text>
        </View>
        <View style={styles.columnWrapper}>
          <Text style={styles.mediumText}>Card</Text>
          <Text style={styles.mediumText}>{props.profile.cardStatus}</Text>
        </View>
      </View>

      <View style={styles.noSwitchRowTextWrapper}>
        <Text style={styles.smallBlockedText}>Add funds</Text>
      </View>

      <View style={styles.noSwitchRowTextWrapper}>
        <Text style={styles.smallBlockedText}>Buy tickets</Text>
      </View>

      <View style={styles.noSwitchRowTextWrapper}>
        <TouchableOpacity onPress={props.onPressSwitchPassValidity}>
          <Text style={styles.smallUnblockedText}>{checkValidityText()}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.switchRowWrapper}>
        <View style={styles.switchRowTextWrapper}>
          <Text style={styles.smallUnblockedText}>Renew pass automatically</Text>
          <Text style={styles.smallerBlockedText}>Renew the pass at the beginning of every month, provided there is enough balance</Text>
        </View>
        <Switch style={styles.switch} onValueChange={props.onPressSwitchPassRenewal} value={props.switches.passRenewal}/>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: '#fff',
    position: 'absolute'
  },
  firstRow:{
    width: width, 
    height: height * 0.1,
    flexDirection:'row', 
    marginTop: height * 0.02
  },
  firstRowBackArrowWrapper:{
    width : width * 0.2, 
    height: height * 0.1, 
    alignItems:'center', 
    justifyContent:'center', 
    paddingTop: height * 0.01
  },
  firstRowTextWrapper:{
    position: 'absolute', 
    width: width, 
    height: height * 0.1, 
    alignItems:'center', 
    justifyContent:'center'
  },
  bigText:{
    fontSize:responsiveFontSize(4)
  },
  mediumText:{
    fontSize: responsiveFontSize(2.5)
  },
  smallUnblockedText:{
    fontSize: responsiveFontSize(2)
  },
  smallBlockedText:{
    fontSize: responsiveFontSize(2), color: 'lightgrey'
  },
  smallerBlockedText:{
    fontSize: responsiveFontSize(1.5), color: 'lightgrey'
  },
  rowWrapper:{
    width: width, 
    height: height * 0.2,
    flexDirection:'row'
  },
  columnWrapper:{
    width: width * 0.33, 
    height: height * 0.2, 
    alignItems:'center', 
    justifyContent:'center'
  },
  noSwitchRowTextWrapper:{
    width: width, 
    height: height * 0.08,
    flexDirection:'row',
    marginTop: height * 0.01, 
    marginLeft: width * 0.08
  },
  switchRowWrapper:{
    width: width, 
    height: height * 0.1, 
    flexDirection:'row'
  },
  switchRowTextWrapper:{
    width: width * 0.7, 
    height: height * 0.08, 
    alignItems:'flex-start', 
    justifyContent:'center', 
    marginTop: height * 0.01, 
    marginLeft: width * 0.08
  },
  switch:{
    marginLeft: width * 0.05
  }
});