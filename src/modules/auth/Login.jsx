import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { postApiMethod } from '../../features/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({ navigation }) => {
    const [isload, setIsLoad] = useState(false)
    const [error, seterror] = useState(false)
    const initialValues = { name: '', password: "" }
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .min(3, 'Name must be at least 2 characters')
            .max(50, 'Name cannot exceed 50 characters'),
        password: Yup.string()
            .required('Password is required')
            .min(5, 'Password must be at least 5 characters')
            .max(20, 'Password cannot exceed 20 characters'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async ({ name, password }) => {
            setIsLoad(true)
            const postObj = {
                username: name,
                password: password
            }
            const postLoginData = await postApiMethod('login.php', postObj)
            if (postLoginData?.data?.status) {
                try {
                    await AsyncStorage.setItem('token', JSON.stringify(postLoginData?.data?.token));
                    navigation.navigate('Main')
                    formik.resetForm()
                } catch (error) {
                    setIsLoad(false)
                }

            } else {
                seterror(true)
                setErrorMessage('Invalid User')
            }
            setIsLoad(false)
            // "username": "admins",
            // "password": "admin"
        }
    })
    const COLORS = {
        dark: '#000',
        light: '#a5a5a5',
        white: '#fff',
        primary: '#282534',
        secondary: '#64beff',
        pink: '#ff2d5f',
    };
    return (
        <SafeAreaView
            style={{
                paddingHorizontal: 20,
                paddingTop: 80,
                flex: 1,
                backgroundColor: '#75E6DA',
                justifyContent: 'center',
                // alignItems: 'center',
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View >
                    <Text
                        style={{ fontSize: 20, fontFamily: "Poppins-Bold", textAlign: "center", color: COLORS.white, marginBottom: 10 }}>
                        Login
                    </Text>
                    <Text
                        style={{ fontSize: 16, color: COLORS.dark, textAlign: "center", fontFamily: 'Poppins-SemiBold' }}>
                        Access account
                    </Text>
                </View>

                <View style={{ marginTop: 20 }}>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: COLORS.dark, paddingLeft: 5, marginBottom: 10, fontSize: 16, fontFamily: "Poppins-Regular" }}>Name</Text>
                        <TextInput
                            id="name"
                            name="name"
                            onChangeText={formik.handleChange('name')}
                            onBlur={formik.handleBlur('name')}
                            value={formik.values.name}
                            placeholder="Name"
                            style={{
                                color: COLORS.light,
                                paddingLeft: 15,
                                borderWidth: 1,
                                borderColor: COLORS.light,
                                flex: 1,
                                fontSize: 17,
                                borderRadius: 15, backgroundColor: COLORS.white, borderColor: COLORS.white,
                                fontFamily: "Poppins-Regular"


                            }}
                            placeholderTextColor={COLORS.light}
                        />
                    </View>
                    {formik.errors.name && formik.touched.name ? (
                        <Text style={{ color: 'red', marginVertical: 5, fontWeight: '500' }}>{formik.errors.name}</Text>
                    ) : null}

                    <View style={{ marginTop: 20 }}>
                        {/* <Icon
                            name="lock-outline"
                            color={COLORS.primary}
                            size={20}
                            style={{ marginTop: 15, position: 'absolute' }}
                        /> */}
                        <Text style={{ color: COLORS.dark, paddingLeft: 5, marginBottom: 10, fontSize: 16, fontFamily: "Poppins-Regular" }}>Password</Text>
                        <View style={{ flexDirection: "row" }}>
                            <TextInput
                                id="password"
                                name="password"
                                onChangeText={formik.handleChange('password')}
                                onBlur={formik.handleBlur('password')}
                                value={formik.values.password}
                                placeholder="Password"
                                style={{
                                    color: COLORS.light,
                                    paddingLeft: 15,
                                    borderWidth: 1,
                                    borderColor: COLORS.light,
                                    flex: 1,
                                    fontSize: 18,
                                    borderRadius: 15, backgroundColor: COLORS.white, borderColor: COLORS.white,
                                    fontFamily: "Poppins-Regular"


                                }}
                                secureTextEntry
                                placeholderTextColor={COLORS.light}
                            />
                            <Icon
                                name="lock-outline"
                                color={COLORS.dark}
                                size={20}
                                style={{ marginTop: 15, position: 'absolute', right: 14 }}
                            />
                        </View>

                    </View>
                    {formik.errors.password && formik.touched.password ? (
                        <Text style={{ color: 'red', marginVertical: 5, fontWeight: '500' }}>{formik.errors.password}</Text>
                    ) : null}
                    <Text style={{ color: 'red', marginVertical: 5, fontWeight: '500', marginLeft: 3 }}>{errorMessage}</Text>

                    <Button onClick={() => {
                        formik.submitForm()
                    }}>
                        {
                            isload ? <ActivityIndicator size="large" color="#fff" /> : "Login"
                        }
                    </Button>

                </View>


            </ScrollView>
        </SafeAreaView>
    )
}
export default Login
const styles = StyleSheet.create({})