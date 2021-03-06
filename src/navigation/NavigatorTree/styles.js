import { Platform, StyleSheet } from 'react-native';
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
        headerBackImage: {
            fontSize: ms.fontSizes.xxl,
        },
        headerStyle: {
            height: Platform.select({
                web: wp(50),
            })
        },
        drawerHeadLeftIcon: {
            paddingLeft: ms.spacings.l,
            fontSize: ms.fontSizes.l,
        },
        headerTitleStyle: {
            fontSize: ms.fontSizes.m
        },
        settingBox: {
            marginRight: wp(10)
        },
        auth: {
            paddingTop: wp(160),
            paddingHorizontal: ms.sp.l,
        }
    });
};
