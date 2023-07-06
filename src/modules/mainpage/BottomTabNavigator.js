import { View } from 'react-native'
import Icon from 'react-native-vector-icons/dist/AntDesign';
import History from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import User from './User';
import Item from './Item';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();


const BottomTabNavigator = () => {
    const [showOrderScreenCount, setshowOrderScreenCount] = useState(0)
    const init = async () => {
        try {
            let checkArrayLength = await AsyncStorage.getItem('OrderArray')
            if (checkArrayLength) {
                checkArrayLength = JSON.parse(checkArrayLength)
                if (checkArrayLength.length > 0) {
                    setshowOrderScreenCount(checkArrayLength.length)
                }

            }

        } catch (error) {
            console.log("🚀 ~error:", error)

        }
    }
    useEffect(() => {
        init()
    })
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}  >
            <Tab.Screen name="Home" component={Home}

                options={{
                    tabBarLabel: '',
                    tabBarIcon: tabInfo => {
                        return tabInfo.focused ? (
                            <View
                                style={{
                                    height: 50,
                                    width: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    borderColor: 'blue',
                                    borderWidth: 2,
                                    borderRadius: 30,
                                    top: -8,
                                    elevation: 5,
                                }}>
                                <Icon name="home" color={'blue'} size={28} />
                            </View>
                        ) : (
                            <Icon name="home" size={28} color={'blue'} />
                        );
                    },
                }}
            />
            <Tab.Screen name="User" component={User} options={{
                tabBarLabel: '',
                tabBarIcon: tabInfo => {
                    return tabInfo.focused ? (
                        <View
                            style={{
                                height: 50,
                                width: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                borderColor: 'blue',
                                borderWidth: 2,
                                borderRadius: 30,
                                top: -8,
                                elevation: 5,
                            }}>
                            <Icon name="user" color={'blue'} size={28} />
                        </View>
                    ) : (
                        <Icon name="user" size={28} color={'blue'} />
                    );
                },
            }} />
            <Tab.Screen name="Items" component={Item} options={{
                tabBarLabel: '',
                tabBarIcon: tabInfo => {
                    return tabInfo.focused ? (
                        <View
                            style={{
                                height: 50,
                                width: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                borderColor: 'blue',
                                borderWidth: 2,
                                borderRadius: 30,
                                top: -8,
                                elevation: 5,
                            }}>
                            <History name="history" color={'blue'} size={28} />
                        </View>
                    ) : (
                        <History name="history" size={28} color={'blue'} />
                    );
                },
            }} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator
