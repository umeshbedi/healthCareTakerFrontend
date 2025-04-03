import React, { useEffect, useState } from 'react';

import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import { colorTheme } from './utils/ColorTheme';

import QRScannerScreen from './screens/QRscan';
import MyDrawer from './screens/homepage/Drawer';
import { AuthProvider } from './screens/context/MyContext';

import ChatBot from './screens/chatBot';
import SeasonHealth from './screens/SeasonHealth';

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

export default function App() {

  const isDarkMode = useColorScheme() === 'dark';

  const { colors } = useTheme()

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={"#2e4f46"}
      />
      <AuthProvider>
        <NavigationContainer theme={colorTheme.light}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name='Drawer' component={MyDrawer} />
            {/* <Stack.Screen name='Home' component={Home} /> */}
            <Stack.Screen name='ChatBot' component={ChatBot} />
            <Stack.Screen name='QRScannerScreen' component={QRScannerScreen} />
            <Stack.Screen name='SeasonHealth' component={SeasonHealth} />
          </Stack.Navigator>

        </NavigationContainer>
      </AuthProvider>
    </>
  );
}




