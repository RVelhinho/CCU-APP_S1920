import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator} from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import ValidationScreen from '../screens/ValidationScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Validation: ValidationScreen,
  },
  {
    initalRouteName: 'Home',
  }
);

/*HomeStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-pin${focused ? '' : '-outline'}`
          : 'md-pin'
      }
    />
  ),
};

HomeStack.path = '';

const SensorStack = createStackNavigator(
  {
    Sensor: LinksScreen,
  },
  config
);

SensorStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-wifi' : 'md-wifi'} />
  ),
};

SensorStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  PositionStack,
  SensorStack,
  SettingsStack,
},
{
  tabBarOptions: {showLabel: false}
});

tabNavigator.path = '';*/

export default HomeStack;
