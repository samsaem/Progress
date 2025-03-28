import {Dimensions, Platform, StyleSheet, View} from 'react-native'
import React from 'react'
import {ScreenWrapperProps} from "@/types";
const {height} = Dimensions.get("window");

const ScreenWrapper = ({style, children}: ScreenWrapperProps) => {
    let paddingTop = Platform.OS == 'ios' ? height * 0.06 : 50;
    return (
        <View style={[
            {
                paddingTop,
                flex: 1,
            }
        ]}>
            {children}
        </View>
    )
}
export default ScreenWrapper
const styles = StyleSheet.create({})
