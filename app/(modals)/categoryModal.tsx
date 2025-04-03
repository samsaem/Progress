import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    ActivityIndicator,
    Pressable,
    Platform,
} from 'react-native'
import React, {useEffect, useState} from 'react'
import ModalWrapper from "@/components/ModalWrapper";
import {colors, radius, spacingX, spacingY} from "@/constants/theme";
import {router, useLocalSearchParams} from "expo-router";
import {CategoryType} from "@/types";
import {useAuth} from "@/contexts/authContext";
import {scale, verticalScale} from "@/utils/styling";

import Input from "@/components/Input";
import {createOrUpdateCategory, deleteCategory} from "@/services/categoryService";
import BackButton from "@/components/BackButton";
import ImageUpload from "@/components/ImageUpload";

import DateTimePicker from "@react-native-community/datetimepicker";
import * as Icons from "phosphor-react-native";

const CategoryModal = () => {
    // for user's info
    const [category, setCategory] = useState<CategoryType>({
        name: "",
        date: new Date(),
        description: "",
        image: null,
        amount: 0,
    });
    const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    // firebase auth
    const {user} = useAuth();

    type paramType = {
        name: string,
        date: string;
        description: string;
        image: string,
        id?: string
        amount: string,
    }

    // edit Category
    const oldCategory: paramType = useLocalSearchParams();
    //console.log("params: ", oldCategory);

    useEffect(() => {
        if (oldCategory?.id) {
            setCategory({
                name: oldCategory.name,
                date: new Date(oldCategory.date),
                description: oldCategory.description || "",
                image: oldCategory?.image || null,
                amount: Number(oldCategory.amount),
            });
        }
    }, []);

    const onSelectImage = (file: any) => {
        // console.log("file: ", file);
        if (file) setCategory({ ...category, image: file });
    };

    const onSubmit = async () => {
        let {name, date, description, image, amount} = category;
        if ( !name.trim()) {
            Alert.alert("Category", "Please fill in all fields!");
            return;
        }
        setLoading(true);

        let data: CategoryType = {
            name,
            date,
            description,
            image,
            amount,
            uid: user?.uid,
        };

        // update data for Category
        if (oldCategory?.id) data.id = oldCategory?.id;

        const res = await createOrUpdateCategory(data);

        setLoading(false);
        console.log("result: ", res);

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

    // https://www.npmjs.com/package/@react-native-community/datetimepicker#onchange-optional
    const onDateChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || category.date;
        setCategory({ ...category, date: currentDate }); // Update the date state
        setShowDatePicker(false);
    };

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
                        <Text style={styles.nameText}>Workout Name</Text>
                        <Input
                            placeholder="Type workout category"
                            value={category.name}
                            onChangeText={(value) => setCategory({...category, name: value})}
                        />
                    </View>

                    {/* DATE */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.nameText}>
                            Date
                        </Text>
                        {!showDatePicker && (
                            <Pressable
                                style={styles.dateInput}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Text style={{fontSize: verticalScale(14),}}>
                                    {(category?.date as Date)?.toLocaleDateString()}
                                </Text>
                            </Pressable>
                        )}
                        {showDatePicker && (
                            <View>
                                <DateTimePicker
                                    value={category.date as Date}
                                    mode="date"
                                    display={Platform.OS == "ios" ? "spinner" : "default"}
                                    onChange={onDateChange}
                                />
                                {Platform.OS == "ios" && (
                                    <TouchableOpacity
                                        style={styles.datePickerButton}
                                        onPress={() => setShowDatePicker(false)}
                                    >
                                        <Text>
                                            Choose Date
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}
                    </View>

                    {/* NOTE */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.nameText}>Note (optional)</Text>
                        <Input
                            placeholder="Note to self"
                            value={category.description}
                            onChangeText={(value) => setCategory({...category, description: value})}
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
                        oldCategory?.id && !loading && (
                            <TouchableOpacity
                                style={{
                                    padding: 10,
                                    backgroundColor: '#FA003F',
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
                                        <Icons.Trash
                                            size={verticalScale(24)}
                                            weight="bold"
                                            color={colors.white}
                                        />
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
    dateInput: {
        flexDirection: "row",
        height: verticalScale(54),
        alignItems: "center",
        borderWidth: 1,
        //borderColor: colors.neutral300,
        borderRadius: radius._17,
        borderCurve: "continuous",
        paddingHorizontal: spacingX._15,
    },
    datePickerButton: {
        //backgroundColor: colors.neutral700,
        alignSelf: "flex-end",
        padding: spacingY._7,
        marginRight: spacingX._7,
        paddingHorizontal: spacingY._15,
        borderRadius: radius._10,
    },
})
