import { StyleSheet } from 'react-native';
import { getSharedStyles } from '../../helpers';
export const makeStyles = (sizeLabor, themeLabor) => {
    const { ms, designsBasedOn } = sizeLabor;
    const { wp, hp } = designsBasedOn.iphoneX;
    const { colors } = themeLabor.theme;
    const { sharedStylesFlatten } = getSharedStyles(sizeLabor, themeLabor);
    const { shadowAround } = sharedStylesFlatten;
    return StyleSheet.create({
        orRow: {
            marginTop: ms.sp.l
        },
        vectorRow: {
            marginTop: ms.sp.m,
            marginBottom: ms.sp.xl
        },
        orCol: {
            alignItems: 'center'
        },
        vectorButton: {
            justifyContent: 'center'
        },
        icon: { marginRight: wp(5) }
    });
};
