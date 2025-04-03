import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import Welcome from "@/app/(auth)/login";
import ScreenWrapper from '@/components/ScreenWrapper';

const Index = () => {
    return (
        <ScreenWrapper>
            <Welcome />
        </ScreenWrapper>
    );
};
export default Index
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
