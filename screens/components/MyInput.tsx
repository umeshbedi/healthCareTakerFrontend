import { TextInput } from "react-native"
import React from "react"

type inputType = {
    placeholder?: string | "add placeholder",
    password?: boolean | undefined;
    onChange?: ((e: string) => void) | undefined;
    keyboardType?: any | undefined
    defaultValue?: any | undefined
    editable?:boolean
}


export default function MyInput({ placeholder, password = false, onChange, keyboardType, defaultValue , editable}: inputType) {
    return (<TextInput
        defaultValue={defaultValue}
        keyboardType={keyboardType}
        secureTextEntry={password}
        placeholder={placeholder}
        className='border border-gray-200 rounded-xl p-4 mb-3'
        onChangeText={onChange}
        editable={editable}
        
    />)
}