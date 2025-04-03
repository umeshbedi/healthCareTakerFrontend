import { Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { customColors } from '../../utils/ColorTheme'
import MyInput from '../components/MyInput'
import { SafeAreaView } from 'react-native'
import { useNavigation, useTheme, NavigationProp } from '@react-navigation/native'
import { apiUrl } from '../../utils/globalvar'
import axios from 'axios'
import { ScreenList } from '../../utils/screens'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../components/lottie/Loading'

export default function Login() {
    const { colors } = useTheme()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [loginLoading, setLoginLoading] = useState(false)

    const { navigate, reset } = useNavigation<NavigationProp<ScreenList>>()

    function GotoHome() {
        navigate("Drawer")
        reset({
            index: 0,
            routes: [{ name: "Drawer" }]
        })
    }

    async function handleLogin() {

        if (email == "" || password == "") return ToastAndroid.show("Email/Password should not be blank.", ToastAndroid.SHORT)
        setLoginLoading(true)
        await axios.request({
            method: "POST",
            url: apiUrl + "auth/login",
            data: { email, password }
        })
            .then(function (response) {
                const data = response.data
                console.log(data);
                AsyncStorage.setItem('user', JSON.stringify(data))
                ToastAndroid.show("Login Successful!", ToastAndroid.SHORT)
                GotoHome()
                setLoginLoading(false)
            })
            .catch(function (error) {
                console.error(error);
                if (error.response.status == 401) {
                    ToastAndroid.show("User not found.", ToastAndroid.LONG)
                }
                else if (error.response.status == 402) {
                    ToastAndroid.show("Incorrect Password", ToastAndroid.LONG)
                }
                else { ToastAndroid.show(error.message, ToastAndroid.LONG) }
                setLoginLoading(false)
            });
    }

    useEffect(() => {
        AsyncStorage.getItem("user", (err, res: any) => {
            if (res != null) { GotoHome() }else{setIsLoading(false)}
        })
    }, [])

    if(isLoading)return <Loading/>

    return (
        <SafeAreaView>
            <ScrollView>
                <LinearGradient colors={[customColors.lightGreen, customColors.lightOrange]} className=' h-[300px] bg-slate-700 justify-center items-center p-10' useAngle angle={90}>
                    <Image source={require("../../assets/sign_up.png")} className=' w-full h-full mt-[-30px]' resizeMode='contain' />
                </LinearGradient>

                <View className='h-full bg-gray-200 mt-[-50px]' style={{ borderTopEndRadius: 50, borderTopStartRadius: 50 }}>
                    <Text className=' text-center my-6 font-semibold text-lg text-gray-800'>Login to your account</Text>
                    <View className='flex-1 bg-white p-8' style={{ borderTopEndRadius: 50, borderTopStartRadius: 50 }}>

                        <MyInput placeholder='Email' onChange={(e) => setEmail(e)} />
                        <MyInput placeholder='Password' password onChange={(e) => setPassword(e)} />

                        <TouchableOpacity className='flex-row justify-center items-center px-5 py-4 mt-3 rounded-full' style={{ backgroundColor: colors.primary }} onPress={handleLogin}>
                            <Text className='text-white'>Login</Text>
                        </TouchableOpacity>
                        <Text className=' text-center mt-3'>Don't have an account? <Text style={{ color: colors.primary }} onPress={() => navigate("Register")}>Register here</Text></Text>

                    </View>
                </View>
            </ScrollView>

            {loginLoading&&<Loading/>}

        </SafeAreaView>
    )
}

