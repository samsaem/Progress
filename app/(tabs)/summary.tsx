import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import ScreenWrapper from "@/components/ScreenWrapper";
    import {colors, radius, spacingX, spacingY} from "@/constants/theme";
import {verticalScale} from "@/utils/styling";
import {router} from "expo-router";
import ModalWrapper from "@/components/ModalWrapper";

const Summary = () => {
    const getTotalCategory = () => {
        return 3;
    }
    return (
        <ModalWrapper>
            <View style={styles.container}>
                <Text>(2) SUMMARY PAGE</Text>

                {/* TOTAL CATEGORY: TOP */}
                <View style={styles.totalCategory}>
                    <Text>Total Category: {getTotalCategory()}</Text>
                </View>
            </View>

            {/* MY CATEGORY: MIDDLE */}
            <View style={styles.category}>
                <View style={styles.flexRow}>
                    <Text>My Category</Text>

                    <TouchableOpacity
                        onPress={() => router.push("/(modals)/categoryModal")}
                        style={{ padding: 12, backgroundColor: 'green', borderRadius: 8 }}
                    >
                        <Text>Add Category</Text>
                    </TouchableOpacity>
                </View>

                {/* CATEGORY LIST */}
                <View>

                </View>

            </View>

        </ModalWrapper>
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
        //alignItems: "center",
    },
    category: {
        gap: verticalScale(4),
        //alignItems: "center",
    },
    flexRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacingY._10,
    },
})
