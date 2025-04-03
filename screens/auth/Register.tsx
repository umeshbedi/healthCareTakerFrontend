import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { customColors } from '../../utils/ColorTheme'
import MyInput from '../components/MyInput'
import { SafeAreaView } from 'react-native'
import { useNavigation, useTheme, NavigationProp } from '@react-navigation/native'
import { ScreenList } from '../../utils/screens'
import axios from 'axios'
import { apiUrl } from '../../utils/globalvar'
import Feather from 'react-native-vector-icons/Feather'
import Loading from '../components/lottie/Loading'

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [otpInput, setOtpInput] = useState(0)

    const [otpVisible, setOtpVisible] = useState(false)
    const [otp, setOtp] = useState(0)

    const [isLoading, setIsLoading] = useState(false)
    const { colors } = useTheme()
    const { navigate, reset } = useNavigation<NavigationProp<ScreenList>>()


    function Navigate() {
        navigate("Login")
        reset({
            index: 0,
            routes: [{ name: "Login" }]
        })
    }

    function generateOtp() {
        const min = 100000;
        const max = 999999;
        const temotp = Math.floor(Math.random() * (max - min + 1)) + min;
        setOtp(temotp)
        return temotp
    }

    async function sendOTP() {
        if (email == "" || password == "" || name == "") return ToastAndroid.show("All fields are required.", ToastAndroid.SHORT)

        const newOtp = generateOtp()
        setIsLoading(true)

        await axios.request({
            method: "POST",
            url: apiUrl + "auth/otpverify",
            data: { name, email, otp: newOtp }
        })
            .then(function (response) {
                setOtpVisible(true)
                setIsLoading(false)
            })
            .catch(function (error) {
                console.error(error);
                ToastAndroid.show(error.message, ToastAndroid.LONG)
                setIsLoading(false)
            });
    }

    function handleVerifyOtp() {
        if (otpInput == otp) {
            handleRegister()
        } else {
            ToastAndroid.show("Wrong OTP", ToastAndroid.SHORT)
        }
    }

    async function handleRegister() {

        await axios.request({
            method: "POST",
            url: apiUrl + "auth/register",
            data: { name, email, password }
        })
            .then(function (response) {
                console.log(response.data);
                ToastAndroid.show("Registration Successfull!", ToastAndroid.SHORT)
                Navigate()
            })
            .catch(function (error) {
                console.error(error);
                if (error.response.status == 405) {
                    ToastAndroid.show("User already exist.", ToastAndroid.LONG)
                } else {
                    ToastAndroid.show(error.message, ToastAndroid.LONG)
                }

            });
    }


    return (
        <SafeAreaView>
            <ScrollView>
                <LinearGradient colors={[customColors.lightGreen, customColors.lightOrange]} className=' h-[300px] bg-slate-700 justify-center items-center p-10' useAngle angle={90}>
                    <Image source={require("../../assets/sign_up.png")} className=' w-full h-full mt-[-30px]' resizeMode='contain' />
                </LinearGradient>

                <View className='h-full bg-gray-200 mt-[-50px]' style={{ borderTopEndRadius: 50, borderTopStartRadius: 50 }}>
                    <Text className=' text-center my-6 font-semibold text-lg'>Create New Account</Text>
                    <View className='flex-1 bg-white p-8' style={{ borderTopEndRadius: 50, borderTopStartRadius: 50 }}>
                        <MyInput placeholder='Name' onChange={(e) => setName(e)} />
                        <MyInput placeholder='Email' onChange={(e) => setEmail(e)} />
                        <MyInput placeholder='Password' password onChange={(e) => setPassword(e)} />

                        <TouchableOpacity className='flex-row items-center justify-center mt-3 px-5 py-4 rounded-full' style={{ backgroundColor: colors.primary }} onPress={sendOTP}>
                            <Text className='text-white'>Register</Text>
                        </TouchableOpacity>
                        <Text className=' text-center mt-3'>Already have an account? <Text style={{ color: colors.primary }} onPress={Navigate}>Login here</Text></Text>

                    </View>
                </View>
            </ScrollView>

            {/* OTP popup */}

            <Modal
                visible={otpVisible}
                transparent
                animationType='fade'

            >
                <View className='flex-1 justify-center items-center p-6' style={{ backgroundColor: "rgba(0,0,0,.5)" }}>
                    <View className=' rounded-xl bg-white p-6 w-full relative'>

                        <TouchableOpacity onPress={() => setOtpVisible(false)} className=' absolute right-5 top-5 p-1 rounded-full' style={{ backgroundColor: colors.notification }}>
                            <Feather name='x' size={20} color={"white"} />
                        </TouchableOpacity>

                        <View style={{ gap: 20 }}>
                            <Text className=' text-lg font-bold' style={{ color: colors.text }}>Verification Code</Text>
                            <Text>We have sent the Verification code to you email address.</Text>
                            <MyInput placeholder='Enter OTP' keyboardType='number-pad' onChange={(e) => setOtpInput(Number(e))} />

                            <TouchableOpacity className='flex-row items-center mt-3 px-5 py-4 rounded-full justify-center' style={{ backgroundColor: colors.primary }} onPress={handleVerifyOtp}>
                                <Text className='text-white'>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>


            {/* Loading Component */}
            {isLoading && <Loading />}


        </SafeAreaView>
    )
}
