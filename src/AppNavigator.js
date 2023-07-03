import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './modules/auth/Login';
import OnBoarding from './modules/onBoarding/OnBoarding';
import BottomTabNavigator from './modules/mainpage/BottomTabNavigator';
import DetailsScreen from './modules/mainpage/DetailsScreen';
import Product from './modules/mainpage/Product';
import Splash from './modules/auth/Splash';

const Stack = createNativeStackNavigator()

// hamesha auto save band karke use karna isko ji ji ,e bata raha tha
const AppNavigator = () => {
    return (
        // it is like browser router
        <NavigationContainer>
            {/* <StatusBar backgroundColor={'red'} /> */}
            {/* it is like routes */}
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#75E6DA" />
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name='Splash' component={Splash} />
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Main' component={BottomTabNavigator} />
                <Stack.Screen name='Product' component={Product} />
                <Stack.Screen name='DetailsScreen' component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator

const styles = StyleSheet.create({})