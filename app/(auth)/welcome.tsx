import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import ScreenWrapper from "@/components/ScreenWrapper";
import {useRouter} from "expo-router";
import BackButton from "@/components/BackButton";

const Welcome = () => {
    const router = useRouter();

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Text>Welcome to Progression</Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                    <Text>Go to Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                    <Text>Go to Register</Text>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
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
