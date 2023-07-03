import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postApiMethod } from '../../features/Api';


const About = ({ navigation }) => {
  const [cartData, setCartData] = useState([])
  const [load, setLoad] = useState(false)
  const [loadBtn, setloadBtn] = useState(false)

  const getAllProducts = async () => {
    setLoad(true)
    // let existingProducts = await AsyncStorage.getItem('products');
    let orderArray = await AsyncStorage.getItem('OrderArray')
    if (orderArray) {
      orderArray = JSON.parse(orderArray)
      const getDetailsArray = orderArray?.map(({ details }) => {
        return details
      })
      const combinedArray = [].concat(...getDetailsArray);
      setCartData(combinedArray)
    }
    setLoad(false)
  }
  useEffect(() => {
    getAllProducts()
  }, [])


  const sumOfPrice = cartData?.reduce((total, product) => {
    const price = parseFloat(product.Price);
    return total + price;
  }, 0);
  const formattedPrice = sumOfPrice?.toFixed(2);

  const confirmOrder = async () => {
    setloadBtn(true)
    try {
      let DealCustID = await AsyncStorage.getItem('DealCustID');
      if (DealCustID) {
        DealCustID = JSON.parse(DealCustID)
        const obj = { Date: new Date().toDateString(), "DealCustID": DealCustID, UserID: 1, "details": cartData, type: "add_new" }
        let token = await AsyncStorage.getItem('token');
        token = JSON.parse(token)
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };
        const postData = await postApiMethod('orders.php', obj, headers)
        console.log("🚀 ~ postData:", postData?.data)
        await AsyncStorage.setItem('OrderArray', JSON.stringify([]))
        await AsyncStorage.setItem('DealCustID', '')
        navigation.navigate('User')
      }
      setloadBtn(false)
    } catch (error) {
      console.log("🚀 ~ error:", error)
      setloadBtn(false)
    }
    setloadBtn(false)
  }
  return (
    <>
      {
        load ?
          <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#fff', justifyContent: "center", alignItems: "center"
          }}>
            <ActivityIndicator size={'large'} color={'blue'} />
          </SafeAreaView> : <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: '#fff',
            }}>
            <View
              style={{
                marginTop: responsiveHeight(5),
                flexDirection: 'row',
                paddingHorizontal: responsiveWidth(4),
                justifyContent: 'center', alignItems: "center"

              }}>
              <View style={styles.inputContainer}>
                <Icon name="chevron-back" size={responsiveWidth(7)} color={'blue'} onPress={() => {
                  navigation.goBack()
                }} />
                <Icon2 name="hearto" size={responsiveWidth(7)} color={'blue'} style={{ paddingRight: responsiveWidth(7) }} />
              </View>

              <Icon2 name="upload" size={responsiveWidth(7)} color={'blue'} />
            </View>

            <View >
              <View style={styles.cartCard}>
                <View
                  style={{
                    height: responsiveHeight(20),
                    marginLeft: responsiveWidth(4),
                    paddingVertical: responsiveWidth(8),
                    flex: 1,
                    justifyContent: "center"
                  }}>
                  <Text style={{ fontFamily: "Poppins-Bold", fontSize: responsiveFontSize(2.5), color: 'gray' }}>
                    Deliver To
                  </Text>
                  <Text style={{ fontSize: responsiveFontSize(2.3), color: 'gray', fontFamily: "Poppins-SemiBold" }}>
                    242 ST Marks Eve, Finland
                  </Text>

                </View>
              </View>
            </View>
            <View style={{
              marginVertical: responsiveWidth(2), height: responsiveHeight(35.5), backgroundColor: 'white',
              elevation: 0.5,
            }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: responsiveHeight(20) }}
                data={cartData}
                renderItem={({ item, index }) => <View style={styles.cartCard}>
                  <View
                    style={{
                      height: responsiveHeight(20),
                      marginLeft: responsiveWidth(4),
                      paddingVertical: responsiveHeight(5),
                      flex: 1,
                      justifyContent: "center"
                    }} key={index}>
                    <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18, color: "gray" }}>
                      Pieces {item?.Pieces}
                    </Text>
                    <Text style={{ fontSize: 18, color: 'gray', fontFamily: "Poppins-Regular" }}>
                      Boxes {item?.Boxes}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 18, color: 'gray', fontFamily: "Poppins-Regular" }}>
                    {item?.Price}
                  </Text>
                </View>}
              />
            </View>
            <View style={{ backgroundColor: "#fff", }}>
              <View style={{ paddingHorizontal: responsiveWidth(5), flexDirection: 'row', justifyContent: 'space-between', marginVertical: 3 }}>
                <Text style={{ fontSize: responsiveFontSize(2.2), color: 'gray', fontFamily: "Poppins-SemiBold" }}>Total Item</Text>
                <Text style={{ fontSize: responsiveFontSize(2.2), color: 'gray', fontFamily: "Poppins-Regular" }}>{cartData?.length}</Text>
              </View>
              {/* <View style={{ paddingHorizontal: responsiveWidth(5), flexDirection: 'row', justifyContent: 'space-between', marginVertical: 3 }}>
                <Text style={{ fontSize: responsiveFontSize(2.2), color: 'gray', fontFamily: "Poppins-SemiBold" }}>Discount</Text>
                <Text style={{ fontSize: responsiveFontSize(2.2), color: 'gray', fontFamily: "Poppins-Regular" }}>{sumOfDiscounts} %</Text>
              </View> */}
              <View style={{ paddingHorizontal: responsiveWidth(5), flexDirection: 'row', justifyContent: 'space-between', marginVertical: 3 }}>
                <Text style={{ fontSize: responsiveFontSize(2.2), color: 'gray', fontFamily: "Poppins-SemiBold" }}>Tax</Text>
                <Text style={{ fontSize: responsiveFontSize(2.2), color: 'gray', fontFamily: "Poppins-Regular" }}>0</Text>
              </View>
              <View style={{ paddingHorizontal: responsiveWidth(5), flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                <Text style={{ fontSize: responsiveFontSize(2.5), fontFamily: "Poppins-SemiBold", color: 'gray' }}>Total</Text>
                <Text style={{ fontSize: responsiveFontSize(2.5), fontFamily: "Poppins-SemiBold", color: 'gray' }}>{formattedPrice}</Text>
              </View>
            </View>
            {cartData?.length > 0 &&
              <TouchableOpacity
                style={{
                  backgroundColor: '#90EE90',
                  height: responsiveHeight(7),
                  borderRadius: responsiveWidth(2),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: responsiveHeight(1),
                  borderRadius: responsiveWidth(5), marginHorizontal: responsiveWidth(4)
                }}
                disabled={loadBtn}
                onPress={() => { confirmOrder() }}
              >
                <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontFamily: "Poppins-SemiBold" }}>{loadBtn ? <ActivityIndicator size={'large'} color={'#fff'} /> : "Order Confirmed"}</Text>
              </TouchableOpacity>}


          </SafeAreaView>
      }</>

  )
}

export default About

const styles = StyleSheet.create({
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
    justifyContent: "space-between"
  },
  inputContainer: {
    flex: 1,
    height: responsiveHeight(6),
    borderRadius: responsiveWidth(2.7),
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(4),
    justifyContent: 'space-between'
  },
})