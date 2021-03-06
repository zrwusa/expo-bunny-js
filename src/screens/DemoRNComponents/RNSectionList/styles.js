import { StyleSheet } from 'react-native';
export const makeStyles = (sizeLabor, themeLabor) => {
    const { ms, designsBasedOn } = sizeLabor;
    const { wp, hp } = designsBasedOn.iphoneX;
    return StyleSheet.create({
        container: {
            marginHorizontal: 2
        },
        item: {
            backgroundColor: '#efefef',
            padding: 20,
            marginVertical: 1
        },
        header: {
            fontSize: 32,
            backgroundColor: '#ddd'
        },
        title: {
            fontSize: 24
        }
    });
};
