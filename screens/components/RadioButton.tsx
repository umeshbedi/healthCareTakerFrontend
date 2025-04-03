import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'

type radioType = {
    handleSelectOption?: () => void,
    text?: string,
    toSelect?: string,
    selected?: string
}
export default function RadioButton({ handleSelectOption, text="Option", toSelect="ok", selected="no" }: radioType) {
    const {colors} = useTheme()
    return (
        <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={handleSelectOption}
        >
            <View className=' w-6 h-6 mr-2 rounded-full border-2' style={{ borderColor: toSelect == selected ? colors.primary : colors.text}}>
                {toSelect == selected && <View style={{ flex: 1, backgroundColor: colors.primary, borderRadius: 10 }} />}
            </View>
            <Text>{text}</Text>
        </TouchableOpacity>

    )
}
