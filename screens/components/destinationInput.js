import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    SafeAreaView,
    FlatList
} from 'react-native';

import {
    responsiveFontSize,
    responsiveWidth
} from "react-native-responsive-dimensions";
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';


const { width, height } = Dimensions.get('screen')

export default function DestinationInput(props) {
    function Item(props) {
        return (
            <TouchableOpacity
                style={styles.item} 
                onPress={props.onItemPress}>
                <Text style={styles.title}>{props.title}</Text>
            </TouchableOpacity>
        );
    }
    return(
        <View style={styles.wholePageContainer}>
            <View style={styles.topContainer}>
                <View style={{flexDirection:"row"}}>
                    <Ionicons
                        name={'ios-arrow-back'}
                        size={responsiveWidth(8)}
                        color={'black'}
                        style={styles.arrowBackIcon}
                        onPress={props.onArrowBackPress}
                    />
                    <Ionicons
                        name={'md-radio-button-off'}
                        size={responsiveWidth(4)}
                        color={'black'}
                        style={styles.originDotIcon}
                    />
                    <Ionicons
                        name={'md-search'}
                        size={responsiveWidth(8)}
                        color={'white'}
                        style={styles.searchIcon}
                        onPress={props.onSearchPress}
                    />
                </View>
                <Ionicons
                    name={'md-radio-button-on'}
                    size={responsiveWidth(4)}
                    color={'black'}
                    style={styles.destinationDotIcon}
                />
                <View style={styles.SearchOriginContainer}>
                    <Ionicons
                        name={'md-search'}
                        size={responsiveWidth(8)}
                        color={'black'}
                        style={styles.searchHelperIcon}
                    />
                    <TextInput placeholder='Origem' style={styles.SearchDestinationInput} value={props.typingOrigin} onTouchStart={props.onInputPressOrigin} onChangeText={props.onTextChangeOrigin}>
                    </TextInput>
                </View>
                <View style={styles.SearchDestinationContainer}>
                    <Ionicons
                        name={'md-search'}
                        size={responsiveWidth(8)}
                        color={'black'}
                        style={styles.searchHelperIcon}
                    />
                    <TextInput placeholder='Destino' style={styles.SearchDestinationInput} value={props.typingDestination} onTouchStart={props.onInputPressDestination} onChangeText={props.onTextChangeDestination}>
                    </TextInput>
                </View>
            </View>
            <View style={styles.botContainer}>
                <Text style={styles.stationListTitle}>
                Estações
                </Text>
                <SafeAreaView style={{ marginTop: Constants.statusBarHeight }}>
                    <FlatList
                        data={props.station_data}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Item
                                title={item.title}
                                onItemPress={() => props.onItemPress(item.title)}
                            />
                        )
                        }
                />
                </SafeAreaView>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    wholePageContainer: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: 'lightgrey',
        position: 'absolute',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    topContainer: {
        width: width,
        height: height * 0.25,
        backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    botContainer: {
        width: width,
        height: height * 0.65,
        marginTop: height * 0.02,
        backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    SearchOriginContainer: {
        width: width * 0.7,
        height: height * 0.06,
        marginTop: height * 0.07,
        alignSelf: 'center',
        alignItems: 'center',
        position: "absolute",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        backgroundColor: "white",
        flexDirection: "row",
        paddingLeft: width * 0.02,
    },
    SearchDestinationContainer: {
        width: width * 0.7,
        height: height * 0.06,
        marginTop: height * 0.16,
        alignSelf: 'center',
        alignItems: 'center',
        position: "absolute",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        backgroundColor: "white",
        flexDirection: "row",
        paddingLeft: width * 0.02,
    },
    SearchDestinationInput: {
        width: width * 0.5,
        height: height * 0.1,
        textAlign: 'center',
        fontSize: responsiveFontSize(2.7),
        paddingRight: width * 0.03,
    },
    item: {
        padding: width * 0.03,
        borderWidth: .2,
        backgroundColor: 'white',
    },
    title: {
        fontSize: responsiveFontSize(3),
    },
    arrowBackIcon:{
        width: width * 0.06, 
        marginTop: height * 0.08,
        paddingLeft: width * 0.02
    },
    originDotIcon:{
        width: width * 0.06, 
        marginTop: height * 0.09,
        paddingLeft: width * 0.02
    },
    destinationDotIcon:{
        width: width * 1, 
        marginTop: height * 0.015,
        paddingLeft: width * 0.08
    },
    searchIcon:{
        width: width * 0.08, 
        marginTop: height * 0.12, 
        marginLeft: width * 0.75, 
        paddingLeft: width * 0.01,
        alignItems:'center', 
        backgroundColor:'white', 
        borderWidth: 0.8,
        borderRadius: 100, 
        borderColor: 'green',
        backgroundColor:'green'
    },
    searchHelperIcon:{
        width: width * 0.1
    },
    stationListTitle:{
        width: width, 
        paddingTop:height * 0.05, 
        fontSize: responsiveFontSize(2.5), 
        fontWeight: "bold",
        textAlign: 'center'
    }
})
