import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import ScreenWrapper from "@/components/ScreenWrapper";
import {useAuth} from "@/contexts/authContext";
import {signOut} from "@firebase/auth";
import {auth} from "@/config/firebase";
import {verticalScale} from "@/utils/styling";

const Profile = () => {
    const {user} = useAuth();
    console.log("user: ", user);

    const handleLogout = async () => {
        await signOut(auth);
    }

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Text>Profile</Text>

                <View style={styles.userInfo}>
                    {/* NAME */}
                    <Text>{user?.name}</Text>

                    {/* EMAIL */}
                    <Text>{user?.email}</Text>

                </View>

                {/* LOGOUT BTN */}
                <TouchableOpacity
                    onPress={handleLogout}
                    style={{ padding: 12, backgroundColor: 'green', borderRadius: 8 }}
                >
                    <Text>Logout Btn</Text>
                </TouchableOpacity>

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
})
