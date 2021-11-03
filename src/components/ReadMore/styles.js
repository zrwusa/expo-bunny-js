import { StyleSheet } from 'react-native';
export const getStyles = (sizeLabor, themeLabor) => {
    const { ms, designsBasedOn } = sizeLabor;
    const { wp, hp } = designsBasedOn.iphoneX;
    const { colors } = themeLabor.theme;
    return StyleSheet.create({
        button: {
            color: '#888',
            marginTop: wp(5),
            fontSize: ms.fs.s
        }
    });
};
