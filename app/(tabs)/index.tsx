import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import ScreenWrapper from "@/components/ScreenWrapper";
    import {colors, radius, spacingX, spacingY} from "@/constants/theme";
import {verticalScale} from "@/utils/styling";
import {router} from "expo-router";
import useFetchData from "@/hooks/useFetchData";
import {CategoryType} from "@/types";
import {orderBy, where} from "@firebase/firestore";
import {useAuth} from "@/contexts/authContext";
import CategoryListItem from "@/components/CategoryListItem";
import Ionicons from "@expo/vector-icons/Ionicons";

const Index = () => {
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
            if (item?.name) {
                const itemCount = 1;
                total = total + itemCount;
            }
            return total;
        }, 0);

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                {/* TOTAL CATEGORY: TOP */}
                <View style={styles.balanceView}>
                    <Text style={{
                        fontSize: '16',
                        fontWeight: '600',
                        color: "#404040",
                    }}
                    >
                        Total Entry</Text>
                    <Text style={{
                        fontSize: '45',
                        fontWeight: '400',
                    }}>
                        {getTotalSession()}
                    </Text>

                </View>

                {/* MY CATEGORY: MIDDLE */}
                <View style={styles.category}>
                    <View style={styles.flexRow}>
                        <Text style={{
                            fontSize: '20',
                            fontWeight: '500'
                        }}>
                            My Progress
                        </Text>
                        <TouchableOpacity
                            onPress={() => router.push("/(modals)/categoryModal")}
                        >
                            <Ionicons
                                name="add-circle"
                                size={30}
                                color="#067FD0"
                            />
                        </TouchableOpacity>
                    </View>

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
export default Index
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    category: {
        flex: 1,
        borderTopRightRadius: radius._30,
        borderTopLeftRadius: radius._30,
        padding: spacingX._20,
        paddingTop: spacingX._25,
        backgroundColor: '#e5e5e5',
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
        justifyContent: "center",
        alignItems: "center",
    },
})
