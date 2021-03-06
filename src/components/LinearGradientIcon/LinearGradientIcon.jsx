import React from 'react';
import { IcoMoon, View } from '../UI';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { makeStyles } from './styles';
import { useBunnyKit } from '../../hooks/bunny-kit';
export function LinearGradientIcon(props) {
    const { sizeLabor, themeLabor, wp } = useBunnyKit();
    const { theme } = themeLabor;
    const { name, size, colors, start, end, locations, ...rest } = props;
    const { designsBasedOn } = sizeLabor;
    const finalSize = size || wp(20), colorsDefault = [theme.colors.backgroundBtn, theme.colors.backgroundBtn2], startDefault = { x: 0, y: 0 }, endDefault = { x: 0, y: 1 };
    const styles = makeStyles(sizeLabor, themeLabor);
    return (<View style={{ width: finalSize, height: finalSize }} {...rest}>
            <MaskedView style={{ flex: 1, flexDirection: 'row', width: finalSize, height: finalSize }} maskElement={<View style={{
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                        <IcoMoon name={name} size={finalSize} color={colors ? colors[0] : colorsDefault[0]}/>
                    </View>}>
                <LinearGradient locations={locations} start={start || startDefault} end={end || endDefault} colors={colors || colorsDefault} style={{ flex: 1 }}/>
            </MaskedView>
        </View>);
}
