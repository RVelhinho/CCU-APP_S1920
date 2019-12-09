import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
} from 'react-native';

import {
    responsiveWidth
} from "react-native-responsive-dimensions";
import Svg, { Path } from 'react-native-svg'

const { width, height } = Dimensions.get('screen')

export default function BottomNavigator(props) {
    const SvgComponent = props => (
        <Svg viewBox="0 842.3 1080 236.7" {...props}>
          <Path
            d="M388.6 844.9c4.4 81.3 72.8 145.6 153.9 145 80.7-.6 147.9-65.2 151.7-146.1 176.4 0 352.7-.2 529.1-.5 143.2-.2 286.4-.6 429.5-1v260.9H-560.8V842.3c144.1-.1 288.3 0 432.4.3 172.4.5 344.7 1.2 517 2.3z"
            fill="#fff"
          />
        </Svg>
      )
    const component = SvgComponent({width: width , height: height * 0.08, position:'absolute', bottom:0})
    return(
        <View>
            {component}
            <View style={styles.circleAlignmentBar}>
                    <TouchableOpacity onPress={props.onNavigate} style={styles.circle}>
                        <Ionicons
                            name={'md-wifi'}
                            size={responsiveWidth(12)}
                            color={'black'}>
                        </Ionicons>
                    </TouchableOpacity>
            </View>
            <View style={styles.iconsAlignmentBar}>
                <TouchableOpacity onPress={props.onMenuPress} style={styles.menuWrapper}>
                    <Ionicons
                        name={'md-menu'}
                        size={responsiveWidth(8)}
                        color={'black'}>
                    </Ionicons>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.onSettingsPress} style={styles.settingsWrapper}>
                    <Ionicons
                        name={'md-more'}
                        size={responsiveWidth(8)}
                        color={'black'}>
                    </Ionicons>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    circleAlignmentBar:{
        position: "absolute", 
        width: width, 
        height: height * 0.08, 
        alignItems: 'center', 
        bottom: 0, 
        marginBottom: height * 0.045,
    },
    circle:{
        width: height * 0.09, 
        height: height * 0.09, 
        borderRadius: (height * 0.09) / 2, 
        backgroundColor: 'white', 
        alignItems: 'center', 
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    iconsAlignmentBar:{
        position: "absolute",
        backgroundColor: 'rgba(52, 52, 52, 0)', 
        flexDirection: 'row', 
        width: width,
        height: height * 0.08, 
        bottom: 0 ,
    },
    menuWrapper:{
        width: width * 0.33, 
        height: height * 0.08, 
        alignItems: 'flex-start', 
        justifyContent: 'center', 
        paddingLeft: width * 0.05
    },
    settingsWrapper:{
        width: width * 0.33, 
        height: height * 0.08, 
        alignItems: 'flex-end', 
        justifyContent: 'center', 
        marginLeft: width * 0.33, 
        paddingRight: width * 0.05
    }
})