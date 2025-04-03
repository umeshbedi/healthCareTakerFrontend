import AnimatedLottieView from 'lottie-react-native'

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function HomeLoader() {
  return (
    <View style={[{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.3)',
        zIndex: 1
      }]}>
        <AnimatedLottieView
          source={require('./home animation.json')}
          autoPlay
          loop
        />
      </View>
  )
}
