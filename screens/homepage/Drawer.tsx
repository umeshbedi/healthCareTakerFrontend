import { ImageBackground, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer'
import Home from './Home'
import Feather from 'react-native-vector-icons/Feather'
import { NavigationProp, useNavigation, useTheme } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import { customColors } from '../../utils/ColorTheme'
import { ShareApp } from '../../utils/globalvar'
import { useAuth } from '../context/MyContext'
import { ScreenList } from '../../utils/screens'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DrawerNav = createDrawerNavigator()

export default function MyDrawer(props: any) {
    const { colors } = useTheme()
    

    const { navigate, reset } = useNavigation<NavigationProp<ScreenList>>()

    type SideType = {
        Icon?: string;
        onPress?: () => void;
        Title?: string
    }
    function Sidebar({ Icon = "", onPress, Title }: SideType) {
        return (
            <>
                <TouchableOpacity onPress={onPress} className='flex-row items-center mb-2'>
                    <Feather name={Icon} size={20} color={"white"} />
                    <Text className='text-white ml-3'>{Title}</Text>
                </TouchableOpacity>
                <View className=' h-[2] mb-5' style={{ backgroundColor: colors.notification }}></View>
            </>
        )
    }


    function MyCustomDrawer(props: any) {
        return (
            <DrawerContentScrollView {...props}>
                <LinearGradient colors={[customColors.lightGreen, customColors.lightOrange]} useAngle angle={180} className='px-8 py-7 h-screen mt-[-5]'>
                    <View className=' h-44 justify-center items-center'>
                        <View className=' h-16 w-16 bg-white rounded-full justify-center items-center'>
                            <Feather name='user' size={30} />
                        </View>
                        
                    </View>

                    

                    <Sidebar Icon={'star'} Title={'Rate this app'}
                        onPress={async () => await Linking.openURL("https://play.google.com/store/apps")}
                    />
                    <Sidebar Icon={'share-2'} Title={'Share this app'}
                        onPress={ShareApp}
                    />
                    <Sidebar Icon={'log-out'} Title={'Log Out'}
                        onPress={() => {
                            AsyncStorage.clear()
                                .then(e => {
                                    navigate("Login")
                                    reset({
                                        index: 0,
                                        routes: [{ name: "Login" }]
                                    })
                                })
                        }}
                    />

                </LinearGradient>
            </DrawerContentScrollView>

        )
    }


    return (
        <DrawerNav.Navigator
            drawerContent={MyCustomDrawer}
            screenOptions={{
                headerShown: false,
                drawerType: 'back',

            }}>

            <DrawerNav.Screen name="Home" component={Home} />

        </DrawerNav.Navigator>
    )
}

const styles = StyleSheet.create({})