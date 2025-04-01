import {StyleSheet} from 'react-native'
import React from 'react'
import {Stack} from "expo-router";
import {AuthProvider} from "@/contexts/authContext";

const StackLayout = () => {
    return (
        <Stack
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen
                name="(modals)/categoryModal"
                options={{
                    presentation: 'modal'
                }}
            />
            <Stack.Screen
                name="(modals)/profileModal"
                options={{
                    presentation: 'modal'
                }}
            />
            <Stack.Screen
                name="(modals)/workoutModal"
                options={{
                    presentation: 'modal'
                }}
            />
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <StackLayout />
        </AuthProvider>
    );
}

const styles = StyleSheet.create({})
