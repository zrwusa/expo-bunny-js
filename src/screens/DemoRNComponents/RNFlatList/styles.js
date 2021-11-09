import { StyleSheet } from 'react-native';
export const makeStyles = (sizeLabor, themeLabor) => {
    const { ms, designsBasedOn } = sizeLabor;
    const { wp, hp } = designsBasedOn.iphoneX;
    return StyleSheet.create({
        item: {
            backgroundColor: '#bfbfbf',
            padding: 20,
            marginVertical: 1,
            marginHorizontal: 2,
        },
        title: {
            fontSize: 32,
        },
    });
};
