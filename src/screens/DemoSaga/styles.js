import { StyleSheet } from 'react-native';
import { getSharedStyles } from '../../helpers';
export const getStyles = (sizeLabor, themeLabor) => {
    const { ms, designsBasedOn } = sizeLabor;
    const { wp, hp } = designsBasedOn.iphoneX;
    const { colors } = themeLabor.theme;
    const { sharedStylesFlatten } = getSharedStyles(sizeLabor, themeLabor);
    return StyleSheet.create({
        xxx: { ...sharedStylesFlatten.btn }
    });
};