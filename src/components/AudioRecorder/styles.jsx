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
        micIcon: {
            paddingTop: wp(10),
            paddingBottom: wp(15),
            paddingHorizontal: wp(15),
            borderRadius: ms.br.m
        },
        active: {
            backgroundColor: colors.accent
        }
    });
};
