import { StyleSheet } from 'react-native';
import { getSharedStyles } from '../../helpers';
export const makeStyles = (sizeLabor, themeLabor) => {
    const { ms, designsBasedOn } = sizeLabor;
    const { wp, hp } = designsBasedOn.iphoneX;
    const { colors } = themeLabor.theme;
    const { sharedStylesFlatten } = getSharedStyles(sizeLabor, themeLabor);
    return StyleSheet.create({
        todoContainer: {
            width: wp(350)
        },
        table: {
            padding: ms.sp.l
        },
        flatList: {
            height: hp(300),
        },
    });
};
