import {Alert, Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useRef, useState} from 'react'
import {colors} from "@/constants/theme";
import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import {router} from "expo-router";

const Register = () => {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const nameRef = useRef("");


    const handleSubmit = async () => {
        if (!emailRef.current || !passwordRef.current || !nameRef.current) {
            Alert.alert("Register", "Please fill all the fields!");
            return;
        }
        console.log('email', emailRef.current);
        console.log('password', passwordRef.current);
        console.log('name', nameRef.current);
        console.log('handleSubmit register works');
    }

    return (
        <View style={styles.container}>
            <BackButton/>
            <Text>REGISTER PAGE</Text>

            <Input
                placeholder="Enter your name"
                onChangeText={(value) => nameRef.current = value}
            />

            <Input
                placeholder="Enter your email"
                onChangeText={(value) => emailRef.current = value}
            />

            <Input
                secureTextEntry={true}
                placeholder="Enter your password"
                onChangeText={(value) => passwordRef.current = value}
            />

            <Button
                title="Sign Up"
                onPress={handleSubmit}
            >
                console.log("register btn clicked")
            </Button>

            <View>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                    <Text>Back to Login!</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
export default Register
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.neutral,
    },
})
