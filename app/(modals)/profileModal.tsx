import {Alert, StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import ModalWrapper from "@/components/ModalWrapper";
import {spacingX, spacingY} from "@/constants/theme";
import {router} from "expo-router";
import {UserDataType} from "@/types";
import {useAuth} from "@/contexts/authContext";
import {scale, verticalScale} from "@/utils/styling";
import {getProfileImage} from "@/services/imageService";
import { Image } from 'expo-image';
import Input from "@/components/Input";
import {updateUser} from "@/services/userService";

// to access gallery
import * as ImagePicker from 'expo-image-picker';


const ProfileModal = () => {
    // for user's info
    const [userData, setUserData] = useState<UserDataType>({
         name: "",
        image: null,
    });
    const [loading, setLoading] = useState(false);

    // firebase auth
    const {user, updateUserData} = useAuth();

    // connect with backend to update
    useEffect(() => {
        setUserData({
            name: user?.name || "",
            image: user?.image || null,
        });
    }, [user]);

    const onSubmit = async () => {
        let {name, image} = userData;
        if ( !name.trim() || !image ) {
            Alert.alert("User", "Please fill all the fields!");
            return;
        }
        setLoading(true);
        const res = await updateUser(user?.uid as string, userData);
        setLoading(false);
        if (res.success) {
            updateUserData(user?.uid as string);
            router.back();
        } else {
            Alert.alert("User", res.msg);
        }
    };

    const onSelectImage = (file: any) => {
        // console.log("file: ", file);
        if (file) setUserData({ ...userData, image: file });
    };

    // from expo-image-picker library
    const onPickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        console.log(result.assets[0]);

        if (!result.canceled) {
            setUserData({
                ...userData,
                image: result.assets[0]
            });
        }
    }

    return (
        <ModalWrapper>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={router.back}
                    style={{ padding: 5, backgroundColor: 'green', borderRadius: 8 }}
                >
                    <Text>Go Back Btn</Text>
                </TouchableOpacity>

                {/* PROFILE MODAL */}
                <Text>UPDATE PROFILE MODAL</Text>

                <ScrollView contentContainerStyle={styles.form}>
                    {/* PFP */}
                    <View style={styles.avatarContainer}>
                        <Image
                            style={styles.avatar}
                            source={getProfileImage(userData.image)}
                            contentFit="cover"
                            transition={100}
                        />
                        <TouchableOpacity
                            onPress={onPickImage}
                        >
                            <Text>Choose photo from library</Text>
                        </TouchableOpacity>
                    </View>

                    {/* NAME */}
                    <View style={styles.inputContainer}>
                        <Text>Edit Name</Text>
                        <Input
                            placeholder="Name"
                            value={userData.name}
                            onChangeText={(value) => setUserData({...userData, name: value})}
                        />
                    </View>

                    {/* UPDATE PROFILE BTN */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={{ padding: 5, backgroundColor: 'green', borderRadius: 8 }}
                            onPress={onSubmit}
                        >
                            {loading
                                ? <ActivityIndicator color="white" />
                                : <Text style={{ color: 'white' }}>Update Profile</Text>
                            }
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        </ModalWrapper>
    );
};

export default ProfileModal
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: spacingY._20,
        // paddingVertical: spacingY._30,
    },
    footer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: spacingX._20,
        gap: scale(12),
        paddingTop: spacingY._15,
        //borderTopColor: colors.neutral700,
        marginBottom: spacingY._5,
        borderTopWidth: 1,
    },
    form: {
        gap: spacingY._30,
        marginTop: spacingY._15,
    },
    avatarContainer: {
        position: "relative",
        alignSelf: "center",
    },
    avatar: {
        alignSelf: "center",
        //backgroundColor: colors.neutral300,
        height: verticalScale(135),
        width: verticalScale(135),
        borderRadius: 200,
        borderWidth: 1,
        //borderColor: colors.neutral500,
        // overflow: "hidden",
        // position: "relative",
    },
    editIcon: {
        position: "absolute",
        bottom: spacingY._5,
        right: spacingY._7,
        borderRadius: 100,
        //backgroundColor: colors.neutral100,
        //shadowColor: colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 4,
        padding: spacingY._7,
    },
    inputContainer: {
        gap: spacingY._10,
    },
})
