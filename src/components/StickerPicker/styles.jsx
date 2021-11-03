import { StyleSheet } from 'react-native';
import { useSizeLabor } from '../../providers/size-labor';
import { getSharedStyles } from '../../helpers';
export const getStyles = (sizeLabor, themeLabor) => {
    const { ms, designsBasedOn } = useSizeLabor();
    const { wp } = designsBasedOn.iphoneX;
    const { sharedStylesFlatten } = getSharedStyles(sizeLabor, themeLabor);
    const { shadow } = sharedStylesFlatten;
    const { theme } = themeLabor;
    const { colors } = theme;
    return StyleSheet.create({
        panel: {
            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        stickerImage: {
            width: wp(60),
            margin: wp(7),
            height: wp(60)
        }
    });
};