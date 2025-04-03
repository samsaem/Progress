import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import React from "react";
import {router, useRouter} from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import { scale, verticalScale } from "@/utils/styling";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

const WelcomePage = () => {
    const router = useRouter();
    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View>
                    <Animated.Image
                        entering={FadeIn.duration(500)}
                        source={require("../../assets/images/nyancat.gif")}
                        style={styles.welcomeTopImage}
                        resizeMode="contain"
                    />

                    <Text style={{
                        fontSize: 22,
                        fontWeight: 700,
                        alignSelf: "center",
                    }}>Welcome to Progress 🎉</Text>

                    <Animated.Image
                        entering={FadeIn.duration(500)}
                        source={require("../../assets/images/nyancat.gif")}
                        style={styles.welcomeTopImage}
                        resizeMode="contain"
                    />

                    <View>
                        <Animated.View
                            entering={FadeInDown.duration(500).springify().damping(12)}
                            style={{ alignItems: "center"
                        }}
                        >

                            <View style={styles.loginContainer}>
                                <TouchableOpacity
                                    onPress={() => router.push('/(auth)/login')}
                                    style={styles.buttonContainer}
                                >
                                    <Text style={styles.loginButton}>Let's get started!</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        gap: spacingY._20,
    },
    welcomeTopImage: {
        width: "100%",
        height: verticalScale(300),
        alignSelf: "center",
    },
    welcomeBottomImage: {
        width: "100%",
        height: verticalScale(300),
        alignSelf: "flex-end",
    },
    loginButton: {
        alignSelf: "center",
        fontWeight: "600",
        color: 'white',
        fontSize: 19,
    },
    buttonContainer: {
        width: "50%",
        padding: 12,
        backgroundColor: '#067FD0',
        borderRadius: 12,
    },
    loginContainer: {
    }
});

export default WelcomePage;
