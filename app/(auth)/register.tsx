import {Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {useRef, useState} from 'react'
import {colors} from "@/constants/theme";
import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import {router} from "expo-router";
import {useAuth} from "@/contexts/authContext";
import ScreenWrapper from "@/components/ScreenWrapper";

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
                <Text>REGISTER PAGE</Text>

                <Input
                    placeholder="Enter your name"
                    onChangeText={(value) => (nameRef.current = value)}
                />

                <Input
                    placeholder="Enter your email"
                    onChangeText={(value) => (emailRef.current = value)}
                />

                <Input
                    secureTextEntry={true}
                    placeholder="Enter your password"
                    onChangeText={(value) => (passwordRef.current = value)}
                />

                <Button
                    title="Sign up"
                    onPress={handleSubmit}
                />

                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={loading}
                >

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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
