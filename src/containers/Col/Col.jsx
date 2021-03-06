import React from 'react';
import { View } from 'react-native';
export const Col = (props) => {
    const { children, size = 1, style, align = 'stretch' } = props;
    // const styleOBJ = StyleSheet.flatten<ViewStyle>(style)
    // // web basis 'auto' shrink:0 grow:0
    // let flexGrow: FlexStyle['flexGrow'] = size;
    // let flexShrink: FlexStyle['flexShrink'] = size;
    // let flexBasis: FlexStyle['flexBasis'] ='auto';
    // let flexBasis: FlexStyle['flexBasis'] = Platform.select<FlexStyle['flexBasis']>({
    //     web:'auto',
    //     ios:0,
    //     android:0
    // });
    // // Let the width take precedence over the flex layout
    // if (styleOBJ && styleOBJ.width) {
    //     flexBasis = 'auto'
    //     flexGrow = 0
    //     flexShrink = 0
    // }
    // flexGrow: flexGrow,
    //     flexShrink: flexShrink,
    //     flexBasis: flexBasis,
    const mergeStyle = [
        {
            flexDirection: 'column',
            flex: size,
            alignSelf: 'stretch',
            alignItems: align,
            justifyContent: 'center',
        },
        style
    ];
    return <View style={mergeStyle}>
        {children ? children : null}
    </View>;
};
