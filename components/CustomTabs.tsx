// from react docs - bottom tabs navigator
// https://reactnavigation.org/docs/bottom-tab-navigator/

import {Platform, TouchableOpacity, View, StyleSheet} from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import {BottomTabBarProps} from "@react-navigation/bottom-tabs";
import {colors, spacingY} from "@/constants/theme";
import {verticalScale} from "@/utils/styling";

export function CustomTabs({ state, descriptors, navigation }: BottomTabBarProps) {

    return (
        <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label: any =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        //href={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabBarItem}
                    >
                        <Text style={{ color: isFocused ? colors.neutral900 : colors.neutral900 }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        width: '100%',
        height: Platform.OS == "ios" ? verticalScale(73) : verticalScale(55),
        //backgroundColor: colors.neutral800,
        justifyContent: "space-around",
        alignItems: "center",
        borderTopWidth: 1,
    },
    tabBarItem: {
        marginBottom: Platform.OS == "ios" ? spacingY._10 : spacingY._5,
        justifyContent: "center",
        alignItems: "center",
    },
});