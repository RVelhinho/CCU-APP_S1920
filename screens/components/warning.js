import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import {
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('screen')

export default function Warning(props) {
    return(
        <View style={styles.container}>
            <BlurView tint="dark" intensity={80} style={StyleSheet.absoluteFill}/>
            <View style={styles.warningContainer}>
                <View style={{width: width * 0.6, height: height * 0.07,alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{width: width * 0.35,fontSize:responsiveFontSize(2.5), fontWeight:'bold'}}>Are you sure?</Text>
                </View>
                <View style={{width: width * 0.6, height: height * 0.05, alignItems:'center', justifyContent:'center', }}>
                    <Text style={{width: width * 0.5,fontSize:responsiveFontSize(2), color:'grey'}}> Performing this action will result in extraction of the amount required for a pass</Text>
                </View>
                <View style={{width: width * 0.6, height: 0.08, flexDirection:'row'}}> 
                    <TouchableOpacity onPress={props.onNoPress} style={{width: width * 0.3, height: height * 0.08, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:responsiveFontSize(2), color:'red'}}>No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={props.onYesPress} style={{width: width * 0.3, height: height * 0.08, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:responsiveFontSize(2), color:'green'}}>Yes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    warningContainer:{
        width: width * 0.6,
        height: height * 0.2,
        backgroundColor: 'white',
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 8,
    },
})