import {StyleSheet} from 'react-native';

export const getStyles = (sizeLabor, themeLabor) => {
    const {iphoneX} = sizeLabor.designsBasedOn;
    const {wp} = iphoneX;
    const {colors} = themeLabor.theme;
    return StyleSheet.create({
        demoSizeLabor: {
            width: wp(100),
            height: wp(20),
            backgroundColor: colors.secondary,
        }
    });
};
