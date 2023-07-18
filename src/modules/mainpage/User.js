import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, TextInput, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiMethod } from '../../features/Api';
import style from '../../style';
import ModalFunc from '../../components/Modal';
import NetInfo from "@react-native-community/netinfo";

const User = ({ navigation }) => {
  const [load, setLoad] = useState(false)
  const [notApproved, setNotApproved] = useState([])
  const [visible, setVisible] = useState(false)
  const [isNetConnect, setIsNetConnect] = useState(false)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsNetConnect(state.isConnected)
    });
    return () => {
      unsubscribe();
    }
  }, [])
  const moveToProduct = async (item) => {
    try {
      let id = JSON.stringify(item?.DealCustID)
      let name = JSON.stringify(item?.name)
      await AsyncStorage.setItem('DealCustID', id);
      await AsyncStorage.setItem('name', name);
      navigation.navigate('Product')
    } catch (error) {
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const state = await NetInfo.fetch();
      setIsNetConnect(state.isConnected);
      if (state.isConnected) {
        try {
          setLoad(true);
          const token = await AsyncStorage.getItem('token');
          const [getList] = await Promise.all([getApiMethod('dealcust.php', JSON.parse(token))]);
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
          setNotApproved(shopList)
          const arrayString = JSON.stringify(shopList);
          await AsyncStorage.setItem('shopList', arrayString);
          setLoad(false);
        } catch (error) {
          console.log('error', error);
          setLoad(false);
        }
      } else {
        const shops = await AsyncStorage.getItem('shopList');
        if (shops) {
          const shopList = JSON.parse(shops)
          setNotApproved(shopList)
          console.log("🚀 shops:", shopList[0])
        }
      }
    };

    fetchData();

    const unsubscribe = NetInfo.addEventListener(fetchData);

    return () => {
      unsubscribe();
    };
  }, []);



  useEffect(() => {
    // getShops()

  }, [])
  const CartCard = ({ item, index }) => {
    return (
      <>
        <Animatable.View
          delay={index * 120} // delay for each item
          animation="slideInDown" // animation type
          key={index}></Animatable.View>
        <View style={styles.cartCard}>
          <View
            style={{
              height: 100,
              marginLeft: 10,
              paddingVertical: 20,
              flex: 1,
              justifyContent: "center"
            }}>
            <Text style={{ fontFamily: "Poppins-Bold", fontSize: 16, color: 'gray' }}>
              {item?.name}
            </Text>
          </View>
          <TouchableOpacity onPress={() => {
            moveToProduct(item)
          }}>
            <Icon name="eye" size={28} color={'blue'} />
          </TouchableOpacity>
        </View>
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

          <View style={{ marginVertical: responsiveHeight(3) }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: responsiveHeight(10) }}
              data={notApproved}
              renderItem={({ item, index }) => <CartCard item={item} index={index} key={index} />}
            />
          </View>
        </SafeAreaView>}
    </>

  )
}

export default User

const styles = StyleSheet.create({
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
    height: responsiveHeight(16),
    elevation: 10,
    borderRadius: responsiveWidth(2.7),
    backgroundColor: 'white',
    marginBottom: responsiveHeight(2),
    marginHorizontal: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
})