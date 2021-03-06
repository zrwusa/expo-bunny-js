import { Platform, StyleSheet } from 'react-native';
export const makeStyles = (sizeLabor, themeLabor) => {
    const { ms, designsBasedOn } = sizeLabor;
    const { wp, hp } = designsBasedOn.iphoneX;
    const { colors } = themeLabor.theme;
    return StyleSheet.create({
        item: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: wp(16),
            paddingVertical: wp(12),
        },
        switch: Platform.select({
            ios: {
                width: wp(36),
                height: wp(32),
                marginRight: ms.sp.m
            },
            default: {
                width: wp(20),
                height: wp(20),
                marginRight: ms.sp.s
            }
        })
    });
};
