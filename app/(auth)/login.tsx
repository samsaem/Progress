import {ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
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
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeText}>
                        Hey!
                    </Text>
                    <Text style={styles.welcomeText}>
                        Welcome back 👋
                    </Text>

                    <Text style={{
                        fontSize: 15,
                        marginTop: spacingY._5,
                        fontWeight: '700',
                        color: "#171717",
                    }}
                    >
                        Are you ready to make Progress? 🙌
                    </Text>
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
                        backgroundColor: '#067FD0',
                        borderRadius: 12,
                        alignItems: "center",
                    }}
                >
                    {loading
                        ? <ActivityIndicator color="white" />
                        : <Text style={{
                            color: 'white',
                            fontSize: 15,
                            fontWeight: '600',
                        }}>Login</Text>
                    }
                </TouchableOpacity>

                <View>
                    <Text>Don't have an account?</Text>
                    <TouchableOpacity
                        onPress={() => router.push('/(auth)/register')}
                    >
                        <Text style={{
                            fontSize: 15,
                            fontWeight: '700',
                            color: "#067FD0",
                        }}
                        >
                            Join Progress!</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScreenWrapper>
    )
}
export default LogIn
const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: spacingY._25,
        paddingHorizontal: spacingX._20,
    },
    form: {
        gap: spacingY._15,
        marginTop: spacingY._20
    },
    welcomeContainer: {
        gap: 5,
        marginTop: spacingY._60
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: '800',
    }
})
