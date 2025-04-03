import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Linking } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation, NavigationProp, useTheme } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScreenList } from '../utils/screens'
import axios from 'axios'


export default function ChatBot(props: any) {
    const { navigate } = useNavigation<NavigationProp<ScreenList>>()
    const { colors } = useTheme()

    const [userText, setUserText] = useState("")

    const [response, setResponse] = useState<any>({})

    const [chatBox, setChatBox] = useState([])

    const scrollViewRef = useRef<any>(0);

    // let chatBox = []
    function onSend({ isUser = false, text = "" }) {
        const tempChat = [...chatBox]
        // tempChat.append()
        tempChat.push({ text, isUser })
        setChatBox(tempChat)
        axios.get(`http://192.168.198.1:5000/detect?symptoms=${text}`)
            .then((e) => setResponse(e.data))
    }

    function Chat({ isUser = false, text = "", disease = "", status = "", prevention = "", accuracy="" }) {
        return (
            <View className={`w-full flex-row ${isUser ? 'justify-end' : 'justify-start'} mb-5`}>
                <View className={`max-w-[80%] gap-2 ${isUser ? 'bg-emerald-200 rounded-bl-3xl items-end' : ' bg-rose-100 rounded-br-3xl items-start'} p-3 rounded-t-3xl`}>
                    {text == "" ?
                        (
                            <Text className='w-fit'>
                                <Text className='font-bold'>Detected Disease (Accuracy: {accuracy}%) : </Text>{disease}{`\n\n`}
                                <Text className='font-bold'>First Aid and Home Remedies: </Text>{prevention}
                            </Text>)
                        :
                        (<Text className='w-fit'>{text}</Text>)
                    }


                    {status == "success" &&
                        <TouchableOpacity className='bg-teal-500 p-3 mb-3 rounded-3xl'
                            onPress={async () => await Linking.openURL(`https://www.google.com/search?q=doctors to cure ${disease} disease near me`)}
                        >
                            <Text className='text-white'>Click to contact nearby Doctor</Text>
                        </TouchableOpacity>
                    }

                    <View className='w-[40px] h-[40px] p-2 mt-3 bg-white rounded-full overflow-hidden'>
                        <Image source={isUser ? require(`../assets/user.png`) : require(`../assets/chatbot.png`)} className=' w-full h-full' resizeMode='cover' />
                    </View>


                </View>


            </View>
        )
    }

    useEffect(() => {
        if (chatBox.length == 0) {
            setChatBox([
                { isUser: false, text: `Welcome to Doctor AI Assistant! Please share your symptoms with me, and I’ll do my best to guide you with disease name and it's prevention.` }
            ])

        } else {
            const tempChat = [...chatBox]
            if (response.status == "success") {
                tempChat.push({accuracy:response.accuracy, text: "", prevention: response.prevention, isUser: false, disease: response.disease, status: response.status })
            } else {
                tempChat.push({ text: response.message, isUser: false, disease: response.disease, status: response.status })
            }

            setChatBox(tempChat)
            scrollViewRef.current.scrollToEnd({ animated: true })
        }
    }, [response])

    return (
        <SafeAreaView className='flex-1'>

            <View className='h-full relative'>
                <Header name='AI Doctor Assistent' iconPress={() => props.navigation.openDrawer()} />

                <ScrollView ref={scrollViewRef} className=' px-4 mb-10' style={{ backgroundColor: colors.background }}>
                    {chatBox.length != 0 && chatBox.map((item: any, i) => (
                        <Chat key={i} isUser={item.isUser} text={item.text} status={item.status} disease={item.disease} prevention={item.prevention} accuracy={item.accuracy}/>
                    ))}

                </ScrollView>


                <View className='items-center justify-center w-full bottom-5'>
                    <View className='flex-row border items-center justify-center p-1 gap-3 w-[80%] bg-white rounded-3xl'>
                        <TextInput placeholder='Enter your symptoms' multiline className='w-44' onChangeText={(e: any) => setUserText(e)} />
                        <TouchableOpacity className='flex-row justify-center items-center px-5 py-3 rounded-full mt-4'
                            style={{ backgroundColor: colors.primary }} onPress={() => onSend({ isUser: true, text: userText })}>
                            <Text className='text-white'>Send <MaterialCommunityIcons name={"send"} /></Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})