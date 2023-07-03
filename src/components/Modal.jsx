import { View, TouchableOpacity } from 'react-native'
import React from 'react';
import Modal from "react-native-modal";
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Entypo'
const WrapperComponent = ({ visible, setVisble }) => {
    return (
        <View>
            <Modal isVisible={visible} style={{ width: "100%", marginLeft: 0, marginBottom: 0 }} onTouchCancel={false} onBackdropPress={() => false}>
                <View style={{ flex: 1, position: "absolute", bottom: 0, height: responsiveHeight(50), backgroundColor: "#fff", width: "100%",borderTopLeftRadius:responsiveWidth(5),borderTopRightRadius:responsiveWidth(5) }}>
                    <TouchableOpacity onPress={() => { setVisble(false) }} style={{ padding: responsiveWidth(2.5), justifyContent: "flex-end", alignItems: "flex-end" }}>
                        <Icon name="cross" size={responsiveWidth(7)} color={'blue'} />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View >
    )
}

export default WrapperComponent