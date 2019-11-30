import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import images from '../assets/images/index.js';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import MapView, {Marker} from 'react-native-maps';
import * as Permissions from 'expo-permissions';

const locations_json = require('../locations.json');
const green_stations = ['Alameda', 'Areeiro', 'Roma'];
const yellow_stations = ['Entrecampos', 'Campo Pequeno', 'Saldanha']
const red_stations = ['Saldanha','Alameda']
const {width, height} = Dimensions.get('screen')

export default function HomeScreen() {
  const [latitude, setlatitude] = React.useState(null);
  const [longitude, setlongitude] = React.useState(null);
  const [locations, setLocations] = React.useState(locations_json);
  const [destination, setDestination] = React.useState(null);
  const [isVisible, setIsVisible] = React.useState(false);
  React.useEffect(async () =>{
    const {status} = await Permissions.getAsync(Permissions.LOCATION)
    if ( status != 'granted'){
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: {latitude, longitude}}) => {setlatitude(latitude), setlongitude(longitude)},
      (error) => console.log('Error:', error),
      { enableHighAccuracy: true, timeout: 50000, maximumAge: 1000 },
    )
  }, []);
  function onMarkerPress(location){
    setDestination(location)
    setIsVisible(true)
  }
  function onMapPress(){
    setIsVisible(false)
  }
  function onClosePress(){
    setIsVisible(false)
  }
  function switchLines(){
    setDestination(prevState =>{
      return  {...prevState, "end_station_top":destination.end_station_top_extra,
                              "end_station_bot":destination.end_station_bot_extra,
                              "arrival_times_top": {
                                "first": destination.arrival_times_top_extra.first_extra,
                                "second": destination.arrival_times_top_extra.second_extra,
                                "third" : destination.arrival_times_top_extra.third_extra
                            },
                            "arrival_times_bot": {
                              "first": destination.arrival_times_bot_extra.first_extra,
                              "second": destination.arrival_times_bot_extra.first_extra,
                              "third" : destination.arrival_times_bot_extra.first_extra
                              },
                              "end_station_top_extra":destination.end_station_top,
                              "end_station_bot_extra":destination.end_station_bot,
                              "arrival_times_top_extra": {
                                "first_extra": destination.arrival_times_top.first,
                                "second_extra": destination.arrival_times_top.second,
                                "third_extra" : destination.arrival_times_top.third
                            },
                            "arrival_times_bot_extra": {
                              "first_extra": destination.arrival_times_bot.first,
                              "second_extra": destination.arrival_times_bot.first,
                              "third_extra" : destination.arrival_times_bot.first
                              }
    }});
  }
  renderStations = () =>{
    return(
      <View>
        {
          locations.map((location,idx) => {
            const {
              coords : {latitude, longitude}
            } = location
            const { station } = location
            if (yellow_stations.includes(station) && red_stations.includes(station)){
              return(
                <Marker key = {idx}
                        coordinate = {{latitude, longitude}}
                        size = {50}
                        onPress = {() => onMarkerPress(location)}>
                  <Image source = {require('../assets/images/yellow_red.png')} style = {styles.markersStyle}/>       
                </Marker>
              )
            }
            else if (green_stations.includes(station) && red_stations.includes(station)){
              return(
                <Marker key = {idx}
                        coordinate = {{latitude, longitude}}
                        size = {50}
                        onPress = {() => onMarkerPress(location)}>
                  <Image source = {require('../assets/images/green_red.png')} style = {styles.markersStyle}/>       
                </Marker>
              )
            }
            else if (yellow_stations.includes(station)){
              return(
                <Marker key = {idx}
                        coordinate = {{latitude, longitude}}
                        size = {50}
                        onPress = {() => onMarkerPress(location)}>
                  <Image source = {require('../assets/images/yellow.png')} style = {styles.markersStyle}/>       
                </Marker>
              )
            }
            else if (green_stations.includes(station)){
              return(
                <Marker key = {idx}
                        coordinate = {{latitude, longitude}}
                        onPress = {() => onMarkerPress(location)}>
                  <Image source = {require('../assets/images/green.png')} style = {styles.markersStyle}/>       
                </Marker>
              )
            }
          })
        }
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle}
                initialRegion={{
                  latitude,
                  longitude,
                  latitudeDelta: 0.035,
                  longitudeDelta: 0.024,
                }}
                showsUserLocation = {true}
                followUserLocation = {true}
                showsMyLocationButton = {true}
                zoomEnabled = {true}
                onPress = {() => onMapPress()}>
          {renderStations()}
      </MapView>
      <View style={styles.SearchDestinationContainer}>
        <Ionicons
          name={'md-search'}
          size={30}
          color={'lightgrey'}
          style={{width: width * 0.06, paddingLeft: 5}}
        />
        <TextInput placeholder='Destino' style={styles.SearchDestinationInput}>
        </TextInput>
      </View>
      {isVisible?  
                  <View style = {styles.stationView}>
                    <View style = {{flexDirection: 'row',justifyContent:'space-between', width: width}}>
                      <Text style = {styles.stationName}>
                        {destination.station}
                      </Text>
                      {destination.isDouble? <TouchableOpacity onPress={() => switchLines()}><Image source={require('../assets/images/switch.png')} style={{marginTop:3}}></Image></TouchableOpacity>:null}
                      <Image source={images[destination.rect_image]}></Image>
                      <Ionicons
                        name={'md-close'}
                        size={35}
                        style={styles.closeStyle}
                        onPress={() => onClosePress()}
                      />
                    </View>
                    <View style={styles.descText}>
                      <Text style = {{width: width * 0.3,fontSize:20, fontWeight:"bold", alignSelf:'flex-start'}}>Sentido:
                      </Text>
                      <Text style = {{width: width * 0.5,fontSize:20, fontWeight:"bold", alignSelf:'flex-start'}}>Tempos de chegada:
                      </Text>
                    </View>
                    <View style = {styles.topLine}>
                      <Text style = {styles.endStationTop}>
                        {destination.end_station_top}
                      </Text>
                      <Text style = {styles.arrivalTimesTop}>
                        {destination.arrival_times_top.first}
                        <Text style = {{fontSize:15}}>min</Text>
                        {' '}{' '}{' '}{' '}{' '}{' '}
                        {destination.arrival_times_top.second}
                        <Text style = {{fontSize:15}}>min</Text>
                        {' '}{' '}{' '}{' '}{' '}{' '}
                        {destination.arrival_times_top.third}
                        <Text style = {{fontSize:15}}>min</Text>
                      </Text>
                    </View>
                    <View style = {styles.botLine}>
                      <Text style = {styles.endStationBot}>
                          {destination.end_station_bot}
                      </Text> 
                      <Text style = {styles.arrivalTimeBot}>
                        {destination.arrival_times_bot.first}
                        <Text style = {{fontSize:15}}>min</Text>
                        {' '}{' '}{' '}{' '}{' '}{' '}
                        {destination.arrival_times_bot.second}
                        <Text style = {{fontSize:15}}>min</Text>
                        {' '}{' '}{' '}{' '}{' '}{' '}
                        {destination.arrival_times_bot.third}
                        <Text style = {{fontSize:15}}>min</Text>
                      </Text>
                    </View>   
                </View>:null}
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapStyle: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  SearchDestinationContainer:{
    flex: 1,
    width: width * 0.7,
    height: 60,
    marginTop: 90,
    alignSelf: 'center',
    alignItems: 'center',
    position: "absolute",
    borderWidth: .2,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0, 0.8)',
    backgroundColor: "white",
    flexDirection: "row",
    paddingLeft: 10,
  },
  SearchDestinationInput:{
    width: width* 0.5,
    height: 60,
    textAlign: 'center',
    fontSize: 22,
    paddingLeft: 25,
  },
  markersStyle:{
    width: 50,
    height: 50,
  },
  stationView:{
    flex: 1,
    position: 'absolute',
    width: width * 1.05,
    height: height * 0.3,
    bottom: 0,
    paddingLeft: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderWidth: .2,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0, 0.8)',
  },
  stationName:{
    fontSize: 25,
    width: width * 0.45,
    fontWeight:"bold",
  },
  closeStyle:{
    width: width * 0.1,
  },
  endStationTop:{
    fontSize: 20,
    width: width * 0.3,
    alignSelf: 'flex-start',
  },
  endStationBot:{
    fontSize: 20,
    width: width * 0.3,
    alignSelf: 'flex-start',
  },
  descText:{
    paddingTop:30,
    flexDirection: 'row',
  },
  topLine:{
    paddingTop: 20,
    height: 40,
    flexDirection: 'row',
  },
  botLine:{
    paddingTop: 30,
    height: 40,
    flexDirection: 'row',
  },
  arrivalTimesTop:{
    width: width * 0.7,
    fontSize: 20,
    paddingLeft: 10,
    alignSelf: 'flex-start',
  },
  arrivalTimeBot:{
    width: width * 0.7,
    fontSize: 20,
    paddingLeft: 10,
    alignSelf: 'flex-start',
  },
});
