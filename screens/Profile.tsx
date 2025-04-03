import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import MyInput from './components/MyInput'
import { useAuth } from './context/MyContext'
import { NavigationProp, useNavigation, useTheme } from '@react-navigation/native'
import axios from 'axios'
import Loading from './components/lottie/Loading'
import { apiUrl } from '../utils/globalvar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScreenList } from '../utils/screens'
import Feather from 'react-native-vector-icons/Feather'

export default function Profile() {
    const [isLoading, setIsLoading] = useState(false)
    const { uData } = useAuth()
    const { colors } = useTheme()
    const [Name, setName] = useState("")
    const [upiID, setUpiID] = useState("")
    const {reset, navigate} = useNavigation<NavigationProp<ScreenList>>()
    const [isVisible, setIsVisible] = useState(false)


    useEffect(()=>{
        if(uData!=null){
            setUpiID(uData.upi)
            setName(uData.name)
        }
    },[uData])

    async function handleUpdate() {
        setIsLoading(true)
        await axios.request({
            method: "PUT",
            url: apiUrl + "users/" + uData._id,
            data: { name: Name, upi: upiID }
        })
            .then(res => {
                ToastAndroid.show("User has been updated", ToastAndroid.SHORT)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                ToastAndroid.show(err, ToastAndroid.SHORT)
                setIsLoading(false)
            })
    }

    async function handleDelete() {
        setIsLoading(true)
        await axios.request({
            method: "DELETE",
            url: apiUrl + "users/" + uData._id,

        })
            .then(res => {
                ToastAndroid.show("User has been deleted", ToastAndroid.SHORT)
                AsyncStorage.clear()
                navigate("Login")
                reset({
                    index: 0,
                    routes: [{ name: "Login" }]
                })
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                ToastAndroid.show(err, ToastAndroid.SHORT)
                setIsLoading(false)
            })
    }

    // console.log(uData._id, Name, upiID)

    return (
        <SafeAreaView className='flex-1'>
            <Header back name='Update Profile' />
            {uData != null &&
                <View className='flex-1 justify-between p-6'>

                    <ScrollView className='flex-1'>
                        <MyInput editable={false} defaultValue={uData.email} placeholder='Email Address' />
                        <MyInput defaultValue={uData.name} placeholder='Enter Name' onChange={(e) => setName(e)} />
                        <MyInput defaultValue={uData.upi} placeholder='UPI ID' onChange={(e) => setUpiID(e)} />

                        <TouchableOpacity className='flex-row justify-center items-center px-5 py-3 rounded-full mt-4' style={{ backgroundColor: colors.primary }} onPress={handleUpdate}>
                            <Text className='text-white'>Update Profile</Text>
                        </TouchableOpacity>


                        <TouchableOpacity className='flex-row justify-center bg-gray-400 items-center px-5 py-3 mt-9 rounded-full' onPress={()=>setIsVisible(true)}>
                            <Text className=' text-gray-900'>Delete Account</Text>
                        </TouchableOpacity>
                    </ScrollView>


                </View>
            }

            {isLoading && <Loading />}

            <Modal
                visible={isVisible}
                transparent
                animationType='fade'

            >
                <View className='flex-1 justify-center items-center p-6' style={{ backgroundColor: "rgba(0,0,0,.5)" }}>
                    <View className=' rounded-xl bg-white p-6 w-full relative'>

                        <TouchableOpacity onPress={() => setIsVisible(false)} className=' absolute right-5 top-5 p-1 rounded-full' style={{ backgroundColor: colors.notification }}>
                            <Feather name='x' size={20} color={"white"} />
                        </TouchableOpacity>

                        <View style={{ gap: 20 }}>
                            <Text className=' text-lg font-bold' style={{ color: colors.text }}>Warning!</Text>
                            <Text>Are you sure want to delete your account? All the data will be deleted.</Text>
                            
                            <TouchableOpacity className='flex-row items-center mt-3 px-5 py-4 rounded-full justify-center' style={{ backgroundColor: colors.primary }} onPress={handleDelete}>
                                <Text className='text-white'>Yes, Delete!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})