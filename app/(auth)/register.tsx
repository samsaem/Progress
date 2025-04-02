import {ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {useRef, useState} from 'react'
import {colors, spacingX, spacingY} from "@/constants/theme";
import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import {router} from "expo-router";
import {useAuth} from "@/contexts/authContext";
import ScreenWrapper from "@/components/ScreenWrapper";
import Ionicons from "@expo/vector-icons/Ionicons";

const Register = () => {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const nameRef = useRef("");

    const [loading, setLoading] = useState(false);
    const {register} = useAuth();

    const handleSubmit = async () => {
        if (!passwordRef.current || !emailRef.current || !nameRef.current) {
            Alert.alert("Register", "Please fill all the fields!");
            return;
        }
        console.log('email', emailRef);
        console.log('password', passwordRef);
        console.log('name', nameRef);

        setLoading(true);
        const res = await register(emailRef.current, passwordRef.current, nameRef.current);

        setLoading(false);
        console.log('register result: ', res);

        if (!res.success) {
            Alert.alert('Register', res.msg);
        }
    };

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>
                        Should We Get
                    </Text>
                    <Text style={styles.registerText}>
                        Started?! ✨
                    </Text>

                    <Text style={{
                        fontSize: 15,
                        marginTop: spacingY._5,
                        fontWeight: '700',
                        color: "#171717",
                    }}
                    >
                        Please fill out all the fields below!
                    </Text>

                </View>

                <View style={styles.form}>
                    <Text>Name</Text>
                    <Input
                        icon={
                            <Ionicons
                                name="person-outline"
                                size={24}
                                color="black"
                            />
                        }
                        placeholder="Enter your name"
                        onChangeText={(value) => nameRef.current = value}
                    />

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
                        : <Text style={{ color: 'white',
                            fontSize: 15,
                            fontWeight: '600', }}>Register</Text>
                    }
                </TouchableOpacity>

                <View>
                    <Text>Already have an account?</Text>
                    <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: '700',
                            color: "#067FD0",
                        }}
                        >
                            Login here!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenWrapper>
    )
}
export default Register
const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: spacingY._40,
        paddingHorizontal: spacingX._20,
    },
    registerContainer: {
        gap: 3,
        marginTop: spacingY._60
    },
    registerText: {
        fontSize: 30,
        fontWeight: '800',
    },
    form: {
        gap: spacingY._10,
    }
})
