import {StyleSheet} from 'react-native';

export const getStyles = (sizeLabor, themeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    return StyleSheet.create({
        text: {
            maxWidth: wp(260),
            maxHeight: wp(200),
            overflow: 'scroll',
            flexShrink: 1,
            color: colors.surface,
        },
    });
};
