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
            <View style={styles.profileWrapper}>
                <Image source={require('../../assets/images/profile_picture.png')} style={{width: width * 0.2, height: height * 0.1,borderRadius: 50}}></Image>
                <View style={styles.profileDescription}>
                    <Text style={styles.profileName}>{props.profile.name}</Text>
                    <Text style={styles.profileSecondaryAttribute}>Cartão {props.profile.cardStatus}</Text>
                </View>
                <View style={styles.closeIconWrapper}>
                    <Ionicons
                        name={'md-close'}
                        size={responsiveWidth(9)}
                        style={styles.closeStyle}
                        onPress={props.onClosePress}
                    />
                </View>
            </View>
            <View style={styles.hrLine}/>
            <TouchableOpacity onPress={props.onPressMenuVoyage} style={styles.optionWrapper}>
                <View style={styles.optionIconWrapper}>
                    <Ionicons
                    name={'md-card'}
                    size={responsiveWidth(8)}
                    color={'black'}
                    style={{alignSelf:'center'}}>
                    </Ionicons>
                </View>
                <View style={styles.optionTextWrapper}>
                    <Text style={styles.unblockedText}>Viagens</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.optionWrapper}>
                <View style={styles.optionIconWrapper}>
                    <Ionicons
                    name={'md-document'}
                    size={responsiveWidth(8)}
                    color={'lightgrey'}
                    style={{alignSelf:'center'}}>
                    </Ionicons>
                </View>
                <View style={styles.optionTextWrapper}>
                    <Text style={styles.blockedText}>Documentos</Text>
                </View>
            </View>
            <View style={styles.optionWrapper}>
                <View style={styles.optionIconWrapper}>
                    <Ionicons
                    name={'md-pricetags'}
                    size={responsiveWidth(8)}
                    color={'lightgrey'}
                    style={{alignSelf:'center'}}>
                    </Ionicons>
                </View>
                <View style={styles.optionTextWrapper}>
                    <Text style={styles.blockedText}>Descontos</Text>
                </View>
            </View>
            <View style={styles.optionWrapper}>
                <View style={styles.optionIconWrapper}>
                    <Ionicons
                    name={'md-people'}
                    size={responsiveWidth(8)}
                    color={'lightgrey'}
                    style={{alignSelf:'center'}}>
                    </Ionicons>
                </View>
                <View style={styles.optionTextWrapper}>
                    <Text style={styles.blockedText}>Controlo Parental</Text>
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
    profileDescription:{
        width: width * 0.6, 
        height: height * 0.1, 
        alignItems:'flex-start', 
        justifyContent:'center'
    },
    profileName:{
        width: width * 0.3, 
        fontSize: responsiveFontSize(2,5), 
        fontWeight: 'bold'
    }, 
    profileSecondaryAttribute:{
        fontSize: responsiveFontSize(2)
    },
    hrLine:{
        width: width * 0.9, 
        alignSelf:'flex-start',
        borderBottomColor: 'lightgrey', 
        borderBottomWidth: 1, 
        marginLeft: width * 0.02
    },
    closeIconWrapper:{
        width: width * 0.2,
        height: height * 0.1, 
        alignItems:'center', 
        justifyContent:'center'
    },
    closeStyle: {
        width: width * 0.1,
    },
    profileWrapper:{
        width: width, 
        height: height * 0.1, 
        flexDirection:'row'
    },  
    optionWrapper:{
        width: width, 
        height: height * 0.07, 
        flexDirection:'row'
    },
    optionIconWrapper:{
        width: width * 0.2, 
        height: height * 0.07, 
        justifyContent:'center'
    },
    optionTextWrapper:{
        width: width * 0.8, 
        height: height * 0.07, 
        justifyContent:'center'
    },
    blockedText:{
        fontSize: responsiveFontSize(2), color:'lightgrey'
    },
    unblockedText:{
        fontSize: responsiveFontSize(2)
    }
})