import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import ScreenWrapper from "@/components/ScreenWrapper";
    import {colors, radius, spacingX, spacingY} from "@/constants/theme";
import {verticalScale} from "@/utils/styling";
import {router} from "expo-router";
import ModalWrapper from "@/components/ModalWrapper";
import useFetchData from "@/hooks/useFetchData";
import {CategoryType} from "@/types";
import {orderBy, where} from "@firebase/firestore";
import {useAuth} from "@/contexts/authContext";
import CategoryListItem from "@/components/CategoryListItem";

const Summary = () => {
    const {user} = useAuth();
    // fetch data to display Category
    const {data: categories, error, loading} = useFetchData<CategoryType>
    ("categories", [
            where("uid", "==", user?.uid),
            orderBy("created", "desc"),
        ]
    );

    //console.log("Total category: ", categories.length);

    const getTotalSession = () =>
        categories.reduce((total, item) => {
            total = total + (item?.amount || 0);
            return total;
        }, 0);

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Text>(2) SUMMARY PAGE</Text>
                {/* TOTAL CATEGORY: TOP */}
                <View style={styles.balanceView}>
                    <Text>Total Session: {getTotalSession()}</Text>
                </View>
            </View>

            {/* MY CATEGORY: MIDDLE */}
            <View style={styles.category}>
                <View style={styles.flexRow}>
                    <Text>My Category</Text>
                    <TouchableOpacity
                        onPress={() => router.push("/(modals)/categoryModal")}
                        style={{ padding: 12, backgroundColor: 'green', borderRadius: 8 }}
                    >
                        <Text>Add Category</Text>
                    </TouchableOpacity>

                    {/* CATEGORY LIST */}
                    <FlatList
                        data={categories}
                        renderItem={({ item, index }) => (
                            <CategoryListItem item={item} router={router} index={index} />
                        )}
                        contentContainerStyle={styles.listStyle}
                    />
                </View>
            </View>
        </ScreenWrapper>
    )
}
export default Summary
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: verticalScale(4),
    },
    category: {
        flex: 1,
        borderTopRightRadius: radius._30,
        borderTopLeftRadius: radius._30,
        padding: spacingX._20,
        paddingTop: spacingX._25,
    },
    listStyle: {
        paddingVertical: spacingY._25,
        paddingTop: spacingY._15,
    },
    flexRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacingY._10,
    },
    balanceView: {
        height: verticalScale(160),
        //backgroundColor: colors.black,
        justifyContent: "center",
        alignItems: "center",
    },
})
