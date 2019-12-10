import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import * as Permissions from 'expo-permissions';
import Map from './components/map';
import BottomNavigator from './components/bottomNavigator';
import Menu from './components/menu';
import MenuVoyage from './components/menuVoyage';
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
    const [isVisible, setIsVisible] = React.useState({ isStationSelected: false, isInputSelected: false, isVoyageSelected: false, isMenuSelected: false, isSettingsSelected: false, isMenuVoyageSelected: false });
    const [typingOrigin, setTypingOrigin] = React.useState('');
    const [typingDestination, setTypingDestination] = React.useState('');
    const [station_data, setData] = React.useState(DATA)
    const [selectedInput, setSelecedInput] = React.useState('')
    const [profile, setProfile] = React.useState({name: 'Mike Lewis', cardStatus:'inválido', balance: 50, voyages: 0})
    const [switches, setSwitches] = React.useState({passRenewal: false, voyageConvergion: false})

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
            return { ...prevState, isStationSelected: true, isVoyageSelected: false, isMenuSelected: false, isSettingsSelected: false, isMenuVoyageSelected: false}
        })
    }
    function onMapPressHandler() {
        setIsVisible(prevState => {
            return { ...prevState, isStationSelected: false, isVoyageSelected: false, isMenuSelected: false, isSettingsSelected: false, isMenuVoyageSelected: false }
        })
    }
    function onMenuPressHandler(){
        setIsVisible(prevState => {
            return { ...prevState, isStationSelected: false, isVoyageSelected: false, isMenuSelected: true, isSettingsSelected: false, isMenuVoyageSelected: false }
        })
    }
    function onSettingsPressHandler(){
        setIsVisible(prevState => {
            return { ...prevState, isStationSelected: false, isVoyageSelected: false, isMenuSelected: false, isSettingsSelected: true, isMenuVoyageSelected: false }
        })
    }
    function onClosePressHandler() {
        setIsVisible(prevState => {
            return { ...prevState, isStationSelected: false, isVoyageSelected: false, isMenuSelected: false, isSettingsSelected: false, isMenuVoyageSelected: false }
        })
    }
    function onInputPressDestinationHandler() {
        setData(DATA)
        setIsVisible({ isStationSelected: false, isInputSelected: true, isVoyageSelected: false, isMenuSelected: false, isSettingsSelected: false, isMenuVoyageSelected: false })
        setSelecedInput('destination')
    }
    function onInputPressOriginHandler() {
        setData(DATA)
        setSelecedInput('origin')
    }
    function onArrowBackPressHandler() {
        setIsVisible({ isStationSelected: false, isInputSelected: false, isVoyageSelected: false, isMenuSelected: false, isSettingsSelected: false, isMenuVoyageSelected: false })
        setSelecedInput('')
    }
    function onItemPressHandler(title) {
        setData(null)
        selectedInput == 'destination' ? setTypingDestination(title) : setTypingOrigin(title)
    }
    function onSearchPressHandler() {
        if (all_stations.includes(typingOrigin) && all_stations.includes(typingDestination) && (typingOrigin != typingDestination)) {
            setIsVisible({ isStationSelected: false, isInputSelected: false, isVoyageSelected: true, isMenuSelected: false, isSettingsSelected: false, isMenuVoyageSelected: false })
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

    function onPressSwitchVoyageHandler(){
        const new_value = !switches.voyageConvergion
        setSwitches(prevState => {
            return { ...prevState, voyageConvergion: new_value}
        })
    }

    function onPressSwitchPassValidityHandler(){
        if (profile.cardStatus == 'inválido' && profile.balance >= 30){
            const new_balance = profile.balance - 30
            setProfile(prevState => {
                return { ...prevState, cardStatus:'válido', balance: new_balance, voyages: null}
            })
        }
    }

    function onPressSwitchPassRenewalHandler(){
        const new_value = !switches.passRenewal
        setSwitches(prevState => {
            return { ...prevState, passRenewal: new_value}
        })
    }
    function onPressMenuVoyageHandler(){
        setIsVisible(prevState => {
            return { ...prevState, isStationSelected: false, isInputSelected: false, isVoyageSelected: false, isMenuSelected: false, isSettingsSelected: false, isMenuVoyageSelected: true }
        })
    }
    return (
        <View style={styles.container}>
            <Map latitude={latitude} longitude={longitude} locations={locations} 
                onMarkerPress={onMarkerPressHandler} onMapPress={onMapPressHandler}/>
            {!isVisible.isMenuVoyageSelected?<BottomNavigator onNavigate={() => props.navigation.navigate('Validation')} 
                                                                onMenuPress={onMenuPressHandler}
                                                                onSettingsPress={onSettingsPressHandler}/>
                                            :null}
            {isVisible.isMenuSelected ?     <Menu profile={profile} onClosePress={onClosePressHandler} onPressMenuVoyage={onPressMenuVoyageHandler}/>
                                            :null}
            
            {isVisible.isMenuVoyageSelected?<MenuVoyage profile={profile} switches={switches} onClosePress={onClosePressHandler}
                                                        onPressSwitchVoyage={onPressSwitchVoyageHandler} 
                                                        onPressSwitchPassValidity={onPressSwitchPassValidityHandler}
                                                        onPressSwitchPassRenewal={onPressSwitchPassRenewalHandler}/>
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
                                            
                                            : null}
            {!isVisible.isMenuVoyageSelected && !isVisible.isInputSelected?<DestinationBar typingDestination={typingDestination} onInputPressDestination={onInputPressDestinationHandler} 
                                            onTextChangeDestination={typingDestination => onTextChangeDestinationHandler(typingDestination)}/>:null}

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
