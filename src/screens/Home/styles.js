import { StyleSheet } from 'react-native';
import { getSharedStyles } from '../../helpers';
export const makeStyles = (sizeLabor, themeLabor) => {
    const { ms, designsBasedOn } = sizeLabor;
    const { wp, hp } = designsBasedOn.iphoneX;
    const { colors } = themeLabor.theme;
    const { sharedStylesFlatten } = getSharedStyles(sizeLabor, themeLabor);
    return StyleSheet.create({
        container: {
            padding: ms.sp.l,
        },
        label: {
            ...sharedStylesFlatten.label,
            marginLeft: ms.sp.m
        },
        rightWrapper: {
            alignItems: 'flex-end'
        }
    });
};
