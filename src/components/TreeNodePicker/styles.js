import { StyleSheet } from 'react-native';
export const makeStyles = (sizeLabor, themeLabor) => {
    const { ms, designsBasedOn } = sizeLabor;
    const { wp, hp } = designsBasedOn.iphoneX;
    const { colors } = themeLabor.theme;
    return StyleSheet.create({
        container: {
            // borderTopLeftRadius: ms.br.m,
            // borderTopRightRadius: ms.br.m,
            flex: 1,
            backgroundColor: colors.background,
        },
        header: {
            paddingHorizontal: wp(10),
            paddingVertical: wp(10)
        },
        content: {
            flex: 1,
            paddingLeft: wp(10),
            paddingRight: wp(10)
        },
        footer: {
            backgroundColor: colors.background,
            marginTop: ms.sp.m,
            borderRadius: ms.br.s,
            paddingBottom: ms.sp.l,
            paddingHorizontal: ms.sp.l,
        },
    });
};
