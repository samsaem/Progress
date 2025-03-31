import {Platform, StatusBar, StyleSheet, View} from 'react-native'
import React from 'react'
import {colors, spacingX, spacingY} from "@/constants/theme";
import {ModalWrapperProps} from "@/types";

const isIos = Platform.OS == "ios";

const ModalWrapper = (
    {
        style,
        children,
        bg = colors.white
    }: ModalWrapperProps) => {
    return (
        <View style={[styles.container, {backgroundColor: bg}, style && style]}>
            <StatusBar style="light"/>
            {children}
        </View>
    )
}
export default ModalWrapper
const styles = StyleSheet.create({
    container: {
        paddingTop: isIos ? spacingX._15 : 50,
        paddingBottom: isIos ? spacingY._20 : spacingY._10,
        flex: 1,
    },
});
