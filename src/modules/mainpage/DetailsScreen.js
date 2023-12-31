import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { setLoad } from '../../redux';
import { useDispatch } from 'react-redux';
const DetailsScreen = ({ navigation, route }) => {
    const [item, setitem] = useState(route.params);
    const [load, setload] = useState(false);
    const dispatch = useDispatch()
    const storeData = async () => {
        try {
            setload(true)
            let storeArray = []
            let DealCustID = await AsyncStorage.getItem('DealCustID');
            let DealArray = await AsyncStorage.getItem('OrderArray');
            DealCustID = JSON.parse(DealCustID)
            if (DealArray) {
                storeArray = JSON.parse(DealArray)
                const storeObj = {
                    type: "add_new",
                    DealCustID: DealCustID,
                    Date: new Date().toDateString(),
                    UserID: 1,
                    id: new Date().getTime(),
                    details: [
                        {
                            "ProdID": item?.ProdID,
                            "Price": item?.isBox ? (item?.price * 12).toFixed(2) : item.price,
                            "Pieces": item?.isPacket ? item?.packet : 0,
                            "Boxes": item?.isBox ? item?.box : 0,
                            "id": new Date().getTime(),
                            "name": item.name,
                            "actualPrice": item?.actualPrice
                        },
                    ]
                }
                storeArray.push(storeObj);
                storeArray = JSON.stringify(storeArray)
                await AsyncStorage.setItem('OrderArray', storeArray);
                dispatch(setLoad())
                setload(false)
                navigation.goBack()
            } else {
                const storeObj = {
                    type: "add_new",
                    DealCustID: DealCustID,
                    Date: new Date().toDateString(),
                    UserID: 1,
                    id: new Date().getTime(),
                    details: [
                        {
                            "ProdID": item?.ProdID,
                            "Price": item?.isBox ? (item?.price * 12).toFixed(2) : item.price,
                            "Pieces": item?.isPacket ? item?.packet : 0,
                            "Boxes": item?.isBox ? item?.box : 0,
                            "name": item.name,
                            "id": new Date().getTime(),
                            "actualPrice": item?.actualPrice
                        },


                    ]
                }
                storeArray.push(storeObj);
                storeArray = JSON.stringify(storeArray)
                await AsyncStorage.setItem('OrderArray', storeArray);
                setload(false)
                navigation.goBack()
            }
        } catch (error) {
            setload(false)
        }
        setload(false)
    }
    const changeBoxes = () => {
        const updatedItem = {
            ...item,
            isBox: false,
            isPacket: true, packet: 1, price: item?.actualPrice
        };
        setitem(updatedItem);

    }
    const changePacket = () => {
        const updatedItem = {
            ...item,
            isBox: true,
            isPacket: false, box: 1, price: item?.actualPrice
        };
        setitem(updatedItem);

    }
    const increaseQty = () => {
        if (item.isBox) {
            const updatedItem = {
                ...item, box: item?.box + 1,
            };
            const increasePrice = { ...updatedItem, price: Number(updatedItem?.box * updatedItem.actualPrice).toFixed(2) }
            setitem(increasePrice)
        } else {
            const updatedItem = {
                ...item, packet: item?.packet + 1,
            };
            const increasePrice = { ...updatedItem, price: Number(updatedItem?.packet * updatedItem.actualPrice).toFixed(2) }
            setitem(increasePrice)
        }

    }
    const decreaseQty = () => {
        if (item.isBox) {
            if (item?.box > 1) {
                const updatedItem = {
                    ...item, box: item?.box - 1,
                };
                const increasePrice = { ...updatedItem, price: Number(updatedItem?.price - updatedItem.actualPrice).toFixed(2) }
                setitem(increasePrice)
            }
        } else {
            if (item?.packet > 1) {
                const updatedItem = {
                    ...item, packet: item?.packet - 1,
                };
                const increasePrice = { ...updatedItem, price: Number(updatedItem?.price - updatedItem.actualPrice).toFixed(2) }
                setitem(increasePrice)
            }
        }

    }
    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} color={'blue'} onPress={navigation.goBack} />
                <Text style={{ fontSize: 20, fontFamily: "Poppins-Bold", color: "gray" }}>Details</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[style.details, { height: responsiveHeight(90) }]}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{ fontSize: responsiveFontSize(2.8), fontFamily: "Poppins-Bold", color: '#fff' }}>
                            {item.name}
                        </Text>


                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{ fontSize: responsiveFontSize(3), fontFamily: "Poppins-Bold", color: '#fff' }}>
                            Price {item?.isBox ? (item?.actualPrice * 12).toFixed(2) : item?.actualPrice} /  {item?.isBox ? 'Boxes' : 'Packet'}
                        </Text>

                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[
                                style.btn,
                                {
                                    borderColor: '#fff',
                                    borderWidth: 1,
                                    backgroundColor: item?.isBox ? 'gray' : 'transparent',
                                },
                            ]}
                            onPress={changePacket}
                        >
                            <Text
                                style={{
                                    fontFamily: "Poppins-Bold",
                                    fontSize: responsiveFontSize(2),
                                    color: '#fff',
                                }}>
                                PACKET
                            </Text>
                        </TouchableOpacity>
                        <View style={{ width: responsiveWidth(4) }} />
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[
                                style.btn,
                                {
                                    borderColor: '#fff',
                                    borderWidth: 1,
                                    backgroundColor: item?.isBox ? 'transparent' : 'gray',
                                },
                            ]}
                            onPress={changeBoxes}
                        >
                            <Text
                                style={{
                                    fontFamily: "Poppins-Bold",
                                    fontSize: responsiveFontSize(2),
                                    color: '#fff',
                                }}>
                                BOXES
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginVertical: 10
                        }}>
                        <Text
                            style={{ fontSize: responsiveFontSize(3), fontFamily: "Poppins-Bold", color: '#fff' }}>
                            {item?.isBox ? 'Boxes' : 'Packet'} Quantity {item?.isBox ? item?.box : item?.packet}
                        </Text>


                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[
                                style.btn,
                                {
                                    borderColor: '#fff',
                                    borderWidth: 1,
                                    backgroundColor: 'transparent',
                                },
                            ]}
                            onPress={increaseQty}
                        >
                            <Text
                                style={{
                                    fontFamily: "Poppins-Bold",
                                    fontSize: responsiveFontSize(2),
                                    color: '#fff',
                                }}>
                                INCREASE
                            </Text>
                        </TouchableOpacity>
                        <View style={{ width: responsiveWidth(4) }} />
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[
                                style.btn,
                                {
                                    borderColor: '#fff',
                                    borderWidth: 1,
                                    backgroundColor: 'transparent',
                                },
                            ]}
                            onPress={decreaseQty}
                        >
                            <Text
                                style={{
                                    fontFamily: "Poppins-Bold",
                                    fontSize: responsiveFontSize(2),
                                    color: '#fff',
                                }}>
                                DECREASE
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.8} style={{ justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity style={{ ...style.btnContainer, backgroundColor: 'blue' }} onPress={() => {
                        storeData(item)
                    }} disabled={load}>
                        <Text style={{ ...style.title, color: '#fff' }} >{load ? <ActivityIndicator size="large" color="#fff" /> : 'Add To Cart'}</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView >
    );
};
const style = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    details: {
        paddingHorizontal: responsiveWidth(5),
        paddingTop: responsiveHeight(5),
        backgroundColor: '#90EE90',
        borderTopRightRadius: responsiveWidth(10),
        borderTopLeftRadius: responsiveWidth(10),

    },
    title: {
        color: '#fff', fontFamily: 'Poppins-SemiBold', fontSize: responsiveFontSize(2)
    },
    btnContainer: {
        backgroundColor: '#90EE90',
        height: responsiveHeight(7),
        borderRadius: responsiveWidth(10),
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        bottom: responsiveHeight(10),
        width: responsiveWidth(93)
    },
    btn: {
        flex: 1,
        backgroundColor: '#90EE90',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: responsiveWidth(4),
        paddingVertical: responsiveHeight(1.3)

    },
});
export default DetailsScreen;