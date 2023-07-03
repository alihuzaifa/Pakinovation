import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Button({ children, onClick }) {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#90EE90',
                height: 50,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                borderRadius: 18
            }}
            onPress={onClick}
       
        >

            <Text style={{
                color: '#fff', fontFamily: "Poppins-Bold",
                fontSize: 15
            }}>{children ||
                ''}</Text>
        </TouchableOpacity>
    )
}