import React from 'react';
import { Keyboard, StyleSheet, View, } from 'react-native';
import Composer from './Composer';
import Send from './Send';
import Actions from './Actions';
import { withBunnyKit } from '../../hooks/bunny-kit';
const makeStyles = (sizeLabor, themeLabor) => {
    const { wp } = sizeLabor.designsBasedOn.iphoneX;
    const { theme: { colors } } = themeLabor;
    return StyleSheet.create({
        container: {
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: colors.border,
            backgroundColor: colors.background,
            bottom: 0,
            left: 0,
            right: 0,
        },
        primary: {
            flexDirection: 'row',
            alignItems: 'flex-end',
        },
        accessory: {
            height: wp(44),
        },
    });
};
class InputToolbar extends React.Component {
    constructor() {
        super(...arguments);
        // TODO constructor
        this.state = {
            position: 'absolute',
        };
        this.keyboardWillShowListener = undefined;
        this.keyboardWillHideListener = undefined;
        this.keyboardWillShow = () => {
            if (this.state.position !== 'relative') {
                this.setState({
                    position: 'relative',
                });
            }
        };
        this.keyboardWillHide = () => {
            if (this.state.position !== 'absolute') {
                this.setState({
                    position: 'absolute',
                });
            }
        };
    }
    componentDidMount() {
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }
    componentWillUnmount() {
        if (this.keyboardWillShowListener) {
            this.keyboardWillShowListener.remove();
        }
        if (this.keyboardWillHideListener) {
            this.keyboardWillHideListener.remove();
        }
    }
    renderActions() {
        const { actionsConfig, actionOptionTintColor, renderActionIcon, actionContainerStyle, actionIconTextStyle, actionWrapperStyle, } = this.props;
        const actionsProps = {
            actionsConfig,
            actionOptionTintColor,
            renderActionIcon,
            actionContainerStyle,
            actionIconTextStyle,
            actionWrapperStyle,
        };
        if (this.props.renderActions) {
            return this.props.renderActions(actionsProps);
            // } else {
        }
        else if (actionsConfig) {
            // TODO why need onPressActionButton to render Actions
            return <Actions {...actionsProps}/>;
        }
        return null;
    }
    renderSend() {
        const { text, onSend, sendLabel, sendContainerStyle, sendTextStyle, children, alwaysShowSend, disabled, sendButtonProps } = this.props;
        const sendProps = {
            text,
            onSend,
            sendLabel,
            sendContainerStyle,
            sendTextStyle,
            children,
            alwaysShowSend,
            disabled,
            sendButtonProps
        };
        if (this.props.renderSend) {
            return this.props.renderSend(sendProps);
        }
        return <Send {...sendProps}/>;
        // return <Send {...sendProps} />
    }
    renderComposer() {
        const { composerHeight, text, placeholderTextColor, placeholder, textInputProps, multiline, disableComposer, textInputStyle, textInputAutoFocus, keyboardAppearance, onTextChanged, onInputSizeChanged } = this.props;
        const composerProps = {
            composerHeight,
            text,
            placeholderTextColor,
            placeholder,
            textInputProps,
            multiline,
            disableComposer,
            textInputStyle,
            textInputAutoFocus,
            keyboardAppearance,
            onTextChanged,
            onInputSizeChanged
        };
        if (this.props.renderComposer) {
            return this.props.renderComposer(composerProps);
        }
        return <Composer {...composerProps}/>;
    }
    renderAccessory() {
        if (this.props.renderAccessory) {
            const { bunnyKit: { sizeLabor, themeLabor } } = this.props;
            const styles = makeStyles(sizeLabor, themeLabor);
            return (<View style={[styles.accessory, this.props.accessoryStyle]}>
                    {this.props.renderAccessory(this.props)}
                </View>);
        }
        return null;
    }
    render() {
        const { bunnyKit: { sizeLabor, themeLabor } } = this.props;
        const styles = makeStyles(sizeLabor, themeLabor);
        return (<View style={[
                styles.container,
                { position: this.state.position },
                this.props.inputToolbarContainerStyle,
            ]}>
                <View style={[styles.primary, this.props.primaryStyle]}>
                    {this.renderActions()}
                    {this.renderComposer()}
                    {this.renderSend()}
                </View>
                {this.renderAccessory()}
            </View>);
    }
}
InputToolbar.defaultProps = {
    renderAccessory: undefined,
    renderActions: undefined,
    renderSend: undefined,
    renderComposer: undefined,
    inputToolbarContainerStyle: {},
    primaryStyle: {},
    accessoryStyle: {},
    onPressActionButton: () => {
    },
};
export default withBunnyKit(InputToolbar);
