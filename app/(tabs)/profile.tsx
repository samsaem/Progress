import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import ScreenWrapper from "@/components/ScreenWrapper";
import {useAuth} from "@/contexts/authContext";
import {signOut} from "@firebase/auth";
import {auth} from "@/config/firebase";
import {verticalScale} from "@/utils/styling";
import { Image } from 'expo-image';
import {colors, radius, spacingX, spacingY} from "@/constants/theme";
import {getProfileImage} from "@/services/imageService";
import {accountOptionType} from "@/types";
import {router} from "expo-router";

import Animated, { FadeInDown } from "react-native-reanimated";
import * as Icons from "phosphor-react-native";

const Profile = () => {
    const {user} = useAuth();
    //console.log("user: ", user);

    const accountOptions: accountOptionType[] = [
        {
            title: "Edit Profile",
            icon: (
                <Icons.User
                    size={verticalScale(26)}
                    color={colors.white}
                    weight="fill"
                />
            ),
            routeName: '/(modals)/profileModal',
            bgColor: "#067FD0",
        },
        {
            title: "Logout",
            icon: (
                <Icons.User
                    size={verticalScale(26)}
                    color={colors.white}
                    weight="fill"
                />
            ),
            bgColor: "red",
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
                <Text style={styles.headerText}>PROFILE</Text>

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
                    <Text style={styles.nameText}>
                        {user?.name}
                    </Text>

                    {/* EMAIL */}
                    <Text style={styles.emailText}>
                        {user?.email}
                    </Text>
                </View>

                {/* ACCOUNT OPTIONS */}
                <View style={styles.accountOptions}>
                    {accountOptions.map((item, index) => {
                        return (
                            <Animated.View
                                key={index.toString()}
                                entering={FadeInDown.delay(index * 50)
                                    .springify()
                                    .damping(14)}
                                style={styles.listItem}
                            >
                                <TouchableOpacity
                                    style={styles.flexRow}
                                    onPress={() => handlePress(item)}
                                >
                                    {/* ICON */}
                                    <View style={[
                                            styles.listIcon,
                                            { backgroundColor: item?.bgColor },
                                        ]}
                                    >
                                        {item.icon && item.icon}
                                    </View>

                                    {/* TITLE */}
                                    <Text style={{
                                        flex: 1,
                                        fontSize: 16,
                                        fontWeight: "500",
                                    }}>
                                        {item.title}
                                    </Text>
                                    <Icons.CaretRight
                                        size={verticalScale(20)}
                                        weight="bold"
                                    />
                                </TouchableOpacity>
                            </Animated.View>
                        );
                    })}
                </View>
            </View>
        </ScreenWrapper>
    )
}
export default Profile
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: spacingX._20,
    },
    userInfo: {
        marginTop: verticalScale(30),
        alignItems: "center",
        gap: spacingY._15,
    },
    avatar: {
        alignSelf: "center",
        backgroundColor: colors.neutral300,
        height: verticalScale(135),
        width: verticalScale(135),
        borderRadius: 200,
    },
    headerText: {
        fontSize: 22,
        fontWeight: '600',
        alignSelf: "center",
    },
    nameText: {
        fontSize: 24,
        fontWeight: '400',
    },
    emailText: {
        fontSize: 15,
        fontWeight: '400',
    },
    accountOptions: {
        marginTop: spacingY._35,
    },
    listIcon: {
        height: verticalScale(44),
        width: verticalScale(44),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius._15,
        borderCurve: "continuous",
    },
    listItem: {
        marginBottom: verticalScale(17),
    },
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacingX._10,
    },
})
