import { Dimensions, StyleSheet } from 'react-native';
import { getSharedStyles } from '../../helpers';
export const getCardSize = (sizeLabor, themeLabor) => {
    const { designsBasedOn } = sizeLabor;
    const { wp, hp } = designsBasedOn.iphoneX;
    const { width, height } = Dimensions.get('window');
    const CARD_WIDTH = wp(100);
    const CARD_HEIGHT = 1.4 * CARD_WIDTH;
    return {
        width: CARD_WIDTH,
        height: CARD_HEIGHT
    };
};
const makeStyles = (sizeLabor, themeLabor) => {
    const { ms, designsBasedOn } = sizeLabor;
    const { wp, hp } = designsBasedOn.iphoneX;
    const { width, height } = Dimensions.get('window');
    const { colors } = themeLabor.theme;
    const cardSize = getCardSize(sizeLabor, themeLabor);
    const { sharedStylesFlatten } = getSharedStyles(sizeLabor, themeLabor);
    const { shadow } = sharedStylesFlatten;
    return StyleSheet.create({
        mapView: {
            flex: 1,
        },
        scrollView: {
            position: 'absolute',
            bottom: wp(30),
            left: 0,
            right: 0,
            paddingVertical: ms.sp.xs,
        },
        endPadding: {
            paddingRight: width - cardSize.width,
        },
        card: {
            padding: ms.sp.xs,
            backgroundColor: colors.background,
            marginHorizontal: ms.sp.s,
            height: cardSize.height,
            width: cardSize.width,
            overflow: 'hidden',
            ...shadow
        },
        cardImage: {
            flex: 3,
            width: '100%',
            height: '100%',
            alignSelf: 'center',
        },
        textContent: {
            flex: 1,
        },
        cardTitle: {
            fontSize: ms.fs.xs,
            marginTop: ms.sp.s,
            fontWeight: 'bold',
        },
        cardDescription: {
            fontSize: ms.fs.xs,
            color: colors.paragraph,
        },
        markerWrap: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        marker: {
            width: wp(20),
            height: wp(20),
            borderRadius: ms.br.s,
            backgroundColor: 'rgba(130,4,150, 0.9)',
        },
        ring: {
            width: wp(28),
            height: wp(28),
            borderRadius: ms.br.m,
            backgroundColor: 'rgba(130,4,150, 0.3)',
            position: 'absolute',
            borderWidth: ms.sp.xxs,
            borderColor: 'rgba(130,4,150, 0.5)',
        },
    });
};
export default makeStyles;
