import {Alert, StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import ModalWrapper from "@/components/ModalWrapper";
import {spacingX, spacingY} from "@/constants/theme";
import {router} from "expo-router";
import {CategoryType} from "@/types";
import {useAuth} from "@/contexts/authContext";
import {scale, verticalScale} from "@/utils/styling";

import Input from "@/components/Input";
import {createOrUpdateCategory} from "@/services/categoryService";

const CategoryModal = () => {
    // for user's info
    const [category, setCategory] = useState<CategoryType>({
        name: "",
    });
    const [loading, setLoading] = useState(false);

    // firebase auth
    const {user, updateUserData} = useAuth();

    const onSubmit = async () => {
        let {name} = category;
        if ( !name.trim() ) {
            Alert.alert("Category", "Please fill all the fields!");
            return;
        }
        setLoading(true);

        let data: CategoryType = {
            name,
            uid: user?.uid,
        };
        const res = await createOrUpdateCategory(data);

        setLoading(false);
        console.log("category result: ", res);

        if (res.success) {
            router.back();
        } else {
            Alert.alert("Category: ", res.msg);
        }
    };

    return (
        <ModalWrapper>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={router.back}
                    style={{ padding: 5, backgroundColor: 'green', borderRadius: 8 }}
                >
                    <Text>Go Back Btn</Text>
                </TouchableOpacity>

                {/* ADD CATEGORY MODAL */}
                <Text>ADD CATEGORY MODAL</Text>

                <ScrollView contentContainerStyle={styles.form}>

                    {/* CATEGORY NAME */}
                    <View style={styles.inputContainer}>
                        <Text>Category Name</Text>
                        <Input
                            placeholder="Type workout category"
                            value={category.name}
                            onChangeText={(value) => setCategory({...category, name: value})}
                        />
                    </View>

                    {/* ADD CATEGORY BTN */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={{ padding: 5, backgroundColor: 'green', borderRadius: 8 }}
                            onPress={onSubmit}
                        >
                            {loading
                                ? <ActivityIndicator color="white" />
                                : <Text style={{ color: 'white' }}>Add Category</Text>
                            }
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        </ModalWrapper>
    );
};

export default CategoryModal
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
