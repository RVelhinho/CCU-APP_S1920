import MapView, { Marker, Polyline } from 'react-native-maps';
import React from 'react';
import {
    Image,
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';

const locations_json = require('../../locations.json');
const { width, height } = Dimensions.get('screen')
const green_stations = ['Telheiras', 'Campo Grande', 'Alvalade', 'Roma', 'Areeiro', 'Alameda', 'Anjos', 'Intendente', 'Martim Moniz', 'Rossio', 'Baixa-Chiado', 'Cais do Sodré', 'Alameda', 'Areeiro', 'Roma'];
const yellow_stations = ['Odivelas', 'Senhor Roubado', 'Ameixoeira', 'Lumiar', 'Quinta das Conchas', 'Campo Grande', 'Cidade Universitária', 'Entrecampos', 'Campo Pequeno', 'Saldanha', 'Picoas', 'Marquês de Pombal', 'Rato']
const red_stations = ['Aeroporto', 'Encarnação', 'Moscavide', 'Oriente', 'Cabo Ruivo', 'Olivais', 'Chelas', 'Bela Vista', 'Olaias', 'Alameda', 'Saldanha', 'São Sebastião']
const blue_stations = ['Reboleira', 'Amadora Este', 'Alfamelos', 'Pontinha', 'Carnide', 'Colégio Militar/Luz', 'Alto dos Moinhos', 'Laranjeiras', 'Jardim Zoológico', 'Praça de Espanha', 'São Sebastião', 'Parque', 'Marquês de Pombal', 'Avenida', 'Restauradores', 'Baixa-Chiado', 'Terreiro do Paço', 'Santa Apolónia']


export default function Map(props) {
    renderStations = () => {
        return (
            <View>
                {
                props.locations.map((location, idx) => {
                    const {
                        coords: { latitude, longitude }
                    } = location
                    const { station } = location
                    if (yellow_stations.includes(station) && red_stations.includes(station)) {
                        return (
                            <Marker key={idx}
                                coordinate={{ latitude, longitude }}
                                size={30}
                                onPress={() => props.onMarkerPress(location)}>
                                <Image source={require('../../assets/images/yellow_red.png')} style={styles.markersStyle} />
                            </Marker>
                        )
                    }
                    else if (yellow_stations.includes(station) && green_stations.includes(station)) {
                        return (
                            <Marker key={idx}
                                coordinate={{ latitude, longitude }}
                                size={30}
                                onPress={() => props.onMarkerPress(location)}>
                                <Image source={require('../../assets/images/yellow_green.png')} style={styles.markersStyle} />
                            </Marker>
                        )
                    }
                    else if (yellow_stations.includes(station) && blue_stations.includes(station)) {
                        return (
                            <Marker key={idx}
                                coordinate={{ latitude, longitude }}
                                size={30}
                                onPress={() => props.onMarkerPress(location)}>
                                <Image source={require('../../assets/images/yellow_blue.png')} style={styles.markersStyle} />
                            </Marker>
                        )
                    }
                    else if (green_stations.includes(station) && red_stations.includes(station)) {
                        return (
                            <Marker key={idx}
                                coordinate={{ latitude, longitude }}
                                size={30}
                                onPress={() => props.onMarkerPress(location)}>
                                <Image source={require('../../assets/images/green_red.png')} style={styles.markersStyle} />
                            </Marker>
                        )
                    }
                    else if (green_stations.includes(station) && blue_stations.includes(station)) {
                        return (
                            <Marker key={idx}
                                coordinate={{ latitude, longitude }}
                                size={30}
                                onPress={() => props.onMarkerPress(location)}>
                                <Image source={require('../../assets/images/green_blue.png')} style={styles.markersStyle} />
                            </Marker>
                        )
                    }
                    else if (red_stations.includes(station) && blue_stations.includes(station)){
                        return(
                            <Marker key = {idx}
                                    coordinate = {{latitude, longitude}}
                                    size = {30}
                                    onPress = {() => props.onMarkerPress(location)}>
                            <Image source = {require('../../assets/images/blue_red.png')} style = {styles.markersStyle}/>       
                            </Marker>
                        )
                    }
                    
                    else if (yellow_stations.includes(station)){
                        return(
                            <Marker key = {idx}
                                    coordinate = {{latitude, longitude}}
                                    size = {30}
                                    onPress = {() => props.onMarkerPress(location)}>
                            <Image source = {require('../../assets/images/yellow.png')} style = {styles.markersStyle}/>       
                            </Marker>
                        )
                    }
                    else if (green_stations.includes(station)){
                        return(
                            <Marker key = {idx}
                                    coordinate = {{latitude, longitude}}
                                    onPress = {() => props.onMarkerPress(location)}>
                            <Image source = {require('../../assets/images/green.png')} style = {styles.markersStyle}/>       
                            </Marker>
                        )
                    }
                    else if (red_stations.includes(station)){
                    return(
                        <Marker key = {idx}
                                coordinate = {{latitude, longitude}}
                                size = {30}
                                onPress = {() => props.onMarkerPress(location)}>
                        <Image source = {require('../../assets/images/red.png')} style = {styles.markersStyle}/>       
                        </Marker>
                    )
                    }
                    else if (blue_stations.includes(station)){
                        return(
                            <Marker key = {idx}
                                    coordinate = {{latitude, longitude}}
                                    size = {30}
                                    onPress = {() => props.onMarkerPress(location)}>
                            <Image source = {require('../../assets/images/blue.png')} style = {styles.markersStyle}/>       
                            </Marker>
                        )
                    }
                })
            }
        </View>
        )
    }
    renderPolylines = () =>{
        coordinates_yellow = []
        coordinates_blue = []
        coordinates_green = []
        coordinates_red = []
        return(
        <View>
            {
            locations_json.map((location,idx) => {
                const {
                coords : {latitude, longitude}
                } = location
                const {line} = location
                if ( line == 'yellow'){
                coordinates_yellow.push({latitude, longitude})
                }
                else if ( line == 'blue'){
                coordinates_blue.push({latitude, longitude})
                }
                else if ( line == 'red'){
                coordinates_red.push({latitude, longitude})
                }
                else{
                coordinates_green.push({latitude, longitude})
                }
            })
            }
            <Polyline
                coordinates={coordinates_yellow}
                strokeColor="#f7a800" // fallback for when `strokeColors` is not supported by the map-provider
                strokeWidth={6}
            />
            <Polyline
                coordinates={coordinates_green}
                strokeColor="#00a19b" // fallback for when `strokeColors` is not supported by the map-provider
                strokeWidth={6}
            />
            <Polyline
                coordinates={coordinates_red}
                strokeColor="#ea1d76" // fallback for when `strokeColors` is not supported by the map-provider
                strokeWidth={6}
            />
            <Polyline
                coordinates={coordinates_blue}
                strokeColor="#2f7de1" // fallback for when `strokeColors` is not supported by the map-provider
                strokeWidth={6}
            />
        </View>
        )
    }
    const latitude = props.latitude
    const longitude = props.longitude
    return(
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
                onPress = {props.onMapPress}>
            {renderStations()}
            {renderPolylines()}
        </MapView>
    )
}


const styles = StyleSheet.create({
    mapStyle: {
        flex: 1,
        width: width,
        height: height,
    },
    markersStyle: {
        flex: 1,
        resizeMode: 'contain',
        width: width * 0.13,
        height: height * 0.05,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
})