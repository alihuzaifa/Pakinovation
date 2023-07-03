import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import Header from '../../components/Header';
import * as Animatable from 'react-native-animatable';

const Home = ({ navigation }) => {
    const [load, setLoad] = useState(false)
    const [pendingOrder, setPendingOrder] = useState([{ Barcode: "", "Category": "8", "Company_Code": "1", "Description": "", "Discount": "0", "Manufactor": "", "PCode": "111", "ProdID": "2", "name": "SALAZODINE EC TAB 10S ", "price": "92.51" },
    { Barcode: "", "Category": "8", "Company_Code": "1", "Description": "", "Discount": "0", "Manufactor": "", "PCode": "111", "ProdID": "2", "name": "SALAZODINE EC TAB 10S ", "price": "92.51" }, { Barcode: "", "Category": "8", "Company_Code": "1", "Description": "", "Discount": "0", "Manufactor": "", "PCode": "111", "ProdID": "2", "name": "SALAZODINE EC TAB 10S ", "price": "92.51" }, { Barcode: "", "Category": "8", "Company_Code": "1", "Description": "", "Discount": "0", "Manufactor": "", "PCode": "111", "ProdID": "2", "name": "SALAZODINE EC TAB 10S ", "price": "92.51" }])
    const CartCard = ({ item, index }) => {
        return (
            <>
                <Animatable.View
                    delay={index * 120} // delay for each item
                    animation="slideInDown" // animation type
                    key={index} >
                    <TouchableOpacity style={styles.cartCard}
                    // onPress={() => {
                    //     navigation.navigate('DetailsScreen', item)
                    // }}
                    >

                        <View
                            style={{
                                height: 100,
                                marginLeft: 10,
                                paddingVertical: 20,
                                flex: 1,
                            }}>
                            <Text style={{ fontFamily: "Poppins-Bold", fontSize: 16, color: 'gray' }}>
                                {item?.name}
                            </Text>
                            <Text style={{ fontSize: 17, color: 'gray', fontFamily: "Poppins-Bold" }}>
                                {/* Price {item?.price} */}
                                Status Pending
                            </Text>

                        </View>
                        {/* <TouchableOpacity onPress={() => { storeData(item, index) }}>
                            <Icon name="plus" size={responsiveWidth(7)} color={'blue'} />
                        </TouchableOpacity> */}
                    </TouchableOpacity>
                </Animatable.View>

            </>
        );
    };
    return (

        <>
            {
                load ? <SafeAreaView style={{
                    flex: 1,
                    backgroundColor: '#fff', justifyContent: "center", alignItems: "center"
                }}>
                    <ActivityIndicator size={'large'} color={'blue'} />
                </SafeAreaView> :
                    <SafeAreaView
                        style={{
                            flex: 1,
                            backgroundColor: '#fff',
                        }}>

                        <Header />



                        <View style={{
                            paddingHorizontal: responsiveWidth(4),
                            justifyContent: 'center', alignItems: "center"
                        }}>

                            <View style={{ width: responsiveWidth(91), height: responsiveHeight(25), justifyContent: "center", alignItems: "center", borderColor: 'black', borderWidth: 1, borderRadius: responsiveWidth(2.7), marginTop: responsiveHeight(3.5), borderColor: '#75E6DA' }}>

                            </View>
                        </View>

                        <Text
                            style={{
                                paddingHorizontal: responsiveWidth(4),
                                fontSize: responsiveFontSize(2.8),
                                fontFamily: "Poppins-SemiBold",
                                color: 'blue',
                                marginTop: responsiveHeight(1.8)
                            }}>
                            Pending Orders
                        </Text>

                        <ScrollView>
                            {
                                pendingOrder?.map((item, index) => {
                                    return <CartCard item={item} index={index} key={index} />
                                })
                            }
                        </ScrollView>

                    </SafeAreaView>
            }
        </>


    )
}
export default Home
const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        height: responsiveHeight(6.8),
        borderRadius: responsiveWidth(3.8),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(7),
    },
    cartCard: {
        height: responsiveHeight(16),
        elevation: 10,
        borderRadius: responsiveWidth(2.7),
        backgroundColor: 'white',
        marginBottom: responsiveHeight(2),
        marginHorizontal: responsiveWidth(4),
        paddingHorizontal: responsiveWidth(4),
        flexDirection: 'row',
        alignItems: 'center',
    }
})