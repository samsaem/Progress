import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {useRouter} from "expo-router";
import LogIn from "@/app/(auth)/login";

const Welcome = () => {
    const router = useRouter();
    return (
        <LogIn/>
    )
}
export default Welcome
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
