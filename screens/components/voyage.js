import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text
} from 'react-native';

import {
    responsiveFontSize,
} from "react-native-responsive-dimensions";

const { width, height } = Dimensions.get('screen')

export default function Voyage(props) {
    return(
        <View>
            <View style={styles.VoyageContainer}>
                <View style={styles.firstRow}>
                    <Text style={styles.firstRowfirstText}>Viagem</Text>
                    <Text style={styles.firstRowSecondText}>Tempo de chegada</Text>
                    <Ionicons
                        name={'md-close'}
                        size={35}
                        style={styles.closeStyle}
                        onPress={props.onClosePress}
                    />
                </View>
                <View style={styles.topLineVoyage}>
                    <Text style={styles.voyageOriginOrDestinationText}>{props.voyageOrigin.station}</Text>
                    <Text style={styles.arrivalTimesTopVoyage}>
                        {Math.floor(props.voyageOrigin.arrival_times_top.first)}
                        <Text style={styles.minText}>min</Text>
                        {' '}{' '}{' '}{' '}{' '}{' '}
                        {Math.floor(props.voyageOrigin.arrival_times_top.second)}
                        <Text style={styles.minText}>min</Text>
                        {' '}{' '}{' '}{' '}{' '}{' '}
                        {Math.floor(props.voyageOrigin.arrival_times_top.third)}
                        <Text style={styles.minText}>min</Text>
                    </Text>
                </View>
                <View style={styles.botLineVoyage}>
                    <Text style={styles.voyageOriginOrDestinationText}>{props.voyageDestination.station}</Text>
                    <Text style={styles.arrivalTimeBotVoyage}>
                        {Math.floor(props.voyageOrigin.arrival_times_top.first + props.voyageDestination.arrival_times_bot.first)}
                        <Text style={styles.minText}>min</Text>
                        {' '}{' '}{' '}{' '}{' '}{' '}
                        {Math.floor(props.voyageOrigin.arrival_times_top.second + props.voyageDestination.arrival_times_bot.second)}
                        <Text style={styles.minText}>min</Text>
                        {' '}{' '}{' '}{' '}{' '}{' '}
                        {Math.floor(props.voyageOrigin.arrival_times_top.third + props.voyageDestination.arrival_times_bot.third)}
                        <Text style={styles.minText}>min</Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    VoyageContainer: {
        flex: 1,
        position: 'absolute',
        width: width * 1.05,
        height: height * 0.3,
        bottom: 0,
        paddingLeft: width * 0.05,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    topLineVoyage: {
        width: width,
        paddingTop: height * 0.005,
        flexDirection: 'row',
    },
    botLineVoyage: {
        width: width,
        paddingTop: height * 0.02,
        flexDirection: 'row',
    },
    arrivalTimesTopVoyage: {
        width: width * 0.7,
        fontSize: responsiveFontSize(2.5),
        paddingLeft: width * 0.1,
    },
    arrivalTimeBotVoyage: {
        width: width * 0.7,
        fontSize: responsiveFontSize(2.5),
        paddingLeft: width * 0.1,
    },
    closeStyle: {
        width: width * 0.1,
    },
    firstRow:{
        width: width, 
        height: height * 0.1, 
        flexDirection: 'row', 
        justifyContent: "space-between"
    },
    firstRowfirstText:{
        width: width * 0.4, 
        fontSize: responsiveFontSize(2.5), 
        fontWeight: 'bold'
    },
    firstRowSecondText:{
        width: width * 0.5, 
        fontSize: responsiveFontSize(2.5), 
        fontWeight: 'bold'
    },
    voyageOriginOrDestinationText:{
        width: width * 0.5, 
        fontSize: responsiveFontSize(2.5), 
        fontWeight: 'bold'
    },
    minText:{
        width: width * 0.5, 
        fontSize: responsiveFontSize(2.5), 
        fontWeight: 'bold'
    }
})