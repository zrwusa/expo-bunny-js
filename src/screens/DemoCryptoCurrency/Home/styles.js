import { StyleSheet } from 'react-native';
import { getSharedStyles } from '../../../helpers';
export const makeStyles = (sizeLabor, themeLabor) => {
    const { ms, designsBasedOn } = sizeLabor;
    const { wp, hp } = designsBasedOn.iphoneX;
    const { colors } = themeLabor.theme;
    const { sharedStylesFlatten } = getSharedStyles(sizeLabor, themeLabor);
    const {} = sharedStylesFlatten;
    return StyleSheet.create({
        btcChart: {
            marginTop: wp(36),
            paddingBottom: wp(6)
        }
    });
};
