import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {useAuth} from "@/contexts/authContext";
import ScreenWrapper from "@/components/ScreenWrapper";
import {spacingX, spacingY} from "@/constants/theme";
import {verticalScale} from "@/utils/styling";
import HomeCard from "@/components/HomeCard";
import WorkoutList from "@/components/WorkoutList";

const Home = () => {
    const {user} = useAuth();

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Text>(1) HOME PAGE</Text>

                {/* HEADER */}
                <View style={styles.header}>
                    <View style={{ gap: 4 }}>
                        <Text>Hello, {user?.name}</Text>
                    </View>
                </View>

                {/* TOTAL WORKOUT and RECENT WORKOUT */}
                <ScrollView
                    contentContainerStyle={styles.scrollViewStyle}
                    showsVerticalScrollIndicator={false}
                >
                    <View>
                        <HomeCard />
                    </View>

                    <WorkoutList />


                </ScrollView>

            </View>
        </ScreenWrapper>

    )
}
export default Home
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: spacingX._20,
        marginTop: verticalScale(8),
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacingY._10,
    },
    scrollViewStyle: {
        marginTop: spacingY._10,
        paddingBottom: verticalScale(100),
        gap: spacingY._25,
    }
})
