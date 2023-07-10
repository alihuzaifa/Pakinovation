import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import * as Animatable from 'react-native-animatable';
const Item = ({ navigation }) => {
  const [orderHistory, setOrderHistory] = useState([])
  const init = async () => {
    let checkArrayLength = await AsyncStorage.getItem('OrderArray')
    if (checkArrayLength) {
      checkArrayLength = JSON.parse(checkArrayLength)
      const getDetail = checkArrayLength?.map(({ details }) => { return details })
      const arrayOfObjects = getDetail?.map(item => item[0]);
      setOrderHistory(arrayOfObjects)
    }
  }
  useEffect(() => {
    init()
  }, [])
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
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} color={'blue'} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontFamily: "Poppins-Bold", color: "gray" }}>Order History</Text>
      </View>
      <View style={{ marginVertical: responsiveHeight(3) }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: responsiveHeight(10) }}
          data={orderHistory}
          renderItem={({ item, index }) => <CartCard item={item} index={index} key={index} />}
        />
      </View>
    </SafeAreaView>
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