import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Image, Modal, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { useTheme, useNavigation, NavigationProp, useRoute, RouteProp } from '@react-navigation/native'
import Feather from "react-native-vector-icons/Feather"
import MyInput from './components/MyInput';
import { ScreenList } from '../utils/screens';
import axios from 'axios';



const QRScannerScreen = () => {

    const { hasPermission, requestPermission } = useCameraPermission()
    const [isVisible, setIsVisible] = useState(false)

    const [data, setData] = useState<any>([])

    const { navigate } = useNavigation<NavigationProp<ScreenList>>()
    const route = useRoute<RouteProp<ScreenList, "QRScannerScreen">>()


    const cameraRef = useRef(null);
    const [photo, setPhoto] = useState(null);
    const device = useCameraDevice('back')



    useEffect(() => {
        if (!hasPermission) {
            requestPermission()
        }
    }, [])



    function NoCameraDeviceError() {
        return (
            <View>
                <Text>No camera found. Ga back and try again.</Text>
            </View>
        )
    }

    const uploadImage = async (photoPath: any) => {

        setIsVisible(true)

        const formData = new FormData();
        formData.append('file', {
            uri: "file://" + photoPath,
            type: 'image/jpeg',
            name: 'photo.jpg',
        });

        try {
            const response = await fetch('http://192.168.114.102    :5000/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const responseData = await response.json();
            const temdata = []
            temdata.push(responseData)
            setData(temdata)

            
            

            // Alert.alert('Success', responseData.message);
        } catch (error: any) {
            setIsVisible(false)
            Alert.alert("something error")
            console.error('Upload error:', error);
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                // Request was made but no response received
                console.error('Request data:', error.request);
            } else {
                // Something happened in setting up the request
                console.error('Error message:', error.message);
            }
        }
    };

    // console.log(data)

    const takePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePhoto({
                flash: 'off', // optional, can be 'on', 'off', or 'auto'
            });
            setPhoto(photo.path);
            console.log(photo.path)
            uploadImage(photo.path)
        }
    };

    if (device == null) return <NoCameraDeviceError />

    return (
        <View style={styles.container}>
            <Camera
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo={true}  // Enables photo capture mode
            />
            <Button title="Take Photo" onPress={takePhoto} />
            {photo && (
                <View style={styles.preview}>
                    <Image source={{ uri: `file://${photo}` }} style={styles.image} />
                    {/* <Text>Photo Path: {photo}</Text> */}
                </View>
            )}

            <Modal
                visible={isVisible}
                transparent
            >

                <View className='flex-1 bg-[#1f1f1f3b] justify-center items-center'>
                    {data.length == 0 ? (
                        <View className='w-[80%] bg-white p-5 rounded-3xl'>
                            <Text>Loading...   Please wait.</Text>
                        </View>
                    )
                        :
                        (
                            <View className=' w-[80%] bg-white p-5 rounded-3xl'>
                                <Text className='text-base font-bold'>Disease Detected:</Text>
                                <Text className='text-lg'>{data[0].class}</Text>
                                <Text className='text-base font-bold'>Accuracy:</Text>
                                <Text className='text-lg mb-6'>{(Number(data[0].confidenceScore)*100).toFixed(2)}%</Text>
                                <Button title='close' color={"red"} onPress={()=>{setIsVisible(false);setData([])}}/>
                            </View>
                        )
                    }

                </View>

            </Modal>
        </View>

    );
};



export default QRScannerScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20
    },
    preview: {
        marginTop: 10,
    },
    image: {
        width: 200,
        height: 200,
    },
});