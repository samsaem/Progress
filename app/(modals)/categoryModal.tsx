import {Alert, StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import ModalWrapper from "@/components/ModalWrapper";
import {spacingX, spacingY} from "@/constants/theme";
import {router, useLocalSearchParams} from "expo-router";
import {CategoryType} from "@/types";
import {useAuth} from "@/contexts/authContext";
import {scale} from "@/utils/styling";

import Input from "@/components/Input";
import {createOrUpdateCategory, deleteCategory} from "@/services/categoryService";
import BackButton from "@/components/BackButton";
import ImageUpload from "@/components/ImageUpload";

const CategoryModal = () => {
    // for user's info
    const [category, setCategory] = useState<CategoryType>({
        name: "",
        image: null,
    });
    const [loading, setLoading] = useState(false);

    // firebase auth
    const {user} = useAuth();

    // edit Category
    const oldCategory: { name: string, image: string, id?: string } =
        useLocalSearchParams();
    //console.log("params: ", oldCategory);

    useEffect(() => {
        if (oldCategory?.id) {
            setCategory({
                name: oldCategory.name,
                image: oldCategory?.image || null,
            });
        }
    }, []);

    const onSelectImage = (file: any) => {
        // console.log("file: ", file);
        if (file) setCategory({ ...category, image: file });
    };

    const onSubmit = async () => {
        let {name, image} = category;
        if ( !name.trim() ) {
            Alert.alert("Category", "Please fill all the fields!");
            return;
        }
        setLoading(true);

        let data: CategoryType = {
            name,
            image,
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
            "Your tracked progress will be gone 😱 \n Are you sure about this?",
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
                {/* CATEGORY MODAL */}

                <View style={styles.header}
                >
                    <BackButton/>
                    <Text style={styles.headerText}>
                        {oldCategory?.id
                            ? "Update Progress"
                            : "Add Progress"}
                    </Text>
                </View>


                <ScrollView contentContainerStyle={styles.form}>
                    {/* WORKOUT CATEGORY */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.nameText}>Category Name</Text>
                        <Input
                            placeholder="Type workout category"
                            value={category.name}
                            onChangeText={(value) => setCategory({...category, name: value})}
                        />
                    </View>

                    {/* ADD PHOTOS */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.nameText}>Photo (optional)</Text>
                        <ImageUpload
                            file={category.image}
                            onSelect={onSelectImage}
                            onClear={() => setCategory({ ...category, image: null })}
                            placeholder="Upload Image"
                        />
                    </View>


                </ScrollView>

                <View style={styles.footer}>
                    {
                        // if exists oldCategory
                        // show Delete Button
                        oldCategory?.id && (
                            <TouchableOpacity
                                style={{
                                    padding: 10,
                                    backgroundColor: 'green',
                                    borderRadius: 10,
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onPress={showDeleteAlert}
                            >
                                {loading
                                    ? <ActivityIndicator color="white" />
                                    : <Text style={{ color: 'white',
                                        fontSize: 19,
                                        fontWeight: '600',
                                        alignItems: 'center'
                                    }}
                                    >
                                        Delete Progress
                                    </Text>
                                }
                            </TouchableOpacity>
                        )
                    }

                    {/* ADD CATEGORY BTN */}
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
                            : <Text style={{ color: 'white',
                                fontSize: 19,
                                fontWeight: '600', }}
                            >
                                {oldCategory?.id
                                    ? "Update Progress"
                                    : "Add Progress"}
                            </Text>
                        }
                    </TouchableOpacity>
                </View>
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
    inputContainer: {
        gap: spacingY._10,
    },
    nameText: {
        fontSize: 20,
        fontWeight: '400',
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
    form: {
        gap: spacingY._30,
        marginTop: spacingY._15,
    },
})
