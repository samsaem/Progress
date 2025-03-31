import {Alert, Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import ModalWrapper from "@/components/ModalWrapper";
import {spacingX, spacingY} from "@/constants/theme";
import Input from "@/components/Input";
import {router} from "expo-router";
import {CategoryType} from "@/types";
import {useAuth} from "@/contexts/authContext";

const CategoryModal = () => {
    const {user} = useAuth();
    const [category, setCategory] = useState<CategoryType>({
        name: "",
    })
    const [loading, setLoading] = useState(false);

    // SUBMIT button
    const onSubmit = async () => {
        let { name } = category;

        if (loading) return;
        setLoading(true);

        if (!name.trim()) {
            Alert.alert("Category", "Please enter a valid name");
            return;
        }

        // need to continue
    }

    return (
        <ModalWrapper>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => router.push("/(tabs)/summary")}
                    style={{ padding: 5, backgroundColor: 'green', borderRadius: 8 }}
                >
                    <Text>Go Back Btn</Text>
                </TouchableOpacity>

                <Text>ADD CATEGORY MODAL</Text>

                <View style={styles.inputContainer}>
                    <Text>New category</Text>
                    <Input
                        placeholder="Category name"
                    />
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={() => router.push("/(modals)/categoryModal")}
                        style={{ padding: 12, backgroundColor: 'green', borderRadius: 8 }}
                    >
                        <Text>Add Category</Text>
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
        paddingHorizontal: spacingY._20,
    },
    inputContainer: {
        gap: spacingY._10,
    },
    footer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        gap: spacingY._10,
    },
})
