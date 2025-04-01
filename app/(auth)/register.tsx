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
                <BackButton/>

                {/* INSERT LOGO HERE */}
                <View style={styles.topLogo}>
                    <Text>REGISTER PAGE - PROGRESSION LOGO</Text>
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
                        autoCapitalize="none"
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
                        backgroundColor: 'green',
                        borderRadius: 12,
                        alignItems: "center",
                    }}
                >
                    {loading
                        ? <ActivityIndicator color="white" />
                        : <Text style={{ color: 'white' }}>Register</Text>
                    }
                </TouchableOpacity>

                <View>
                    <Text>Already have an account?</Text>
                    <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                        <Text>Back to Login!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenWrapper>
    )
}
export default Register
const styles = StyleSheet.create({
    container: {
        flex: 2,
        gap: spacingY._60,
        paddingHorizontal: spacingX._20,
    },
    topLogo: {
        alignItems: "center",
    },
    form: {
        gap: spacingY._10,
    },
})
