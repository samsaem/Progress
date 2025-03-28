import {StyleSheet, Text, View} from 'react-native'
import React from 'react'

const LogIn = () => {
    return (
        <View style={styles.container}>
            <Text>Login</Text>
        </View>
    )
}
export default LogIn
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
