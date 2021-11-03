import {StyleSheet} from 'react-native';

export const getStyles = (sizeLabor, themeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    return StyleSheet.create({
        screen: {
            flex: 1
        },
        filter: {
            height: wp(20)
        },
        albumContainer: {justifyContent: 'center'},
        album: {width: wp(370)}
    });
};
