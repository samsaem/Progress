import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { CategoryType } from "@/types";
import { verticalScale } from "@/utils/styling";
import {radius, spacingX} from "@/constants/theme";
import * as Icons from "phosphor-react-native";
import { Router } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Image } from "expo-image";
import {Timestamp} from "@firebase/firestore";

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
                date: (item.date as Timestamp)?.toDate()?.toISOString(),
                description: item.description,
                image: item?.image,
            },
        });
    };

    let date = (item?.date as Timestamp)?.toDate()?.toLocaleDateString("en-GB", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 50)
                .springify()
                .damping(13)}
        >
            <TouchableOpacity style={styles.container} onPress={handleOpen}>
                <View style={styles.imageContainer}>
                    <Image
                        style={{ flex: 1 }}
                        source={item.image}
                        contentFit="cover"
                        transition={100}
                    />
                </View>

                <View style={styles.nameContainer}>
                    <Text style={{fontSize: 16}}>
                        {item.name}
                    </Text>

                    <Text style={{fontSize: 14}}>
                        {date}
                    </Text>

                    <Text style={{fontSize: 14}}>
                        {item.description}
                    </Text>
                </View>

                <Icons.CaretRight
                    size={verticalScale(20)}
                    weight="bold"
                />

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
    imageContainer: {
        height: verticalScale(53),
        width: verticalScale(53),
        borderWidth: 1,
        borderRadius: radius._12,
        borderCurve: "continuous",
        overflow: "hidden",
    },
    nameContainer: {
        flex: 1,
        gap: 2,
        marginLeft: spacingX._10,
    },
});
