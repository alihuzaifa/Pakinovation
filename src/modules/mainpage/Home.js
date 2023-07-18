import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiMethod, postApiMethod } from '../../features/Api';
import { useDispatch, useSelector } from 'react-redux';

const Home = ({ }) => {
    const [load, setLoad] = useState(false)
    const [isNetConnect, setIsNetConnect] = useState(false)
    const [showOrderScreenCount, setshowOrderScreenCount] = useState(0)
    const [active, setactive] = useState(-1)
    const isLoad = useSelector(state => state?.global?.load)
    const dispatch = useDispatch()
    const [pendingOrder, setPendingOrder] = useState([])
    const [categories, setcategories] = useState([])



    const getAllAppData = async () => {
        const state = await NetInfo.fetch();
        setIsNetConnect(state.isConnected);
        if (state.isConnected) {
            try {
                setLoad(true);
                const token = await AsyncStorage.getItem('token');
                const [getList, getProducts] = await Promise.all([getApiMethod('dealcust.php', JSON.parse(token)), getApiMethod('products.php', JSON.parse(token))]);
                const updatedArray = getList?.data?.data?.map((item) => {
                    const { "DealCustID ": dealCustID, ...rest } = item;
                    return { "DealCustID": dealCustID, ...rest };
                });
                const shopList = updatedArray?.map((item) => {
                    return {
                        ...item,
                        name: item?.name,
                        address: item?.address,
                    };
                });
                const arrayString = JSON.stringify(shopList);
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
                const productArray = JSON.stringify(allProducts);
                await AsyncStorage.setItem('allProductList', productArray);
                await AsyncStorage.setItem('shopList', arrayString);
                setLoad(false);
            } catch (error) {
                console.log('error', error);
                setLoad(false);
            }
        }
    };
    const confirmOrder = async () => {
        setLoad(true)
        try {
            let orderArray = await AsyncStorage.getItem('postArray')
            if (orderArray) {
                orderArray = JSON.parse(orderArray)
                const updatedData = orderArray?.map(item => {
                    const { name, ...rest } = item;
                    return rest;
                });
                orderArray = updatedData
                if (orderArray.length > 0) {
                    const state = await NetInfo.fetch();
                    let token = await AsyncStorage.getItem('token');
                    token = JSON.parse(token)
                    const headers = {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                    if (state.isConnected) {
                        for (let index = 0; index < orderArray.length; index++) {
                            const postData = await postApiMethod('orders.php', orderArray[index], headers)
                            if (postData?.status === 200) {
                                alert("Order Recieved Successfully")

                            } else {
                                alert('Your Session has Expired Login Again')
                            }
                        }
                        await AsyncStorage.setItem('postArray', JSON.stringify([]))
                        setshowOrderScreenCount(0)
                        setPendingOrder([])
                        setcategories([])
                        dispatch(setLoad())
                    } else {
                        alert("Please Connect Internet")
                    }

                }
            }

        } catch (error) {

        }

        setLoad(false)
    }
    const CartCard = ({ item, index }) => {
        return (
            <>
                <Animatable.View
                    delay={index * 120} // delay for each item
                    animation="slideInDown" // animation type
                    key={index} >
                    <TouchableOpacity style={styles.cartCard}

                    >

                        <View
                            style={{
                                height: 100,
                                marginLeft: 10,
                                paddingVertical: 20,
                                flex: 1,
                            }}>
                            <Text style={{ fontFamily: "Poppins-Bold", fontSize: 16, color: 'gray' }}>
                                {item?.Boxes > 0 ? 'Boxes' : 'Pieces'}   {item?.Boxes > 0 ? item?.Boxes : item?.Pieces}
                            </Text>
                            <Text style={{ fontSize: 17, color: 'gray', fontFamily: "Poppins-Bold" }}>
                                Price {item?.price}
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

    const CheckPostData = async () => {
        try {
            let checkArrayLength = await AsyncStorage.getItem('postArray')
            if (checkArrayLength) {
                checkArrayLength = JSON.parse(checkArrayLength)
                if (checkArrayLength.length > 0) {
                    setshowOrderScreenCount(checkArrayLength.length)
                    const allDetailsArray = checkArrayLength?.map(({ details, name, DealCustID }) => {
                        return {
                            name, details, DealCustID
                        }
                    })
                    setcategories(allDetailsArray)
                } else {
                    setshowOrderScreenCount(0)
                    setPendingOrder([])
                }
            }

        } catch (error) {

        }
    }
    useEffect(() => {
        CheckPostData()
    }, [isLoad])
    const selected = (item, index) => {
        setactive(index)
        setPendingOrder(item?.details)
    }
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

                        {/* <Header /> */}
                        <View

                            style={{
                                marginTop: responsiveHeight(5),
                                flexDirection: 'row',
                                paddingHorizontal: responsiveWidth(5.5),
                                justifyContent: 'space-between', alignItems: "center"
                            }}

                        >
                            <TouchableOpacity onPress={() => {
                                getAllAppData()
                            }}>
                                <Icon name="download" size={responsiveWidth(8)} color={'blue'} />
                            </TouchableOpacity>
                            {
                                showOrderScreenCount > 0 && <TouchableOpacity onPress={() => {
                                    confirmOrder()
                                }}>
                                    <Icon name="upload" size={responsiveWidth(8)} color={'blue'} />
                                </TouchableOpacity>
                            }

                        </View>



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


                        <View style={{
                            paddingLeft: responsiveWidth(4),
                            marginBottom: responsiveHeight(1)
                        }}>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}

                            >
                                {categories?.map((category, index) => (
                                    <TouchableOpacity
                                        onPress={() => selected(category, index)}
                                        style={[
                                            {
                                                paddingHorizontal: responsiveWidth(3),
                                                paddingVertical: responsiveHeight(0.8),
                                                borderWidth: 1,
                                                borderRadius: responsiveWidth(5),
                                                borderColor: 'blue',
                                                marginRight: responsiveWidth(2),
                                            },
                                            active === index && {
                                                backgroundColor: 'blue',
                                            },
                                        ]}
                                        key={category.id}
                                    >
                                        <Text
                                            style={{
                                                color:
                                                    active === index
                                                        ? 'white'
                                                        : 'black',
                                                fontSize: responsiveFontSize(1.7),
                                                fontFamily: 'Poppins-Bold',
                                            }}
                                        >
                                            {category.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>


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