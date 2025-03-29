import {ActivityIndicator, Alert, Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useRef, useState} from 'react'
import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import {router} from "expo-router";
import register from "@/app/(auth)/register";
import {useAuth} from "@/contexts/authContext";

const LogIn = () => {
    const emailRef = useRef("");
    const passwordRef = useRef("");

    const [loading, setLoading] = useState(false);
    const {login} = useAuth();

    const handleSubmit = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert("Login", "Please fill all the fields!");
            return;
        }
        console.log('email', emailRef);
        console.log('password', passwordRef);

        setLoading(true);
        const res = await login(emailRef.current, passwordRef.current);

        setLoading(false);
        console.log('login result: ', res);

        if (!res.success) {
            Alert.alert('Login', res.msg);
        }
    }
    return (
        <View style={styles.container}>
            <BackButton/>
            <Text>LOGIN PAGE</Text>

            <Input
                placeholder="Enter your email"
                onChangeText={(value) => emailRef.current = value}
            />

            <Input
                secureTextEntry={true}
                placeholder="Enter your password"
                onChangeText={(value) => passwordRef.current = value}
            />

            <TouchableOpacity
                onPress={handleSubmit}
                disabled={loading}
                style={{ padding: 12, backgroundColor: 'green', borderRadius: 8 }}
            >
                {loading
                    ? <ActivityIndicator color="white" />
                    : <Text style={{ color: 'white' }}>Login</Text>
                }
            </TouchableOpacity>

            <View>
                <Text>No account?</Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                <Text>Sign up with Progress!</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
export default LogIn
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
