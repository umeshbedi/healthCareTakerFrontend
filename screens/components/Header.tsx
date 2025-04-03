import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationProp, useNavigation, useTheme } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'
import { ScreenList } from '../../utils/screens'

export default function Header({ back = false, name = "", iconPress=()=>void(0) }) {
    const { colors } = useTheme()
    const {goBack} = useNavigation<NavigationProp<ScreenList>>()
    return (
        <View className='flex flex-row px-5 py-3 mb-2 justify-between items-center'>
            <View>
                {back
                ?
                (<Feather name='chevron-left' size={25} style={{ color: colors.text }} onPress={goBack}/>)
                :
                (<Feather name='menu' size={25} style={{ color: colors.text }} onPress={iconPress}/>)
                }
            </View>

            <View className=' items-center justify-center'>
                <Text style={{ color: colors.text }}>{name}</Text>
            </View>

            <View className='flex-row gap-5'>
                {!back &&
                    <>
                        <Feather name='bell' size={25} style={{ color: colors.text }} />
                        <Feather name='help-circle' size={25} style={{ color: colors.text }} />

                    </>
                }

            </View>
        </View>
    )
}

const styles = StyleSheet.create({})