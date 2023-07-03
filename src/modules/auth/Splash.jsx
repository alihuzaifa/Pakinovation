import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Splash = ({ navigation }) => {
    const moveUserToScreen = async () => {
        let token = await AsyncStorage.getItem('token')
        if (token) {
            navigation.replace('Main')
        } else {
            navigation.replace('Login')
        }
    }
    useEffect(() => {
        moveUserToScreen()
    }, [])
    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#75E6DA' }} >
            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: responsiveFontSize(5), color: 'white' }} >Welcome To</Text>
            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: responsiveFontSize(4), color: 'white' }} >Pakinovation</Text>
        </View>
    )
}
export default Splash