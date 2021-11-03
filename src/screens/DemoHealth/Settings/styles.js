import { StyleSheet } from 'react-native';
import { getSharedStyles } from '../../../helpers';
export const getStyles = (sizeLabor, themeLabor) => {
    const { ms, designsBasedOn } = sizeLabor;
    const { wp, hp } = designsBasedOn.iphoneX;
    const { colors } = themeLabor.theme;
    const { sharedStylesFlatten } = getSharedStyles(sizeLabor, themeLabor);
    return StyleSheet.create({
        container: { padding: wp(16) },
        label: {
            ...sharedStylesFlatten.label,
            marginLeft: ms.sp.m
        },
        rightWrapper: {
            alignItems: 'flex-end'
        }
    });
};
