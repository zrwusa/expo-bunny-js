import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSizeLabor } from '../../providers/size-labor';
import { useThemeLabor } from '../../providers/theme-labor';
import { makeStyles } from './styles';
export const Row = (props) => {
    const { children, size, paddingVertical, style, align = 'flex-start' } = props;
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const { wp } = sizeLabor.designsBasedOn.iphoneX;
    const styles = makeStyles(sizeLabor, themeLabor);
    const rowPaddingVertical = {
        xxs: wp(2),
        xs: wp(4),
        s: wp(6),
        m: wp(8),
        l: wp(10),
        xl: wp(12),
        xxl: wp(16)
    };
    const styleOBJ = StyleSheet.flatten(style);
    // let flexGrow: FlexStyle['flexGrow'] = size;
    // let flexShrink: FlexStyle['flexShrink'] = size;
    // let flexBasis: FlexStyle['flexBasis'] = Platform.select<FlexStyle['flexBasis']>({
    //     web:'auto',
    //     ios:'auto',
    //     android:'auto'
    // });
    //
    // // Let the width take precedence over the flex layout
    // if (styleOBJ && styleOBJ.height) {
    //     flexBasis = 'auto'
    //     flexGrow = 0
    //     flexShrink = 0
    // }
    //
    // flexGrow: flexGrow,
    //     flexShrink: flexShrink,
    //     flexBasis: flexBasis,
    const isPaddingTop = styleOBJ ? (styleOBJ.padding || styleOBJ.paddingVertical || styleOBJ.paddingTop) : 0;
    const isPaddingBottom = styleOBJ ? (styleOBJ.padding || styleOBJ.paddingVertical || styleOBJ.paddingBottom) : 0;
    const paddingVerticalValue = paddingVertical ? rowPaddingVertical[paddingVertical] : 0;
    const mergeStyle = [
        {
            flexDirection: 'row',
            flex: size,
            alignSelf: 'stretch',
            justifyContent: align,
            alignItems: 'center',
            // width:'100%',
            paddingTop: isPaddingTop || paddingVerticalValue,
            paddingBottom: isPaddingBottom || paddingVerticalValue,
        },
        style
    ];
    return <View style={mergeStyle}>
        {children ? children : null}
    </View>;
};
