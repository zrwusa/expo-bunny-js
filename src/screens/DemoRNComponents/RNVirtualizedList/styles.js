import { StyleSheet } from 'react-native';
export const getStyles = (sizeLabor, themeLabor) => {
    const { ms, designsBasedOn } = sizeLabor;
    const { wp, hp } = designsBasedOn.iphoneX;
    return StyleSheet.create({
        item: {
            backgroundColor: '#bfbfbf',
            height: 150,
            justifyContent: 'center',
            marginVertical: 2,
            marginHorizontal: 2,
            padding: 20,
        },
        title: {
            fontSize: 32,
        },
    });
};
