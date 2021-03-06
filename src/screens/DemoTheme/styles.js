import { StyleSheet } from 'react-native';
import { getSharedStyles } from '../../helpers';
export const makeStyles = (sizeLabor, themeLabor) => {
    const { ms, designsBasedOn } = sizeLabor;
    const { wp, hp } = designsBasedOn.iphoneX;
    const { colors } = themeLabor.theme;
    const { sharedStylesFlatten } = getSharedStyles(sizeLabor, themeLabor);
    return StyleSheet.create({
        container: {
            padding: ms.sp.l
        },
        buttonCard: {
            width: wp(326),
        },
        demoCard: {
            width: wp(350),
        },
        demoShadow: {
            ...sharedStylesFlatten.shadow
        },
        demoSurface: {
            width: wp(326),
            height: wp(140),
        }
    });
};
