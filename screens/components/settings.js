import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';

import {
    responsiveFontSize,
    responsiveWidth
} from "react-native-responsive-dimensions";

const { width, height } = Dimensions.get('screen')

export default function Settings(props) {
    return(
        <View style={styles.settingsView}>
            <View style={styles.firstOptionWrapper}>
                <View style={styles.otherOptionsWrappers}>
                    <Text style={styles.blockedText}>Help</Text>
                </View>
                <View style={styles.iconWrapper}>
                    <Ionicons
                        name={'md-close'}
                        size={responsiveWidth(9)}
                        style={styles.closeStyle}
                        onPress={props.onClosePress}
                    />
                </View>
            </View>
            <View style={styles.otherOptionsWrappers}>
                <Text style={styles.blockedText}>Feedback</Text>
            </View>
            <View style={styles.otherOptionsWrappers}>
                <Text style={styles.blockedText}>Privacy Policy and Terms of Service</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    settingsView: {
        flex: 1,
        position: 'absolute',
        width: width * 1.05,
        height: height * 0.25,
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
    closeStyle: {
        width: width * 0.1,
    },
    firstOptionWrapper:{
        width:width, 
        height: height *0.07, 
        flexDirection:'row'
    },
    otherOptionsWrappers:{
        width: width * 0.8, 
        height: height * 0.07, 
        alignItems:'flex-start', 
        justifyContent: 'center'
    },
    iconWrapper:{
        width : width * 0.2, 
        height: height * 0.07, 
        alignItems:'center', 
        justifyContent: 'center'
    },
    blockedText:{
        fontSize: responsiveFontSize(2), 
        color:'lightgrey'
    }
})