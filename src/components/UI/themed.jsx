// import {Button as ButtonElement, ButtonProps as ButtonElementProps, Text as TextElement, TextProps as TextElementProps} from "react-native-elements";
import { useThemeLabor } from '../../providers/theme-labor';
import { Button as ButtonRN, Image as ImageRN, Platform, Pressable as PressableRN, Text as TextRN, TextInput as TextInputRN, TouchableOpacity as TouchableOpacityRN, View as ViewRN } from 'react-native';
import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { createIconSetFromIcoMoon, MaterialCommunityIcons } from '@expo/vector-icons';
import selection from '../../assets/fonts/icomoon/selection.json';
import { useSizeLabor } from '../../providers/size-labor';
import { Switch as SwitchPaper } from 'react-native-paper';
import ReactNativePickerSelect from 'react-native-picker-select';
import { makeStyles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useBunnyKit } from '../../hooks/bunny-kit';
export const IconFromIcoMoon = createIconSetFromIcoMoon(selection, 'IcoMoon', 'icomoon.ttf');
// The theme switch is not supported, but for future scalability,
// try to use the theme to standardize the definition and use of properties
export const ButtonTO = ({ children, style, ...rest }) => {
    const { sizeLabor, themeLabor } = useBunnyKit();
    const { ButtonTO } = makeStyles(sizeLabor, themeLabor);
    const mergedStyle = [ButtonTO.ButtonTO, style];
    return (<TouchableOpacityRN style={mergedStyle} {...rest}>{children}</TouchableOpacityRN>);
};
export const TextButton = ({ children, style, ...rest }) => {
    const { sizeLabor, themeLabor } = useBunnyKit();
    const { TextButton } = makeStyles(sizeLabor, themeLabor);
    const mergedStyle = [TextButton.TextButton, style];
    return (<TouchableOpacityRN style={mergedStyle} {...rest}>{children}</TouchableOpacityRN>);
};
export const Button = ({ children, color, ...rest }) => {
    const { colors } = useBunnyKit();
    return (<ButtonRN color={color || colors.backgroundBtn} {...rest}/>);
};
export const LinearGradientButton = ({ style, children, disabled, ...rest }) => {
    const { sizeLabor, themeLabor } = useBunnyKit();
    const { LinearGradientButton } = makeStyles(sizeLabor, themeLabor);
    const mergedStyle = [disabled && LinearGradientButton.disabled, LinearGradientButton.container, style];
    const { theme } = themeLabor;
    const { colors } = theme;
    const finalColors = disabled ? [colors.disabled, colors.disabled] : colors.backgroundLinear;
    return <TouchableOpacity style={mergedStyle} disabled={disabled} {...rest}>
        <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={LinearGradientButton.linearGradient} colors={finalColors}>
            {children}
        </LinearGradient>
    </TouchableOpacity>;
};
export const LinkButton = ({ to, action, style, children, ...rest }) => {
    const { sizeLabor, themeLabor } = useBunnyKit();
    const { onPress, ...props } = useLinkProps({ to, action });
    const { LinkButton } = makeStyles(sizeLabor, themeLabor);
    const mergedStyle = [LinkButton.LinkButton, style];
    return (<TouchableOpacityRN style={mergedStyle} onPress={onPress} {...props} {...rest}>
            {children}
        </TouchableOpacityRN>);
};
export const Link = ({ to, action, style, children, ...rest }) => {
    const { onPress, ...props } = useLinkProps({ to, action });
    const mergedStyle = [{}, style];
    return (<TouchableOpacityRN style={mergedStyle} onPress={onPress} {...props} {...rest}>
            {children}
        </TouchableOpacityRN>);
};
export const InButtonText = ({ children, style, ...rest }) => {
    const { sizeLabor, themeLabor } = useBunnyKit();
    const { InputButtonText } = makeStyles(sizeLabor, themeLabor);
    const mergedStyle = [InputButtonText.InputButtonText, style];
    return (<TextRN style={mergedStyle} {...rest}>{children}</TextRN>);
};
export const View = ({ children, style, ...rest }) => {
    const mergedStyle = [{}, style];
    return (<ViewRN style={mergedStyle} {...rest}>{children}</ViewRN>);
};
export const Text = ({ children, style, ...rest }) => {
    const { sizeLabor, themeLabor } = useBunnyKit();
    const { Text } = makeStyles(sizeLabor, themeLabor);
    const mergedStyle = [Text.Text, style];
    return (<TextRN style={mergedStyle} {...rest}>{children}</TextRN>);
};
export const TouchableOpacity = ({ children, style, ...rest }) => {
    const mergedStyle = [{}, style];
    return (<TouchableOpacityRN style={mergedStyle} {...rest}>{children}</TouchableOpacityRN>);
};
export const Pressable = ({ children, style, ...rest }) => {
    const { colors } = useThemeLabor().theme;
    // const mergedStyle = [{
    //     backgroundColor: colors.background,
    // }, style]
    return (<PressableRN style={style} {...rest}>{children}</PressableRN>);
};
export const Image = ({ children, style, ...rest }) => {
    const { sizeLabor, themeLabor } = useBunnyKit();
    const { Image } = makeStyles(sizeLabor, themeLabor);
    const mergedStyle = [Image.Image, style];
    return (<ImageRN style={mergedStyle} {...rest}>{children}</ImageRN>);
};
export const TextInput = ({ style, ...rest }) => {
    const { sizeLabor, themeLabor, colors } = useBunnyKit();
    const { TextInput } = makeStyles(sizeLabor, themeLabor);
    // todo Typescript check for outline properties bug
    const webOutline = Platform.OS === 'web' ? { outlineWidth: 0 } : null;
    // @ts-ignore
    const mergedStyle = [TextInput.TextInput, webOutline, style];
    return (<TextInputRN placeholderTextColor={colors.placeholder} style={mergedStyle} {...rest}/>);
};
// ref?: React.RefObject<TextInputRN>;
export const TextInputIcon = React.forwardRef(({ style, renderIcon, editable, autoCapitalize = 'none', ...rest }, ref) => {
    const { sizeLabor, themeLabor, colors } = useBunnyKit();
    const { TextInputIcon } = makeStyles(sizeLabor, themeLabor);
    // todo Typescript check for outline properties bug
    const webOutline = Platform.OS === 'web' ? { outlineWidth: 0 } : null;
    // @ts-ignore
    const mergedStyle = [TextInputIcon.input, webOutline, style];
    return (<View style={TextInputIcon.container}>
        <View style={TextInputIcon.iconContainer}>{renderIcon && renderIcon()}</View>
        <TextInputRN autoCapitalize={autoCapitalize} ref={ref} editable={editable} placeholderTextColor={colors.placeholder} style={mergedStyle} {...rest}/>
    </View>);
});
export const SwitchP = ({ style, ...rest }) => {
    const { colors } = useThemeLabor().theme;
    const { designsBasedOn } = useSizeLabor();
    const { wp } = designsBasedOn.iphoneX;
    const mergedStyle = [{
            transform: [{ scaleX: wp(0.8, false) }, { scaleY: wp(0.8, false) }],
        }, style];
    return (<SwitchPaper color={colors.backgroundBtn} style={mergedStyle} {...rest}/>);
};
export const IconMC = ({ children, style, name, ...rest }) => {
    const { sizeLabor, themeLabor } = useBunnyKit();
    const { IconMC } = makeStyles(sizeLabor, themeLabor);
    const mergedStyle = [IconMC.IconMC, style];
    return (<MaterialCommunityIcons name={name} style={mergedStyle}/>);
};
export const IcoMoon = ({ children, style, name, size, color, ...rest }) => {
    const { colors, ms } = useBunnyKit();
    const mergedStyle = [{
            color: color || colors.text,
            fontSize: size || ms.fs.l,
        }, style];
    return (<IconFromIcoMoon name={name} style={mergedStyle}/>);
};
export const PickerSelect = ({ children, placeholder, items, style, Icon, ...rest }) => {
    const { sizeLabor, themeLabor } = useBunnyKit();
    const styles = makeStyles(sizeLabor, themeLabor);
    const finalItems = items.map(item => {
        item.color = Platform.select({
            android: 'black',
            ios: item.color,
            web: item.color,
        });
        return item;
    });
    let finalPlaceholder = placeholder;
    if (finalPlaceholder) {
        if (finalPlaceholder.hasOwnProperty('color')) {
            // @ts-ignore
            finalPlaceholder.color = Platform.select({
                android: 'black',
                // @ts-ignore
                ios: finalPlaceholder.color,
                // @ts-ignore
                web: finalPlaceholder.color,
            });
        }
    }
    const IconDefault = (Platform.OS !== 'web' ? () => <IcoMoon name="chevron-down1"/> : null);
    return (<ReactNativePickerSelect style={{
            iconContainer: styles.PickerSelect.iconContainer,
            viewContainer: styles.PickerSelect.viewContainer,
            inputIOSContainer: styles.PickerSelect.inputContainer,
            inputAndroidContainer: styles.PickerSelect.inputContainer,
            inputWeb: styles.PickerSelect.input,
            inputIOS: styles.PickerSelect.input,
            inputAndroid: styles.PickerSelect.input,
            modalViewTop: styles.PickerSelect.modalViewTop,
            modalViewMiddle: styles.PickerSelect.modalViewMiddle,
            modalViewBottom: styles.PickerSelect.modalViewBottom,
            ...style,
        }} placeholder={finalPlaceholder} items={finalItems} touchableWrapperProps={{
            activeOpacity: 0.2,
        }} useNativeAndroidPickerStyle={false} Icon={Icon || IconDefault} children={children} {...rest}/>);
};
export const PickerSelectChevronRight = ({ style, Icon, ...rest }) => {
    const { colors } = useBunnyKit();
    const { ms, designsBasedOn } = useSizeLabor();
    const { wp } = designsBasedOn.iphoneX;
    const mergedIconStyle = [];
    const IconProp = Icon || (() => <IcoMoon name="chevron-right" style={{
            marginTop: ms.sp.m,
            marginRight: ms.sp.m,
            color: colors.text,
        }} size={wp(20)}/>);
    return (<ReactNativePickerSelect 
    // style={styles.pickerSelector}
    style={{
            ...style,
            inputIOS: {
                fontSize: ms.fs.l,
                paddingVertical: ms.sp.m,
                paddingHorizontal: ms.sp.m,
                color: colors.text,
                paddingRight: ms.sp.xl // to ensure the text is never behind the icon
            },
            inputAndroid: {
                fontSize: ms.fs.l,
                paddingVertical: ms.sp.m,
                paddingHorizontal: ms.sp.m,
                color: colors.text,
                paddingRight: ms.sp.xl // to ensure the text is never behind the icon
            },
        }} touchableWrapperProps={{
            activeOpacity: 0.2,
        }} {...rest} Icon={IconProp}/>);
};
// The theme switch is not supported, but for future scalability,
// try to use the theme to standardize the definition and use of properties
// export const DemoButtonRNStyled = styled.Button({
//     backgroundColor: DefaultTheme.colors.transparent,
//     margin: ms.sp.s
// })
// export const DemoButtonRNStyled =():ReactNativeThemedStyledFunction<typeof ButtonRN, DefaultTheme>=>{
//     const {colors} = useTheme().theme
//     return styled.Button({
//         backgroundColor: colors.background,
//         margin: ms.sp.s,
//
//     })
// }
//
// export const DemoTextCssStyledRN = styled.Text`
//   color: ${DefaultTheme.colors.buttonText};
//   text-align: center;
//   font-size: ${ms.fs.m}px;
// `
//
// export const DemoButtonRNEStyled = styled(ButtonElement).attrs({
//     buttonStyle: {
//         backgroundColor: DefaultTheme.colors.background,
//         borderRadius: ms.br.xl
//     },
//     titleStyle: {
//         color: DefaultTheme.colors.text
//     },
//     containerStyle: {
//         width: ms.sz.s12,
//     },
// })``
//
// export const DemoIconCssStyled = styled(MaterialCommunityIcons)`
//   font-size: ${ms.fs.m}px;
//   color:${DefaultTheme.colors.primary};
//   padding: ${ms.sp.s}px;
// `
