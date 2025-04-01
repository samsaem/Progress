import {ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {useRef, useState} from 'react'
import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import {router} from "expo-router";
import {useAuth} from "@/contexts/authContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import {spacingX, spacingY} from "@/constants/theme";
import ScreenWrapper from "@/components/ScreenWrapper";

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
        <ScreenWrapper>
            <View style={styles.container}>
                <BackButton

                />

                {/* INSERT LOGO HERE */}
                <View style={styles.topLogo}>
                    <Text>LOGIN PAGE - PROGRESSION LOGO</Text>
                </View>

                {/* FORM */}
                <View style={styles.form}>
                    <Text>Email</Text>
                    <Input
                        icon={
                            <Ionicons
                                name="mail-outline"
                                size={24}
                                color="black"
                            />
                        }
                        placeholder="Enter your email"
                        onChangeText={(value) => emailRef.current = value}
                        autoCapitalize="none"
                    />

                    <Text>Password</Text>
                    <Input
                        icon={
                            <Ionicons
                                name="key-outline"
                                size={24}
                                color="black"
                            />
                        }
                        secureTextEntry={true}
                        placeholder="Enter your password"
                        onChangeText={(value) => passwordRef.current = value}
                    />

                </View>

                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={loading}
                    style={{
                        padding: 12,
                        backgroundColor: 'green',
                        borderRadius: 12,
                        alignItems: "center",
                    }}
                >
                    {loading
                        ? <ActivityIndicator color="white" />
                        : <Text style={{ color: 'white' }}>Login</Text>
                    }
                </TouchableOpacity>

                <View>
                    <Text>Don't have an account?</Text>
                    <TouchableOpacity
                        onPress={() => router.push('/(auth)/register')}
                    >
                        <Text>Let's join and make Progress together!</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScreenWrapper>
    )
}
export default LogIn
const styles = StyleSheet.create({
    container: {
        flex: 2,
        gap: spacingY._60,
        paddingHorizontal: spacingX._20,
    },
    form: {
        gap: spacingY._10,
    },
    topLogo: {
        alignItems: "center",
    }
})
