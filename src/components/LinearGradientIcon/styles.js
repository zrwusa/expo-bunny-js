import { StyleSheet } from 'react-native';
import { getSharedStyles } from '../../helpers';
export const getStyles = (sizeLabor, themeLabor) => {
    const { ms, designsBasedOn } = sizeLabor;
    const { wp, hp } = designsBasedOn.iphoneX;
    const { colors } = themeLabor.theme;
    const { sharedStylesFlatten } = getSharedStyles(sizeLabor, themeLabor);
    return StyleSheet.create({
        shadow: {
            shadowColor: 'black',
            shadowOpacity: 0.5,
            shadowRadius: 5,
            shadowOffset: {
                width: 0,
                height: 1,
            },
        },
    });
};
