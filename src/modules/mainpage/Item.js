import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postApiMethod } from '../../features/Api';
import { useSelector, useDispatch } from 'react-redux';
import { setLoad } from '../../redux';
import NetInfo from "@react-native-community/netinfo";
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
                marginLeft: 10,
                paddingVertical: 20,
                flex: 1,
              }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                <Text style={{ fontFamily: "Poppins-Bold", fontSize: 16, color: 'gray' }}>
                  {item?.Boxes > 0 ? 'Boxes' : 'Pieces'} {" "}
                  {item?.Boxes > 0 ? item?.Boxes : item?.Pieces}
                </Text>
                <Text style={{ fontFamily: "Poppins-Bold", fontSize: 16, color: 'gray' }}>
                  {item?.Price}
                </Text>
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
          if (DealCustID) {
            DealCustID = JSON.parse(DealCustID)
            let allOrder = []
            let obj = { Date: new Date().toDateString(), "DealCustID": DealCustID, UserID: 1, "details": combinedArray, type: "add_new" }
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
            // if (arrayString !== null) {
            //   console.log("Hello")
            //   let array = []
            //   let retrievedArray = JSON.parse(arrayString);
            //   if (retrievedArray.length > 0) {
            //     array = retrievedArray
            //     array.push(obj)
            //     array = JSON.stringify(array)
            // await AsyncStorage.setItem('postArray', array);
            // await AsyncStorage.setItem('OrderArray', JSON.stringify([]))
            // await AsyncStorage.setItem('DealCustID', '')
            // navigation.navigate('Home')
            // dispatch(setLoad())
            //     console.log("Not Correct")
            //   }
            // } else {
            //   await AsyncStorage.setItem('postArray', JSON.stringify([obj]));
            //   console.log("Correct")
            //   await AsyncStorage.setItem('OrderArray', JSON.stringify([]))
            //   await AsyncStorage.setItem('DealCustID', '')
            //   navigation.navigate('Home')
            //   dispatch(setLoad())
            // }
            // let token = await AsyncStorage.getItem('token');

            // token = JSON.parse(token)
            // const headers = {
            //   'Authorization': `Bearer ${token}`,
            //   'Content-Type': 'application/json',
            // }

            console.log('state.isConnected', state.isConnected)

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