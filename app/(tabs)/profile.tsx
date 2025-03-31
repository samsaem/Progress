import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import ScreenWrapper from "@/components/ScreenWrapper";
import {useAuth} from "@/contexts/authContext";
import {signOut} from "@firebase/auth";
import {auth} from "@/config/firebase";
import {verticalScale} from "@/utils/styling";
import { Image } from 'expo-image';
import {colors, spacingY} from "@/constants/theme";
import {getProfileImage} from "@/services/imageService";
import {accountOptionType} from "@/types";
import {router} from "expo-router";

const Profile = () => {
    const {user} = useAuth();
    //console.log("user: ", user);

    const accountOptions: accountOptionType[] = [
        {
            title: "Edit Profile",
            routeName: '/(modals)/profileModal',
        },
        {
            title: "Logout",
        },
    ]

    const handleLogout = async () => {
        await signOut(auth);
    }

    const showLogoutAlert = () => {
        Alert.alert("Confirm", "Are you sure you want to logout?", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel delete"),
                style: "cancel",
            },
            {
                text: "Logout",
                onPress: () => handleLogout(),
                style: "destructive",
            },
        ]);
    };

    const handlePress = async (item: accountOptionType) => {
        if (item?.title == "Logout") {
            showLogoutAlert();
        }
        // navigate to router for item from accountOptionType
        if (item?.routeName) router.push(item?.routeName);
    };

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Text>(3) PROFILE PAGE</Text>

                {/* USER'S INFO */}
                <View style={styles.userInfo}>
                    <View>
                        {/* PFP */}
                        <Image
                            style={styles.avatar}
                            source={getProfileImage(user?.image)}
                            contentFit="cover"
                            transition={100}
                            />

                    </View>

                    {/* NAME */}
                    <Text>{user?.name}</Text>

                    {/* EMAIL */}
                    <Text>{user?.email}</Text>

                </View>

            </View>

            {/* ACCOUNT OPTIONS */}
            <View style={styles.container}>
                {
                    accountOptions.map((item, index) => {
                        return (
                            <View
                                style={styles.listItem}
                                key={index.toString()}
                            >
                                <TouchableOpacity
                                    onPress={() => handlePress(item)}
                                    style={{ padding: 12, backgroundColor: 'green', borderRadius: 8 }}
                                >
                                    <Text>{item.title}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </View>
        </ScreenWrapper>
    )
}
export default Profile
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userInfo: {
        gap: verticalScale(4),
        alignItems: "center",
    },
    avatar: {
        alignSelf: "center",
        backgroundColor: colors.neutral300,
        height: verticalScale(135),
        width: verticalScale(135),
        borderRadius: 200,
        // overflow: "hidden",
        // position: "relative",
    },
    accountOptions: {
        marginTop: spacingY._35,
    },
    listItem: {
        marginBottom: verticalScale(17),
    },
})
