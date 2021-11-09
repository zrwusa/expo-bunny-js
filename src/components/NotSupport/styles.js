import { StyleSheet } from 'react-native';
export const makeStyles = (sizeLabor, themeLabor) => {
    const { theme } = themeLabor;
    const { colors } = theme;
    const { wp } = sizeLabor.designsBasedOn.iphoneX;
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            marginTop: wp(10),
            fontSize: wp(16),
            color: colors.text,
        }
    });
};
