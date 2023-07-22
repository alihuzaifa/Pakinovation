import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Cross from 'react-native-vector-icons/Entypo';
import AntD from 'react-native-vector-icons/AntDesign';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setLoad } from '../../redux';

const Item = ({ navigation }) => {
  const [orderHistory, setOrderHistory] = useState([])
  const [load, setLoader] = useState(false)
  const [showBtn, setshowBtn] = useState(false)
  const isLoad = useSelector(state => state?.global?.load)
  const dispatch = useDispatch()
  const init = async () => {
    setLoader(true)
    let checkArrayLength = await AsyncStorage.getItem('OrderArray')
    if (checkArrayLength) {
      checkArrayLength = JSON.parse(checkArrayLength)
      const getDetail = checkArrayLength?.map(({ details }) => { return details })
      if (getDetail?.length > 0) {
        setshowBtn(true)
      } else {
        setshowBtn(false)
      }
      const arrayOfObjects = getDetail?.map(item => item[0]);
      setOrderHistory(arrayOfObjects)
    }
    setLoader(false)
  }
  useEffect(() => {
    init()
  }, [isLoad])
  const deleteProduct = async (id) => {
    let orderArray = await AsyncStorage.getItem('OrderArray')
    if (orderArray) {
      orderArray = JSON.parse(orderArray)
      let filterOrderArray = orderArray?.filter((obj) => {
        return obj?.id !== id
      })
      const allOrders = [...orderHistory]
      const filterOrderHistory = allOrders?.filter((obj) => {
        return obj?.id !== id
      })
      if (filterOrderHistory.length > 0) {
        filterOrderArray = JSON.stringify(filterOrderArray)
        await AsyncStorage.setItem('OrderArray', filterOrderArray)
        dispatch(setLoad())
        setOrderHistory(filterOrderHistory)
      } else {
        filterOrderArray = JSON.stringify(filterOrderArray)
        await AsyncStorage.setItem('OrderArray', filterOrderArray)
        setOrderHistory(filterOrderHistory)
        dispatch(setLoad())
        await AsyncStorage.setItem('OrderArray', JSON.stringify([]))
        await AsyncStorage.setItem('DealCustID', '')
        navigation.navigate('Home')
      }
    }
  }
  const increaseQty = (item, index) => {
    if (item?.Boxes > 0) {

    } else {

    }
    console.log("🚀item:", item)
    console.log("index:", index)
    // if (item.isBox) {
    //   const updatedItem = {
    //     ...item, box: item?.box + 1,
    //   };
    //   const increasePrice = { ...updatedItem, price: Number(updatedItem?.box * updatedItem.actualPrice).toFixed(2) }
    //   setitem(increasePrice)
    // } else {
    //   const updatedItem = {
    //     ...item, packet: item?.packet + 1,
    //   };
    //   const increasePrice = { ...updatedItem, price: Number(updatedItem?.packet * updatedItem.actualPrice).toFixed(2) }
    //   setitem(increasePrice)
    // }

  }
  const decreaseQty = () => {
    // if (item.isBox) {
    //   if (item?.box > 1) {
    //     const updatedItem = {
    //       ...item, box: item?.box - 1,
    //     };
    //     const increasePrice = { ...updatedItem, price: Number(updatedItem?.price - updatedItem.actualPrice).toFixed(2) }
    //     setitem(increasePrice)
    //   }
    // } else {
    //   if (item?.packet > 1) {
    //     const updatedItem = {
    //       ...item, packet: item?.packet - 1,
    //     };
    //     const increasePrice = { ...updatedItem, price: Number(updatedItem?.price - updatedItem.actualPrice).toFixed(2) }
    //     setitem(increasePrice)
    //   }
    // }

  }
  const CartCard = ({ item, index }) => {
    return (
      <>
        <Animatable.View
          delay={index * 120}
          animation="slideInDown"
          key={index} >
          <TouchableOpacity style={style.cartCard}

          >
            <View
              style={{
                marginLeft: 10,
                paddingVertical: 20,
                flex: 1,
              }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                <Text style={{ fontFamily: "Poppins-Bold", fontSize: 16, color: 'gray' }}>
                  {item?.name}
                </Text>
                <TouchableOpacity onPress={() => {
                  deleteProduct(item?.id)
                }}>
                  <Cross name="cross" size={28} color={'blue'} />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", marginTop: responsiveHeight(1.3) }}>
                <Text style={{ fontFamily: "Poppins-Bold", fontSize: 16, color: 'gray' }}>
                  {item?.Boxes > 0 ? 'Boxes' : 'Pieces'} {" "}
                  {item?.Boxes > 0 ? item?.Boxes : item?.Pieces}
                </Text>
                <Text style={{ fontFamily: "Poppins-Bold", fontSize: 16, color: 'gray' }}>
                  {item?.Price}
                </Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", marginTop: responsiveHeight(2) }}>
                <Text style={{ fontFamily: "Poppins-Bold", fontSize: 16, color: 'gray' }}>
                </Text>
                <View style={{ gap: responsiveHeight(1) }}>
                  <TouchableOpacity onPress={() => {
                    increaseQty(item, index)
                  }}>
                    <AntD name="plus" size={28} color={'blue'} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {

                  }}>
                    <AntD name="minus" size={28} color={'blue'} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </TouchableOpacity>
        </Animatable.View>

      </>
    );
  };
  const confirmOrder = async () => {
    setLoader(true)
    try {
      let orderArray = await AsyncStorage.getItem('OrderArray')
      if (orderArray) {
        orderArray = JSON.parse(orderArray)
        const getDetailsArray = orderArray?.map(({ details }) => {
          return details
        })
        const combinedArray = [].concat(...getDetailsArray);
        if (combinedArray.length > 0) {
          let DealCustID = await AsyncStorage.getItem('DealCustID');
          let name = await AsyncStorage.getItem('name');
          if (DealCustID) {
            if (name) {
              name = JSON.parse(name)
              DealCustID = JSON.parse(DealCustID)
              let allOrder = []
              let obj = { Date: new Date().toDateString(), "DealCustID": DealCustID, UserID: 1, "details": combinedArray, type: "add_new", name }
              let arrayString = await AsyncStorage.getItem('postArray');
              if (arrayString) {
                arrayString = JSON.parse(arrayString)
                allOrder = arrayString
              }
              allOrder.push(obj)
              obj = JSON.stringify(allOrder)
              await AsyncStorage.setItem('postArray', obj);
              await AsyncStorage.setItem('OrderArray', JSON.stringify([]))
              await AsyncStorage.setItem('DealCustID', '')
              navigation.navigate('Home')
              dispatch(setLoad())
            }


          }
          setLoader(false)
        }
      }

    } catch (error) {
      setLoader(false)
    }
    setLoader(false)
  }
  return (
    <>
      {
        load ? <SafeAreaView style={{
          flex: 1,
          backgroundColor: '#fff', justifyContent: "center", alignItems: "center"
        }}>
          <ActivityIndicator size={'large'} color={'blue'} />
        </SafeAreaView> : <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
          <View style={style.header}>
            <Icon name="arrow-back-ios" size={28} color={'blue'} onPress={navigation.goBack} />
            <Text style={{ fontSize: 20, fontFamily: "Poppins-Bold", color: "gray" }}>Order History</Text>
          </View>
          <View style={{ marginVertical: responsiveHeight(3), height: responsiveHeight(69) }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: responsiveHeight(10) }}
              data={orderHistory}
              renderItem={({ item, index }) => <CartCard item={item} index={index} key={index} />}
            />
          </View>
          {
            showBtn && <TouchableOpacity style={{ marginHorizontal: 20, backgroundColor: 'blue', padding: 8, borderRadius: 10, justifyContent: "center", alignItems: "center" }} onPress={() => {
              confirmOrder()
            }}>
              <Text style={{ fontFamily: "Poppins-Bold", fontSize: 14, color: '#fff' }}>
                Checkout
              </Text>
            </TouchableOpacity>
          }

        </SafeAreaView>
      }
    </>

  )
}
export default Item
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
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