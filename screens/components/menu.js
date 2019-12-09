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

const { width, height } = Dimensions.get('screen')

export default function Menu(props) {
    return(
        <View style={styles.profileView}>
            <View style={{width: width, height: height * 0.1, flexDirection:'row'}}>
                <Image source={require('../../assets/images/profile_picture.png')} style={{width: width * 0.2, height: height * 0.1,borderRadius: 50}}></Image>
                <View style={{ width: width * 0.6, height: height * 0.1, alignItems:'flex-start', justifyContent:'center'}}>
                    <Text style={{width: width * 0.3, fontSize: responsiveFontSize(2,5), fontWeight: 'bold'}}>Mike Lewis</Text>
                    <Text style={{fontSize: responsiveFontSize(2)}}>mike_lewis98@gmail.com</Text>
                </View>
                <View style={{width: width * 0.2,height: height * 0.1, alignItems:'center', justifyContent:'center'}}>
                    <Ionicons
                        name={'md-close'}
                        size={responsiveWidth(9)}
                        onPress={props.onClosePressHandler}
                    />
                </View>
            </View>
            <View style={{ width: width * 0.9, alignSelf:'flex-start',borderBottomColor: 'lightgrey', borderBottomWidth: 1, marginLeft: width * 0.02}}/>
            <TouchableOpacity onPress={props.onNavigateHandler} style={{width: width, height: height * 0.07, flexDirection:'row'}}>
                <View style={{width: width * 0.2, height: height * 0.07, justifyContent:'center'}}>
                    <Ionicons
                    name={'md-card'}
                    size={responsiveWidth(8)}
                    color={'black'}
                    style={{alignSelf:'center'}}>
                    </Ionicons>
                </View>
                <View style={{ width: width * 0.8, height: height * 0.07, justifyContent:'center'}}>
                    <Text style={{fontSize: responsiveFontSize(2)}}>Viagens</Text>
                </View>
            </TouchableOpacity>
            <View style={{width: width, height: height * 0.07, flexDirection:'row'}}>
                <View style={{width: width * 0.2, height: height * 0.07, justifyContent:'center'}}>
                    <Ionicons
                    name={'md-document'}
                    size={responsiveWidth(8)}
                    color={'lightgrey'}
                    style={{alignSelf:'center'}}>
                    </Ionicons>
                </View>
                <View style={{ width: width * 0.8, height: height * 0.07, justifyContent:'center'}}>
                    <Text style={{fontSize: responsiveFontSize(2), color:'lightgrey'}}>Documentos</Text>
                </View>
            </View>
            <View style={{width: width, height: height * 0.07, flexDirection:'row'}}>
                <View style={{width: width * 0.2, height: height * 0.07, justifyContent:'center'}}>
                    <Ionicons
                    name={'md-pricetags'}
                    size={responsiveWidth(8)}
                    color={'lightgrey'}
                    style={{alignSelf:'center'}}>
                    </Ionicons>
                </View>
                <View style={{ width: width * 0.8, height: height * 0.07, justifyContent:'center'}}>
                    <Text style={{fontSize: responsiveFontSize(2), color:'lightgrey'}}>Descontos</Text>
                </View>
            </View>
            <View style={{width: width, height: height * 0.07, flexDirection:'row'}}>
                <View style={{width: width * 0.2, height: height * 0.07, justifyContent:'center'}}>
                    <Ionicons
                    name={'md-people'}
                    size={responsiveWidth(8)}
                    color={'lightgrey'}
                    style={{alignSelf:'center'}}>
                    </Ionicons>
                </View>
                <View style={{ width: width * 0.8, height: height * 0.07, justifyContent:'center'}}>
                    <Text style={{fontSize: responsiveFontSize(2), color:'lightgrey'}}>Controlo Parental</Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    profileView: {
        flex: 1,
        position: 'absolute',
        width: width * 1.05,
        height: height * 0.4,
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
})