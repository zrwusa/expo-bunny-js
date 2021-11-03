import {StyleSheet} from 'react-native';

export const getStyles = (sizeLabor, themeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    return StyleSheet.create({
        list: {
            backgroundColor: colors.background,
            paddingTop: wp(55)
        },
        item: {
            height: wp(100),
            width: wp(375),
            padding: wp(10)
        },
        itemBox: {flexDirection: 'row'},
        itemText: {marginRight: 10}
    });
};
