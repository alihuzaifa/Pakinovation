import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiMethod } from '../../features/Api';
import * as Animatable from 'react-native-animatable';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import NetInfo from "@react-native-community/netinfo";



const Product = ({ navigation }) => {
    const [load, setLoad] = useState(false)
    const [notApproved, setNotApproved] = useState([])
    const [isNetConnect, setIsNetConnect] = useState(false)
    const CartCard = ({ item, index }) => {
        return (
            <>
                <Animatable.View
                    delay={index * 120} // delay for each item
                    animation="slideInDown" // animation type
                    key={index} >
                    <TouchableOpacity style={style.cartCard}

                    >
                        <View
                            style={{
                                height: 100,
                                marginLeft: 10,
                                paddingVertical: 20,
                                flex: 1,
                            }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                                <Text style={{ fontFamily: "Poppins-Bold", fontSize: 16, color: 'gray' }}>
                                    {item?.name}
                                </Text>
                                <Text style={{ fontFamily: "Poppins-Bold", fontSize: 16, color: 'gray' }}>
                                    {item?.price}
                                </Text>
                            </View>
                            <TouchableOpacity style={{ backgroundColor: 'blue', padding: 8, borderRadius: 10, justifyContent: "center", alignItems: "center" }} onPress={() => {
                                navigation.navigate('DetailsScreen', item)
                            }}>
                                <Text style={{ fontFamily: "Poppins-Bold", fontSize: 14, color: '#fff' }}>
                                    Generate
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </TouchableOpacity>
                </Animatable.View>

            </>
        );
    };
    // const getProducts = async () => {
    //     try {
    //         setLoad(true)
    //         const token = await AsyncStorage.getItem('token');
    //         const [getProducts] = await Promise.all([getApiMethod('products.php', JSON.parse(token))]);
    //         const allProducts = getProducts?.data?.data?.map((product) => {
    //             return {
    //                 Barcode: product.Barcode,
    //                 Category: product.Category,
    //                 Company_Code: product.Company_Code,
    //                 Description: product.Description,
    //                 Discount: product.Discount,
    //                 name: product.Full_Name,
    //                 image: 'https://static.vecteezy.com/system/resources/previews/012/629/089/original/floating-medicine-pills-3d-illustration-free-png.png',
    //                 Manufactor: product.Manufactor,
    //                 PCode: product.PCode,
    //                 price: product.Price,
    //                 ProdID: product.ProdID, packet: 1, box: 1, isPacket: true, isBox: false, actualPrice: product.Price
    //             };
    //         });
    //         setNotApproved(allProducts)
    //     } catch (error) {
    //         setLoad(false)
    //     }
    //     setLoad(false)
    // }

    // useEffect(() => {
    //     getProducts()
    // }, [])

    useEffect(() => {
        const fetchData = async () => {
            const state = await NetInfo.fetch();
            setIsNetConnect(state.isConnected);
            if (state.isConnected) {
                try {
                    setLoad(true)
                    const token = await AsyncStorage.getItem('token');
                    const [getProducts] = await Promise.all([getApiMethod('products.php', JSON.parse(token))]);
                    const allProducts = getProducts?.data?.data?.map((product) => {
                        return {
                            Barcode: product.Barcode,
                            Category: product.Category,
                            Company_Code: product.Company_Code,
                            Description: product.Description,
                            Discount: product.Discount,
                            name: product.Full_Name,
                            Manufactor: product.Manufactor,
                            PCode: product.PCode,
                            price: product.Price,
                            ProdID: product.ProdID, packet: 1, box: 1, isPacket: true, isBox: false, actualPrice: product.Price
                        };
                    });
                    setNotApproved(allProducts)
                    const arrayString = JSON.stringify(allProducts);
                    await AsyncStorage.setItem('allProductList', arrayString);
                } catch (error) {
                    setLoad(false)
                }
                setLoad(false)
            } else {
                const product = await AsyncStorage.getItem('allProductList');
                if (product) {
                    const productList = JSON.parse(product)
                    setNotApproved(productList)
                }
            }
        };
        fetchData();
        const unsubscribe = NetInfo.addEventListener(fetchData);
        return () => {
            unsubscribe();
        };
    }, []);


    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} color={'blue'} onPress={navigation.goBack} />
                <Text style={{ fontSize: 20, fontFamily: "Poppins-Bold", color: "gray" }}>Products</Text>
            </View>
            <View style={{ marginVertical: responsiveHeight(3) }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: responsiveHeight(10) }}
                    data={notApproved}
                    renderItem={({ item, index }) => <CartCard item={item} index={index} key={index} />}
                />
            </View>
        </SafeAreaView>
    )
}

export default Product

const style = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    inputContainer: {
        flex: 1,
        height: responsiveHeight(6.8),
        borderRadius: responsiveWidth(3.8),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(4),
        backgroundColor: "#f1f1f1"
    },
    cartCard: {
        elevation: 10,
        borderRadius: responsiveWidth(2.7),
        backgroundColor: 'white',
        marginBottom: responsiveHeight(2),
        marginHorizontal: responsiveWidth(4),
        paddingHorizontal: responsiveWidth(4),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        paddingBottom: responsiveHeight(1.2)
    },

})
