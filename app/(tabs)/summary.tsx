import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import ScreenWrapper from "@/components/ScreenWrapper";
    import {colors, radius, spacingX, spacingY} from "@/constants/theme";
import {verticalScale} from "@/utils/styling";
import {router} from "expo-router";

const Summary = () => {
    const getTotalDay = () => {
        return 3;
    }
    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Text>(2) SUMMARY PAGE</Text>

                {/* TOTAL CATEGORY: TOP */}
                <View style={styles.totalCategory}>
                    <Text>Workout {getTotalDay()}/365</Text>
                    <Text>Total Category</Text>
                    <Text>------------------</Text>

                    {/* MY CATEGORY: MIDDLE PAGE */}
                    <View style={styles.myCategory}>
                        <Text>My Category</Text>
                        <TouchableOpacity
                            onPress={() => router.push("/(modals)/categoryModal")}
                            style={{ padding: 12, backgroundColor: 'green', borderRadius: 8 }}
                        >
                            <Text>Add Category Btn</Text>
                        </TouchableOpacity>
                        <Text>------------------</Text>
                    </View>
                </View>
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
    totalCategory: {
        gap: verticalScale(4),
        alignItems: "center",
    },
    myCategory: {
        gap: verticalScale(4),
        alignItems: "center",
    }
})
