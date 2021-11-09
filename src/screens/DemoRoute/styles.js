import { StyleSheet } from 'react-native';
export const makeStyles = (sizeLabor, themeLabor) => {
    const { ms, designsBasedOn } = sizeLabor;
    const { wp, hp } = designsBasedOn.iphoneX;
    return StyleSheet.create({
        wrap: {
            alignItems: 'flex-start',
        },
        text: {
            color: '#FF0000',
            marginTop: 10
        },
    });
};
