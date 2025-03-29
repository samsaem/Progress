import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import ScreenWrapper from "@/components/ScreenWrapper";

const Summary = () => {
    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Text>Summary</Text>
            </View>
        </ScreenWrapper>
    )
}
export default Summary
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
