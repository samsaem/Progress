import {View, Text, TextInput, StyleSheet} from 'react-native'
import React from 'react'
import {InputProps} from "@/types";
import {colors, radius, spacingX} from "@/constants/theme";
import {verticalScale} from "@/utils/styling";

const Input = (props: InputProps) => {
    return (
        <View
            style={[styles.container, props.containerStyle && props.containerStyle]}
        >
            {props.icon && props.icon}
            <TextInput
                style={[
                    styles.input,
                ]}
                placeholderTextColor={colors.neutral900}
                ref={props.inputRef && props.inputRef}
                {...props}
            />
        </View>
    );
};
export default Input

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: colors.neutral900,
        borderRadius: radius._17,
        borderCurve: "continuous",
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: verticalScale(54),
        paddingHorizontal: spacingX._15,
        gap: spacingX._10,
    },
    input: {
        flex: 10,
        fontSize: verticalScale(14),
    },
});