import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { WebView, WebViewNavigation } from 'react-native-webview';

export default function SeasonHealth() {
    const webViewRef = useRef<WebView>(null);
    function webChange(navstate: WebViewNavigation) {
        const { url } = navstate;
        
    }
    return (
        <WebView
            ref={webViewRef}
            source={{ uri: "https://andamancab.in/aihealthcare/html2.html" }} style={{ flex: 1 }}
            onNavigationStateChange={webChange}
        />
    )
}

const styles = StyleSheet.create({})