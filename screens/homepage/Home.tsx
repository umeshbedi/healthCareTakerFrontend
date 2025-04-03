import { useFocusEffect, useTheme, useIsFocused, useNavigation, NavigationProp } from '@react-navigation/native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Image, SafeAreaView, ScrollView, Text, ToastAndroid, View } from 'react-native'
import Header from '../components/Header'

import { TouchableOpacity } from 'react-native'
import { ScreenList } from '../../utils/screens'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LinearGradient from 'react-native-linear-gradient'
import { customColors } from '../../utils/ColorTheme'


export default function Home(props: any) {
  const { colors } = useTheme()
  const [focus, setFocus] = useState(true)

  const isFocused = useIsFocused()
  const { navigate } = useNavigation<NavigationProp<ScreenList>>()


  const cards = [
    { icon: require("../../assets/chatbot.png"), leftGr: "#86A7F5", rightGr: "#F5EA93", text: "AI Doctor", onclick:()=>navigate("ChatBot") },
    { icon: require("../../assets/computer-vision.png"), leftGr: "#F2958D", rightGr: "#F5EA93", text: "Detect by Image", onclick:()=>navigate("QRScannerScreen") },
    { icon: require("../../assets/sunrise.png"), leftGr: "#B871BD", rightGr: "#F5EA93", text: "Health in Season", onclick:()=>navigate("SeasonHealth") },
    { icon: require("../../assets/help.png"), leftGr: "#86A7F5", rightGr: "#F5EA93", text: "Contact Us", onclick:()=>navigate("SeasonHealth") }
  ]


  return (
    <SafeAreaView className='flex-1'>

      <View className='h-full relative'>
        <Header name='AI Health Care Taker' iconPress={() => props.navigation.openDrawer()} />

        <ScrollView className=' px-4' style={{ backgroundColor: colors.background }}>

          <LinearGradient colors={[customColors.lightGreen, customColors.lightOrange]} className=' h-[300px] bg-slate-700 justify-center items-center rounded-2xl overflow-hidden mb-10 mt-5' useAngle angle={45}>
            <Image source={require("../../assets/healthAiImage.jpeg")} className=' w-full h-full' resizeMode='cover' />
          </LinearGradient>



          <View className='flex flex-row flex-wrap gap-4 justify-center'>
            {cards.map((item, i) => (
              <View className=' items-center' key={i}>
                <TouchableOpacity onPress={item.onclick}>
                  <LinearGradient  colors={[item.leftGr, item.rightGr]} className=' h-[180px] w-[180px] bg-slate-700 justify-center items-center p-8 rounded-2xl overflow-hidden' useAngle angle={45}>
                    <Image source={item.icon} className=' w-full h-full' resizeMode='cover' />
                  </LinearGradient>
                </TouchableOpacity>

                <Text>{item.text}</Text>
              </View>
            ))}

          </View>


        </ScrollView>

        <View className='absolute items-center justify-center w-full bottom-5'>
          {/* <TouchableOpacity className='flex-row justify-center items-center px-5 py-3 rounded-full mt-4' style={{ backgroundColor: colors.primary }} onPress={() => navigate("QRScannerScreen", { balance: userData.balance, uid: userData._id })}>
              <Text className='text-white'><MaterialCommunityIcons name={"qrcode-scan"} /> Scan</Text>
            </TouchableOpacity> */}
        </View>

      </View>

    </SafeAreaView>
  )
}
