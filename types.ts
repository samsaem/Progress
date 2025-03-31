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

export type UserType = {
    uid?: string;
    email?: string | null;
    name: string | null;
    image?: any;
} | null;

// for backend auth data
export type AuthContextType = {
    user: UserType;
    setUser: Function;
    login : (
        email: string,
        password: string
    ) => Promise<{ success: boolean; msg?: string }>;

    register: (
        email: string,
        password: string,
        name: string
    ) => Promise<{ success: boolean; msg?: string }>;

    updateUserData: (userId: string) => Promise<void>;
};

export type ModalWrapperProps = {
    style?: ViewStyle;
    children: React.ReactNode;
    bg?: string;
}

// categoryModal
export type CategoryType = {
    id?: string;
    name: string;
    uid?: string;
    created?: Date;
};

export type accountOptionType = {
    title: string;
    //icon: React.ReactNode;
    //bgColor: string;
    routeName?: any;
};

export type UserDataType = {
    name: string;
    image?: any;
};

export type ResponseType = {
    success: boolean;
    data?: any;
    msg?: string;
};

