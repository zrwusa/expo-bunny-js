import { StyleSheet } from 'react-native';
import { getSharedStyles } from '../../../../helpers';
export const makeStyles = (sizeLabor, themeLabor) => {
    const { ms, designsBasedOn } = sizeLabor;
    const { wp, hp } = designsBasedOn.iphoneX;
    const { theme } = themeLabor;
    const { colors, borderRadius } = theme;
    const { sharedStylesFlatten } = getSharedStyles(sizeLabor, themeLabor);
    const { shadowAround, title } = sharedStylesFlatten;
    return StyleSheet.create({
        bodyPartChartCard: {
            marginTop: ms.sp.l,
            ...shadowAround,
            padding: ms.sp.l,
            paddingHorizontal: ms.sp.m,
            borderRadius: borderRadius.surface,
        },
    });
};
