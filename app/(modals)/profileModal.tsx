import {Alert, StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import ModalWrapper from "@/components/ModalWrapper";
import {colors, spacingX, spacingY} from "@/constants/theme";
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
import * as Icons from "phosphor-react-native";
import BackButton from "@/components/BackButton";


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
                <View style={styles.header}
                >
                    <BackButton/>
                    <Text style={styles.headerText}>Update Profile</Text>
                </View>

                <ScrollView contentContainerStyle={styles.form}>
                    {/* PFP */}
                    <View style={styles.avatarContainer}>
                        <Image
                            style={styles.avatar}
                            source={getProfileImage(userData.image)}
                            contentFit="cover"
                            transition={100}
                        />
                        <TouchableOpacity style={styles.editIcon} onPress={onPickImage}>
                            <Icons.Pencil
                                size={verticalScale(20)}
                                //color={colors.neutral800}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* NAME */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.nameText}>Edit Name</Text>
                        <Input
                            placeholder="Name"
                            value={userData.name}
                            onChangeText={(value) => setUserData({...userData, name: value})}
                        />
                    </View>

                </ScrollView>
            </View>

            {/* UPDATE PROFILE BTN */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={{
                        padding: 10,
                        backgroundColor: 'green',
                        borderRadius: 10,
                        flex: 1,
                        alignItems: 'center',
                }}
                    onPress={onSubmit}
                >
                    {loading
                        ? <ActivityIndicator color="white" />
                        : <Text style={{
                            color: 'white',
                            fontSize: 19,
                            fontWeight: '600',
                        }}>Update</Text>
                    }
                </TouchableOpacity>
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
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    headerText: {
        fontSize: 22,
        fontWeight: '600',
        alignSelf: "center",
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
        height: verticalScale(135),
        width: verticalScale(135),
        borderRadius: 200,
        borderWidth: 1,
        borderColor: colors.white,
    },
    nameText: {
        fontSize: 20,
        fontWeight: '400',
    },
    editIcon: {
        position: "absolute",
        bottom: spacingY._5,
        right: spacingY._7,
        borderRadius: 100,
        backgroundColor: "#e5e5e5",
        shadowColor: "#e5e5e5",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 4,
        padding: spacingY._7,
    },
    inputContainer: {
        gap: spacingY._10,
    },
    footer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: spacingX._20,
        gap: scale(12),
        paddingTop: spacingY._15,
        borderTopColor: "#fff",
        marginBottom: spacingY._30,
        borderTopWidth: 1,
    },
})
