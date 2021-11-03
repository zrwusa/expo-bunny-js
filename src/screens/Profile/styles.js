import {StyleSheet} from 'react-native';

export const getStyles = (sizeLabor, themeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    return StyleSheet.create({
        imageProgressive: {
            width: wp(370),
            height: wp(600)
        },
        tallBlock: {},
        user: {
            marginTop: ms.sp.m,
            padding: ms.sp.l
        }
    });
};
