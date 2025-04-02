import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {useRouter} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const BackButton = () => {
    const router = useRouter();

    return (

        <TouchableOpacity
            onPress={() => router.back()}
            style={{
                alignSelf: "flex-start",
                borderCurve: "continuous",
                padding: 5,
            }}
        >
            <Ionicons
                name="chevron-back-circle-outline"
                size={26}
                color="black"
            />
        </TouchableOpacity>
    )
}
export default BackButton
const styles = StyleSheet.create({})
