import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';


const Item = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} color={'blue'} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontFamily: "Poppins-Bold", color: "gray" }}>Order History</Text>
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
})