import { StyleSheet } from 'react-native';
import { useSizeLabor } from '../../providers/size-labor';
import { getSharedStyles } from '../../helpers';
export const makeStyles = (sizeLabor, themeLabor) => {
    const { ms, designsBasedOn } = useSizeLabor();
    const { wp } = designsBasedOn.iphoneX;
    const { sharedStylesFlatten } = getSharedStyles(sizeLabor, themeLabor);
    const { shadow } = sharedStylesFlatten;
    const { theme } = themeLabor;
    const { colors } = theme;
    return StyleSheet.create({
        horizontal: {
            width: '100%',
            borderTopWidth: wp(1),
            borderTopColor: colors.divider
        },
        vertical: {
            height: '100%',
            minHeight: wp(5),
            borderLeftWidth: wp(1),
            borderLeftColor: colors.divider
        }
    });
};
