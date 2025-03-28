import {TextInput, TextInputProps, ViewStyle} from "react-native";
import React from "react";

export type ScreenWrapperProps = {
    style?: ViewStyle;
    children: React.ReactNode;
}

export interface InputProps extends TextInputProps {
    containerStyle?: ViewStyle;
    inputStyle?: ViewStyle;
    inputRef?: React.RefObject<TextInput>;
}