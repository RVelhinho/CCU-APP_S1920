import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet,Switch } from 'react-native';
const {width, height} = Dimensions.get('screen')
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default function VoyageScreen(props) {
  const [voyageConvergion, setVoyageConvergion] = React.useState(false)
  const [pass,setPass] = React.useState(false)
  const [passDisplay,setPassDisplay] = React.useState('inativo')
  function onPressSwitchVoyage(){
    setVoyageConvergion(!voyageConvergion)
  }
  function onPressSwitchPass(){
    setPass(!pass)
    if (passDisplay == 'inativo') setPassDisplay('ativo')
    else setPassDisplay('inativo')
  }
  return (
    <View style={styles.container}>
      <View style={{width: width, height: height * 0.1,flexDirection:'row', marginTop: height * 0.02}}>
        <TouchableOpacity  style={{width : width * 0.2, height: height * 0.1, alignItems:'center', justifyContent:'center', paddingTop: height * 0.01}} onPress={ () => props.navigation.goBack()}>
            <Ionicons
            name={'ios-arrow-back'}
            size={35}
            />
        </TouchableOpacity>
        <View style={{position: 'absolute', width: width, height: height * 0.1, alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontSize:responsiveFontSize(4)}}>
                Viagens
            </Text>
        </View>
      </View>

      <View style={{width: width, height: height * 0.2,flexDirection:'row'}}>
        <View style={{width: width * 0.33, height: height * 0.2, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize: responsiveFontSize(2.5)}}>0</Text>
          <Text style={{fontSize: responsiveFontSize(2.5)}}>Viagens</Text>
        </View>
        <View style={{width: width * 0.33, height: height * 0.2, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize: responsiveFontSize(2.5)}}>€0</Text>
          <Text style={{fontSize: responsiveFontSize(2.5)}}>Saldo</Text>
        </View>
        <View style={{width: width * 0.33, height: height * 0.2, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize: responsiveFontSize(2.5)}}>Passe</Text>
          <Text style={{fontSize: responsiveFontSize(2.5)}}>{passDisplay}</Text>
        </View>
      </View>

      <View style={{width: width, height: height * 0.1, alignItems:'flex-start', justifyContent:'center', marginTop: height * 0.01, marginLeft: width * 0.08}}>
        <Text style={{fontSize: responsiveFontSize(2), color: 'lightgrey'}}>Adicionar Fundos</Text>
      </View>

      <View style={{width: width, height: height * 0.1, alignItems:'flex-start', justifyContent:'center', marginTop: height * 0.01, marginLeft: width * 0.08}}>
        <Text style={{fontSize: responsiveFontSize(2), color: 'lightgrey'}}>Comprar Viagens</Text>
      </View>

      <View style={{width: width, height: height * 0.1, flexDirection:'row'}}>
        <View style={{width: width * 0.7, height: height * 0.1, alignItems:'flex-start', justifyContent:'center', marginTop: height * 0.01, marginLeft: width * 0.08}}>
          <Text style={{fontSize: responsiveFontSize(2), color: 'lightgrey'}}>Converter viagens automaticamente</Text>
          <Text style={{fontSize: responsiveFontSize(1.5), color: 'lightgrey'}}>Converter o saldo disponível em viagens, sempre que possivel</Text>
        </View>
        <Switch style={{marginLeft: width * 0.05}} onValueChange={() => onPressSwitchVoyage()} value={voyageConvergion}/>
      </View>

      <View style={{width: width, height: height * 0.1, alignItems:'flex-start', justifyContent:'center', marginTop: height * 0.01, marginLeft: width * 0.08}}>
        <Text style={{fontSize: responsiveFontSize(2), color: 'black'}}>Ativar Passe</Text>
      </View>

      <View style={{width: width, height: height * 0.1, flexDirection:'row'}}>
        <View style={{width: width * 0.7, height: height * 0.1, alignItems:'flex-start', justifyContent:'center', marginTop: height * 0.01, marginLeft: width * 0.08}}>
          <Text style={{fontSize: responsiveFontSize(2), color: 'lightgrey'}}>Renovar passe automaticamente</Text>
          <Text style={{fontSize: responsiveFontSize(1.5), color: 'lightgrey'}}>Renovar o passe no início de cada mês automaticamente, sempre que houver saldo disponível</Text>
        </View>
        <Switch style={{marginLeft: width * 0.05}} onValueChange={() => onPressSwitchPass()} value={pass}/>
      </View>

    </View>
  );
}

VoyageScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});