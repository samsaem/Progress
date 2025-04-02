import {TextInput, TextInputProps, ViewStyle} from "react-native";
import React from "react";
import {Timestamp} from "@firebase/firestore";

export type ScreenWrapperProps = {
    style?: ViewStyle;
    children: React.ReactNode;
}

export interface InputProps extends TextInputProps {
    icon?: React.ReactNode;
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
    // new info
    date: Date | Timestamp | string;
    description: string,
    // old
    image: any;
    amount?: number;
};

export type accountOptionType = {
    title: string;
    icon: React.ReactNode;
    bgColor: string;
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

export type ImageUploadProps = {
    file?: any;
    onSelect: (file: any) => void;
    onClear: () => void;
    containerStyle?: ViewStyle;
    imageStyle?: ViewStyle;
    placeholder?: string;
};