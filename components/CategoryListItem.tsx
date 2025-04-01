import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { CategoryType } from "@/types";
import { verticalScale } from "@/utils/styling";
import { spacingX } from "@/constants/theme";

import { Router } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";

const CategoryListItem = ({
                            item,
                            index,
                            router,
                        }: {
    item: CategoryType;
    index: number;
    router: Router;
}) => {
    const handleOpen = () => {
        router.push({
            pathname: "/(modals)/categoryModal",
            params: {
                id: item?.id,
                name: item?.name,
            },
        });
    };
    return (
        <Animated.View
            entering={FadeInDown.delay(index * 50)
                .springify()
                .damping(13)}
        >
            <TouchableOpacity style={styles.container} onPress={handleOpen}>
                <View style={styles.nameContainer}>
                    <Text>{item.name}</Text>
                    <Text>
                        {item?.amount?.toFixed(0) || 0}
                    </Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default CategoryListItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: verticalScale(17),
        padding: spacingX._15,
    },
    nameContainer: {
        flex: 1,
        gap: 2,
        marginLeft: spacingX._10,
    },
});
