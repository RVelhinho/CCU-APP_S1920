import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
} from 'react-native';

import {
    responsiveFontSize,
    responsiveWidth
} from "react-native-responsive-dimensions";
import images from '../../assets/images/index.js';

const { width, height } = Dimensions.get('screen')

export default function Station(props) {
    return(
        <View style={styles.stationView}>
            <View style={styles.firstRow}>
                <Text style={styles.stationName}>
                    {props.destination.station}
                </Text>
                {props.destination.isDouble ? <TouchableOpacity onPress={props.switchLines}><Image source={require('../../assets/images/switch.png')} style={{ flex: 1, resizeMode: 'contain', marginTop: height * 0.002 }}></Image></TouchableOpacity> : null}
                <Image source={images[props.destination.rect_image]} style={styles.imageWrapper}></Image>
                <Ionicons
                    name={'md-close'}
                    size={responsiveWidth(9)}
                    style={styles.closeStyle}
                    onPress={props.onClosePress}
                />
            </View>
            <View style={styles.descText}>
                <Text style={styles.descFirstText}>End Station:
                </Text>
                <Text style={styles.descSecondText}>Arrival Time:
                </Text>
            </View>
            <View style={styles.topLine}>
                <Text style={styles.endStationTop}>
                    {props.destination.end_station_top}
                </Text>
                <Text style={styles.arrivalTimesTop}>
                    {props.destination.arrival_times_top.first}
                    <Text style={styles.minText}>min</Text>
                    {' '}{' '}{' '}{' '}{' '}{' '}
                    {props.destination.arrival_times_top.second}
                    <Text style={styles.minText}>min</Text>
                    {' '}{' '}{' '}{' '}{' '}{' '}
                    {props.destination.arrival_times_top.third}
                    <Text style={styles.minText}>min</Text>
                </Text>
            </View>
            <View style={styles.botLine}>
                <Text style={styles.endStationBot}>
                    {props.destination.end_station_bot}
                </Text>
                <Text style={styles.arrivalTimeBot}>
                    {props.destination.arrival_times_bot.first}
                    <Text style={styles.minText}>min</Text>
                    {' '}{' '}{' '}{' '}{' '}{' '}
                    {props.destination.arrival_times_bot.second}
                    <Text style={styles.minText}>min</Text>
                    {' '}{' '}{' '}{' '}{' '}{' '}
                    {props.destination.arrival_times_bot.third}
                    <Text style={styles.minText}>min</Text>
                </Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    stationView: {
        flex: 1,
        position: 'absolute',
        width: width * 1.05,
        height: height * 0.3,
        bottom: 0,
        paddingLeft: width * 0.05,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    stationName: {
        fontSize: responsiveFontSize(3),
        width: width * 0.5,
        fontWeight: "bold",
    },
    endStationTop: {
        fontSize: responsiveFontSize(2.5),
        width: width * 0.3,
        alignSelf: 'flex-start',
    },
    endStationBot: {
        fontSize: responsiveFontSize(2.5),
        width: width * 0.3,
        alignSelf: 'flex-start',
    },
    descText: {
        marginTop: height * 0.02,
        flexDirection: 'row',
    },
    topLine: {
        paddingTop: height * 0.01,
        flexDirection: 'row',
    },
    botLine: {
        paddingTop: height * 0.01,
        flexDirection: 'row',
    },
    arrivalTimesTop: {
        width: width * 0.7,
        fontSize: responsiveFontSize(2.5),
        paddingLeft: width * 0.05,
        alignSelf: 'flex-start',
    },
    arrivalTimeBot: {
        width: width * 0.7,
        fontSize: responsiveFontSize(2.5),
        paddingLeft: width * 0.05,
        alignSelf: 'flex-start',
    },
    closeStyle: {
        width: width * 0.1,
    },
    firstRow:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: width
    },
    imageWrapper:{
        flex: 1, 
        resizeMode: 'contain'
    },
    descFirstText:{
        width: width * 0.4, 
        fontSize: responsiveFontSize(2.5), 
        fontWeight: "bold", 
        alignSelf: 'flex-start'
    },
    descSecondText:{
        width: width * 0.6, 
        fontSize: responsiveFontSize(2.5), 
        fontWeight: "bold", 
        alignSelf: 'flex-start'
    },
    minText:{
        width: width * 0.6, 
        fontSize: responsiveFontSize(1.5), 
        fontWeight: "bold", 
        alignSelf: 'flex-start'
    }
})