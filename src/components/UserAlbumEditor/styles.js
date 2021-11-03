import { StyleSheet } from 'react-native';
export const getStyles = (sizeLabor, themeLabor) => {
    const { ms, designsBasedOn } = sizeLabor;
    const { wp, hp } = designsBasedOn.iphoneX;
    const { colors } = themeLabor.theme;
    return StyleSheet.create({
        albumContainer: {
            height: wp(375),
            // padding: ms.sp.m
            marginBottom: wp(10)
        }
    });
};