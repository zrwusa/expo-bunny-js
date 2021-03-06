import * as React from 'react';
import { View } from 'react-native';
import { useSizeLabor } from '../../providers/size-labor';
import { useThemeLabor } from '../../providers/theme-labor';
import { makeStyles } from './styles';
import { Text } from '../../components/UI';
import { makeContainerStyles } from '../styles';
import { LinearGradient } from 'expo-linear-gradient';
export const Card = (props) => {
    const { title, children, style, titleMode, isLinear = false } = props;
    const finalTitleMode = titleMode || 'IN';
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const { colors } = themeLabor.theme;
    const styles = makeStyles(sizeLabor, themeLabor);
    const containerStyles = makeContainerStyles(sizeLabor, themeLabor);
    const mergedStyle = [containerStyles.Card, style];
    // return <View>
    //     {children}
    // </View>
    return finalTitleMode === 'OUT'
        ? <View>
            <Text style={containerStyles.CardOutTitle}>{title}</Text>
            {isLinear
                ? <LinearGradient style={mergedStyle} colors={colors.backgroundLinear2}>
                        {children}
                    </LinearGradient>
                : <View style={mergedStyle}>
                        {children}
                    </View>}
        </View>
        : isLinear
            ? <LinearGradient style={mergedStyle} colors={colors.backgroundLinear2}>
                <Text style={containerStyles.CardInTitle}>{title}</Text>
                {children}
            </LinearGradient>
            : <View style={mergedStyle}>
                <Text style={containerStyles.CardInTitle}>{title}</Text>
                {children}
            </View>;
};
