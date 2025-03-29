import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {router} from "expo-router";
import {signOut} from "@firebase/auth";
import {auth} from "@/config/firebase";

const Home = () => {
    const handleLogout = async () => {
        await signOut(auth);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={handleLogout}
                style={{ padding: 12, backgroundColor: 'green', borderRadius: 8 }}
            >
                <Text>Logout</Text>
            </TouchableOpacity>
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
