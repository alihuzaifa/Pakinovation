import { View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Icon from 'react-native-vector-icons/AntDesign';
import style from '../style';
import ModalFunc from './Modal';

export default function Header() {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <View
                style={{
                    marginTop: responsiveHeight(5),
                    flexDirection: 'row',
                    paddingHorizontal: responsiveWidth(4),
                    justifyContent: 'center', alignItems: "center"
                }}>
                <View style={[style.inputContainer, { backgroundColor: "#f1f1f1" }]}>
                    <Icon name="search1" size={responsiveWidth(6)} color={'blue'} />
                    <TextInput
                        style={{ flex: 1, fontSize: responsiveFontSize(2.3), marginLeft: responsiveWidth(3), fontFamily: "Poppins-Regular", marginTop: responsiveHeight(1) }}
                        placeholder="Search"
                        placeholderTextColor={'blue'}

                    />
                </View>
                <TouchableOpacity style={{ backgroundColor: "blue", paddingHorizontal: responsiveWidth(1.6), justifyContent: 'center', alignItems: 'center', borderRadius: responsiveWidth(2.7), paddingVertical: responsiveHeight(0.2), height: responsiveHeight(4.4), marginLeft: responsiveWidth(3) }} onPress={() => { setVisible(true) }}>

                    <Icon name="menufold" size={responsiveWidth(5)} color={'white'} />
                </TouchableOpacity>
            </View>
            <ModalFunc visible={visible} setVisble={setVisible} />
        </>
    )
}