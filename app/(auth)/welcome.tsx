import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import ScreenWrapper from "@/components/ScreenWrapper";
import {Link} from "expo-router";

const Welcome = () => {
    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Text>(auth)/welcome - WELCOME PAGE</Text>
                <TouchableOpacity>
                    <Link href="(auth)/login">Go to Login</Link>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Link href="(auth)/signup">Go to Signup</Link>
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
