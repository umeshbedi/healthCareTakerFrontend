import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from './components/Header'
import MyInput from './components/MyInput'
import { ScrollView } from 'react-native'
import { useRoute, useTheme, RouteProp } from '@react-navigation/native'
import { ScreenList } from '../utils/screens'
import UpiMode from './paymentMode/UpiMode'
import BankMode from './paymentMode/BankMode'
import CardMode from './paymentMode/CardMode'
import RecentTx from './homepage/RecentTx'

export default function Expenses() {
    const { colors } = useTheme()
    const route = useRoute<RouteProp<ScreenList, "Expenses">>()
    const { data } = route.params
    
    return (
        <SafeAreaView className='flex-1 justify-between'>
            <Header back name='All Expenses' />
            <ScrollView className='h-full px-4'>
                <RecentTx showNo={0} pymentHistory={data}/>
            </ScrollView>
        </SafeAreaView>
    )
}
