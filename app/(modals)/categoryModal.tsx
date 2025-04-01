import {Alert, StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import ModalWrapper from "@/components/ModalWrapper";
import {spacingX, spacingY} from "@/constants/theme";
import {router, useLocalSearchParams} from "expo-router";
import {CategoryType} from "@/types";
import {useAuth} from "@/contexts/authContext";
import {scale, verticalScale} from "@/utils/styling";

import Input from "@/components/Input";
import {createOrUpdateCategory, deleteCategory} from "@/services/categoryService";

const CategoryModal = () => {
    // for user's info
    const [category, setCategory] = useState<CategoryType>({
        name: "",
    });
    const [loading, setLoading] = useState(false);

    // firebase auth
    const {user, updateUserData} = useAuth();

    // edit Category
    const oldCategory: { name: string; id?: string } =
        useLocalSearchParams();
    //console.log("params: ", oldCategory);

    useEffect(() => {
        if (oldCategory?.id) {
            setCategory({
                name: oldCategory.name,
            });
        }
    }, []);

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

        // update oldCategory -> another name
        if (oldCategory?.id) data.id = oldCategory?.id;

        const res = await createOrUpdateCategory(data);

        setLoading(false);
        console.log("category result: ", res);

        if (res.success) {
            router.back();
        } else {
            Alert.alert("Category: ", res.msg);
        }
    };

    const showDeleteAlert = () => {
        Alert.alert(
            "Confirm",
            "Are you sure about deleting this category? \n All data related to this Category will also be removed.",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel delete"),
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => onDelete(),
                    style: "destructive",
                },
            ]
        );
    };

    const onDelete = async () => {
        if (!oldCategory?.id) return;
        setLoading(true);
        const res = await deleteCategory(oldCategory.id as string);
        setLoading(false);

        if (res.success) {
            router.back();
        } else {
            Alert.alert("Category", res.msg);
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

                {/* CATEGORY MODAL */}
                <Text>
                    {oldCategory?.id
                        ? "Update Category"
                        : "Add Category"}
                </Text>

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

                    <View style={styles.footer}>
                        {
                            // if exists oldCategory
                            // show Delete Button
                            oldCategory?.id && (
                                <TouchableOpacity
                                    style={{ padding: 5, backgroundColor: 'green', borderRadius: 8 }}
                                    onPress={onDelete}
                                >
                                    {loading
                                        ? <ActivityIndicator color="white" />
                                        : <Text style={{ color: 'white' }}>
                                            Delete Category
                                        </Text>
                                    }
                                </TouchableOpacity>
                            )
                        }


                        {/* ADD CATEGORY BTN */}
                        <TouchableOpacity
                            style={{ padding: 5, backgroundColor: 'green', borderRadius: 8 }}
                            onPress={onSubmit}
                        >
                            {loading
                                ? <ActivityIndicator color="white" />
                                : <Text style={{ color: 'white' }}>
                                    {oldCategory?.id
                                        ? "Update Category"
                                        : "Add Category"}
                                </Text>
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
    inputContainer: {
        gap: spacingY._10,
    },
})
