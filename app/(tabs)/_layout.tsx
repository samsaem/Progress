import {StyleSheet} from 'react-native'
import React from 'react'
import {Tabs} from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                headerTitleStyle: {
                    fontWeight: "600",
                },
                headerShadowVisible: false,
                tabBarStyle: {
                    borderTopWidth: 1,
                    paddingTop: 4,
                    //paddingBottom: 2,
                    //height: 60,
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title:'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={26} color="black" />
                    )
                }}
            />
            <Tabs.Screen
                name="summary"
                options={{
                    title:'Summary',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list-outline" size={26} color="black" />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title:'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={26} color="black" />
                    )
                }}

            />
        </Tabs>
    )
}
export default _Layout
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
