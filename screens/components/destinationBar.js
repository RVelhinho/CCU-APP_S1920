import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    TextInput
} from 'react-native';

import {
    responsiveFontSize,
} from "react-native-responsive-dimensions";

const { width, height } = Dimensions.get('screen')

export default function DestinationBar(props) {
    return(
        <View style={styles.SearchDestinationContainer}>
            <Ionicons
                name={'md-search'}
                size={30}
                color={'black'}
                style={{ width: width * 0.1 }}
            />
            <TextInput placeholder='Destino' style={styles.SearchDestinationInput} value={props.typingDestination} onTouchStart={props.onInputPressDestination} onChangeText={props.onTextChangeDestination}>
            </TextInput>
        </View>
    )
}


const styles = StyleSheet.create({
    SearchDestinationContainer: {
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
    SearchDestinationInput: {
        width: width * 0.5,
        height: height * 0.1,
        textAlign: 'center',
        fontSize: responsiveFontSize(2.7),
        paddingRight: width * 0.03,
    },
})