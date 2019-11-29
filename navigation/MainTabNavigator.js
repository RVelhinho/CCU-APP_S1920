import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const PositionStack = createStackNavigator(
  {
    Position: HomeScreen,
  },
  config
);

PositionStack.navigationOptions = {
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

PositionStack.path = '';

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

tabNavigator.path = '';

export default tabNavigator;
