import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {router} from "expo-router";
import {signOut} from "@firebase/auth";
import {auth} from "@/config/firebase";
import {useAuth} from "@/contexts/authContext";

const Home = () => {
    return (
        <View style={styles.container}>
            <Text>(1) HOME PAGE</Text>
        </View>
    )
}
export default Home
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
