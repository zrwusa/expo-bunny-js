import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {withBunnyKit} from '../../hooks/bunny-kit';

const getStyles = (sizeLabor, themeLabor) => {
    const {wp} = sizeLabor.designsBasedOn.iphoneX;
    const {theme: {colors}} = themeLabor;
    return StyleSheet.create({
        container: {
            height: wp(44),
            justifyContent: 'flex-end',
        },
        text: {
            color: colors.accent,
            fontWeight: '600',
            fontSize: wp(17),
            backgroundColor: colors.transparent,
            marginBottom: wp(12),
            marginLeft: wp(10),
            marginRight: wp(10),
        },
    });
};

class Send extends Component {
    constructor() {
        super(...arguments);
        this.handleOnPress = () => {
            const {text, onSend} = this.props;
            if (text && onSend) {
                onSend({text: text.trim()}, true);
            }
        };
    }

    render() {
        const {
            text,
            sendContainerStyle,
            children,
            sendTextStyle,
            sendLabel,
            alwaysShowSend,
            disabled,
            sendButtonProps,
        } = this.props;
        if (alwaysShowSend || (text && text.trim().length > 0)) {
            const {bunnyKit: {sizeLabor, themeLabor}} = this.props;
            const styles = getStyles(sizeLabor, themeLabor);
            return (<TouchableOpacity testID="send" accessible accessibilityLabel="send"
                                      style={[styles.container, sendContainerStyle]} onPress={this.handleOnPress}
                // @ts-ignore
                                      accessibilityTraits="button" disabled={disabled} {...sendButtonProps}>
                <View>
                    {children || <Text style={[styles.text, sendTextStyle]}>{sendLabel}</Text>}
                </View>
            </TouchableOpacity>);
        }
        return <View/>;
    }
}

Send.defaultProps = {
    text: '',
    onSend: () => {
    },
    sendLabel: 'Send',
    sendContainerStyle: {},
    sendTextStyle: {},
    children: null,
    alwaysShowSend: false,
    disabled: false,
    sendButtonProps: undefined,
};
export default withBunnyKit(Send);
