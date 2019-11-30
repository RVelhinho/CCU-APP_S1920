import * as WebBrowser from 'expo-web-browser';
import React from 'react';
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
import { TextInput } from 'react-native-gesture-handler';
import MapView, {Marker} from 'react-native-maps';
import * as Permissions from 'expo-permissions';

const locations_json = require('../locations.json');
const green_stations = ['Alameda', 'Areeiro', 'Roma'];
const yellow_stations = ['Entrecampos', 'Campo Pequeno', 'Saldanha']
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
  renderStations = () =>{
    return(
      <View>
        {
          locations.map((location,idx) => {
            const {
              coords : {latitude, longitude}
            } = location
            const { station } = location
            if (yellow_stations.includes(station)){
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
        <TextInput placeholder='Destino' style={styles.SearchDestinationInput}>
        </TextInput>
      </View>
      {isVisible?  
                  <View style = {styles.stationView}>
                    <Text style = {styles.stationName}>
                      {destination.station}
                    </Text>
                    <View style = {styles.topLine}>
                      <Text style = {styles.endStationTop}>
                        {destination.end_station_top}
                      </Text>
                      <Text style = {styles.arrivalTimesTop}>
                        {destination.arrival_times_top.first}
                        {' '}{' '}{' '}{' '}{' '}{' '}
                        {destination.arrival_times_top.second}
                        {' '}{' '}{' '}{' '}{' '}{' '}
                        {destination.arrival_times_top.third}
                      </Text>
                    </View>
                    <View style = {styles.botLine}>
                      <Text style = {styles.endStationBot}>
                          {destination.end_station_bot}
                      </Text> 
                      <Text style = {styles.arrivalTimeBot}>
                        {destination.arrival_times_bot.first}
                        {' '}{' '}{' '}{' '}{' '}{' '}
                        {destination.arrival_times_bot.second}
                        {' '}{' '}{' '}{' '}{' '}{' '}
                        {destination.arrival_times_bot.third}
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
    height: 60,
    width: Dimensions.get('window').width,
    marginTop: 90,
    alignItems: 'center',
    position: "absolute",
  },
  SearchDestinationInput:{
    width: 250,
    height: 50,
    textAlign: 'center',
    fontSize: 25,
    borderWidth: .2,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0, 0.8)',
    backgroundColor: "white",
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
    fontSize: 30,
    alignSelf: 'flex-start',
  },
  endStationTop:{
    fontSize: 20,
    width: width * 0.4,
    alignSelf: 'flex-start',
  },
  endStationBot:{
    fontSize: 20,
    width: width * 0.4,
    alignSelf: 'flex-start',
  },
  topLine:{
    paddingTop: 50,
    height: 40,
    flexDirection: 'row',
  },
  botLine:{
    paddingTop: 50,
    height: 40,
    flexDirection: 'row',
  },
  arrivalTimesTop:{
    width: width * 0.6,
    fontSize: 20,
    paddingLeft: 20,
    alignSelf: 'flex-start',
  },
  arrivalTimeBot:{
    width: width * 0.6,
    fontSize: 20,
    paddingLeft: 20,
    alignSelf: 'flex-start',
  },
});
