import {StyleSheet} from 'react-native';
import {getSharedStyles} from '../../helpers';

export const getStyles = (sizeLabor, themeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    const {sharedStylesFlatten} = getSharedStyles(sizeLabor, themeLabor);
    const {shadowAround} = sharedStylesFlatten;
    return StyleSheet.create({
        container: {
            paddingHorizontal: wp(20),
        },
        row: {marginTop: wp(10)}
    });
};
