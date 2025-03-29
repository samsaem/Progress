import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {Tabs} from "expo-router";
import {CustomTabs} from "@/components/CustomTabs";

const _Layout = () => {
    return (
        <Tabs
            tabBar={CustomTabs}
            screenOptions={{headerShown: false}}>
            <Tabs.Screen
                name="index"
                options={{
                    title:'Home'
                }}
            />
            <Tabs.Screen
                name="summary"
                options={{
                    title:'Summary'
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title:'Profile'
                }}
            />
        </Tabs>
    )
}
export default _Layout
const styles = StyleSheet.create({})
