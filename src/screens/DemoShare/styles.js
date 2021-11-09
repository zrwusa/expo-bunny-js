import { StyleSheet } from 'react-native';
export const makeStyles = (sizeLabor, themeLabor) => {
    const { ms, designsBasedOn } = sizeLabor;
    const { wp, hp } = designsBasedOn.iphoneX;
    const { colors } = themeLabor.theme;
    return StyleSheet.create({
        logo: {
            width: 305,
            height: 159,
            marginBottom: 20,
        },
        instructions: {
            color: '#888',
            fontSize: 18,
            marginHorizontal: 15,
            marginBottom: 10,
        },
        thumbnail: {
            width: 300,
            height: 300,
            resizeMode: 'contain',
        },
    });
};
