import { StyleSheet } from 'react-native';
import { getSharedStyles } from '../../../../helpers';
export const getStyles = (sizeLabor, themeLabor) => {
    const { ms, designsBasedOn } = sizeLabor;
    const { wp, hp } = designsBasedOn.iphoneX;
    const { theme } = themeLabor;
    const { colors, borderRadius } = theme;
    const { sharedStylesFlatten } = getSharedStyles(sizeLabor, themeLabor);
    const { shadowAround, title } = sharedStylesFlatten;
    return StyleSheet.create({
        bodyPartCard: {
            ...shadowAround,
            padding: ms.sp.m,
            borderRadius: borderRadius.surface,
            marginRight: ms.sp.s,
        },
    });
};
