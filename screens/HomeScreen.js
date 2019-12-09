import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import * as Permissions from 'expo-permissions';
import Map from './components/map';
import BottomNavigator from './components/bottomNavigator';
import Menu from './components/menu';
import Settings from './components/settings';
import Station from './components/station';
import DestinationInput from './components/destinationInput';
import DestinationBar from './components/destinationBar';
import Voyage from './components/voyage';

const locations_json = require('../locations.json');
const all_stations = ['Alameda', 'Areeiro', 'Roma', 'Entrecampos', 'Campo Pequeno', 'Saldanha']

const DATA = [
    {
        id: '1',
        title: 'Alameda',
    },
    {
        id: '2',
        title: 'Areeiro',
    },
    {
        id: '3',
        title: 'Campo Pequeno',
    },
    {
        id: '4',
        title: 'Entrecampos',
    },
    {
        id: '5',
        title: 'Roma',
    },
    {
        id: '6',
        title: 'Saldanha',
    },
];


export default function HomeScreen(props) {
    const [latitude, setlatitude] = React.useState(null);
    const [longitude, setlongitude] = React.useState(null);
    const [locations, setLocations] = React.useState(locations_json);
    const [destination, setDestination] = React.useState(null);
    const [voyageOrigin, setVoyageOrigin] = React.useState(null);
    const [voyageDestination, setVoyageDestination] = React.useState(null);
    const [isVisible, setIsVisible] = React.useState({ isStationSelected: false, isInputSelected: false, isVoyageSelected: false, isMenuSelected: false, isSettingsSelected: false });
    const [typingOrigin, setTypingOrigin] = React.useState('');
    const [typingDestination, setTypingDestination] = React.useState('');
    const [station_data, setData] = React.useState(DATA)
    const [selectedInput, setSelecedInput] = React.useState('')
    React.useEffect(async () => {
        const { status } = await Permissions.getAsync(Permissions.LOCATION)
        if (status != 'granted') {
            const response = await Permissions.askAsync(Permissions.LOCATION)
        }
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => { setlatitude(latitude), setlongitude(longitude) },
            (error) => console.log('Error:', error),
            { enableHighAccuracy: true, timeout: 50000, maximumAge: 1000 },
        )
    }, []);
    function onTextChangeOriginHandler(typingOrigin) {
        const new_data = DATA.filter(function (item) {
            const item_data = item.title.startsWith(typingOrigin) ? item : null
            return item_data
        })
        setData(new_data)
        setTypingOrigin(typingOrigin)
    }
    function onTextChangeDestinationHandler(typingDestination) {
        const new_data = DATA.filter(function (item) {
            const item_data = item.title.startsWith(typingDestination) ? item : null
            return item_data
        })
        setData(new_data)
        setTypingDestination(typingDestination)
    }
    function onMarkerPressHandler(location) {
        setDestination(location)
        setIsVisible(prevState => {
            return { ...prevState, isStationSelected: true, isVoyageSelected: false, isMenuSelected: false, isSettingsSelected: false}
        })
    }
    function onMapPressHandler() {
        setIsVisible(prevState => {
            return { ...prevState, isStationSelected: false, isVoyageSelected: false, isMenuSelected: false, isSettingsSelected: false }
        })
    }
    function onMenuPressHandler(){
        setIsVisible(prevState => {
            return { ...prevState, isStationSelected: false, isVoyageSelected: false, isMenuSelected: true, isSettingsSelected: false }
        })
    }
    function onSettingsPressHandler(){
        setIsVisible(prevState => {
            return { ...prevState, isStationSelected: false, isVoyageSelected: false, isMenuSelected: false, isSettingsSelected: true }
        })
    }
    function onClosePressHandler() {
        setIsVisible(prevState => {
            return { ...prevState, isStationSelected: false, isVoyageSelected: false, isMenuSelected: false, isSettingsSelected: false }
        })
    }
    function onInputPressDestinationHandler() {
        setData(DATA)
        setIsVisible({ isStationSelected: false, isInputSelected: true, isVoyageSelected: false, isMenuSelected: false, isSettingsSelected: false })
        setSelecedInput('destination')
    }
    function onInputPressOriginHandler() {
        setData(DATA)
        setSelecedInput('origin')
    }
    function onArrowBackPressHandler() {
        setIsVisible({ isStationSelected: false, isInputSelected: false, isVoyageSelected: false, isMenuSelected: false, isSettingsSelected: false })
        setSelecedInput('')
    }
    function onItemPressHandler(title) {
        setData(null)
        selectedInput == 'destination' ? setTypingDestination(title) : setTypingOrigin(title)
    }
    function onSearchPressHandler() {
        if (all_stations.includes(typingOrigin) && all_stations.includes(typingDestination) && (typingOrigin != typingDestination)) {
            setIsVisible({ isStationSelected: false, isInputSelected: false, isVoyageSelected: true, isMenuSelected: false, isSettingsSelected: false })
            locations.map((location, idx) => {
                const { station } = location
                if (station == typingOrigin) {
                    setVoyageOrigin(location)
                }
                else if (station == typingDestination) {
                    setVoyageDestination(location)
                }
            })
        }
    }
    function switchLinesHandler() {
        setDestination(prevState => {
            return {
                ...prevState, "end_station_top": destination.end_station_top_extra,
                "end_station_bot": destination.end_station_bot_extra,
                "arrival_times_top": {
                    "first": destination.arrival_times_top_extra.first_extra,
                    "second": destination.arrival_times_top_extra.second_extra,
                    "third": destination.arrival_times_top_extra.third_extra
                },
                "arrival_times_bot": {
                    "first": destination.arrival_times_bot_extra.first_extra,
                    "second": destination.arrival_times_bot_extra.second_extra,
                    "third": destination.arrival_times_bot_extra.third_extra
                },
                "end_station_top_extra": destination.end_station_top,
                "end_station_bot_extra": destination.end_station_bot,
                "arrival_times_top_extra": {
                    "first_extra": destination.arrival_times_top.first,
                    "second_extra": destination.arrival_times_top.second,
                    "third_extra": destination.arrival_times_top.third
                },
                "arrival_times_bot_extra": {
                    "first_extra": destination.arrival_times_bot.first,
                    "second_extra": destination.arrival_times_bot.second,
                    "third_extra": destination.arrival_times_bot.third
                }
            }
        });
    }
  return (
    <View style={styles.container}>
        <Map latitude={latitude} longitude={longitude} locations={locations} 
             onMarkerPress={onMarkerPressHandler} onMapPress={onMapPressHandler}/>
        <BottomNavigator onNavigate={() => props.navigation.navigate('Validation')} 
                         onMenuPress={onMenuPressHandler}
                         onSettingsPress={onSettingsPressHandler}/>
        {isVisible.isMenuSelected ?     <Menu onClosePress={onClosePressHandler} onNavigate={() => props.navigation.navigate('Voyage')}/>
                                        :null}

        {isVisible.isSettingsSelected ? <Settings onClosePress={onClosePressHandler}/>
                                        :null}

        {isVisible.isStationSelected ?  <Station onClosePress={onClosePressHandler} switchLines={switchLinesHandler} destination={destination}/>
                                        : null}

        {isVisible.isInputSelected?     <DestinationInput station_data={station_data} typingOrigin={typingOrigin} typingDestination={typingDestination} 
                                        onArrowBackPress={onArrowBackPressHandler} onSearchPress={onSearchPressHandler}
                                        onInputPressOrigin={onInputPressOriginHandler} onInputPressDestination={onInputPressDestinationHandler}
                                        onTextChangeOrigin={typingOrigin => onTextChangeOriginHandler(typingOrigin)}
                                        onTextChangeDestination={typingDestination => onTextChangeDestinationHandler(typingDestination)}
                                        onItemPress={onItemPressHandler}/>
                                        
                                        :<DestinationBar typingDestination={typingDestination} onInputPressDestination={onInputPressDestinationHandler} 
                                        onTextChangeDestination={typingDestination => onTextChangeDestinationHandler(typingDestination)}/>}

        {isVisible.isVoyageSelected ?  <Voyage voyageOrigin={voyageOrigin} voyageDestination={voyageDestination} onClosePress={onClosePressHandler}/>
                                        : null}
    </View>
    );
}

HomeScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
