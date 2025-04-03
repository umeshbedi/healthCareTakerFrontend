import AnimatedLottieView from 'lottie-react-native'

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Loading() {
  return (
    <View style={[StyleSheet.absoluteFillObject, {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.3)',
        zIndex: 1
      }]}>
        <AnimatedLottieView
          source={require('./loading lottie.json')}
          autoPlay
          loop
        />
      </View>
  )
}
