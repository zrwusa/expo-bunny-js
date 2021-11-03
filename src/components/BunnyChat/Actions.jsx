import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {withBunnyKit} from '../../hooks/bunny-kit';
import {connectActionSheet} from '../../../packages/react-native-action-sheet/src';

const getStyles = (sizeLabor, themeLabor) => {
    const {wp} = sizeLabor.designsBasedOn.iphoneX;
    const {theme: {colors}} = themeLabor;
    return StyleSheet.create({
        container: {
            width: wp(26),
            height: wp(26),
            marginLeft: wp(10),
            marginBottom: wp(10),
        },
        wrapper: {
            borderRadius: wp(13),
            borderColor: colors.border,
            borderWidth: wp(2),
            flex: 1,
        },
        iconText: {
            color: colors.text3,
            fontWeight: 'bold',
            fontSize: wp(16),
            backgroundColor: colors.transparent,
            textAlign: 'center',
        },
    });
};

class Actions extends React.Component {
    constructor() {
        super(...arguments);
        this.onActionsPress = () => {
            // TODO support multi actions
            const {actionsConfig, showActionSheetWithOptions} = this.props;
            const optionKeys = Object.keys(actionsConfig);
            const cancelButtonIndex = optionKeys.indexOf('Cancel');
            showActionSheetWithOptions({
                options: optionKeys,
                cancelButtonIndex,
                tintColor: this.props.actionOptionTintColor,
            }, (buttonIndex) => {
                const key = optionKeys[buttonIndex];
                if (key) {
                    actionsConfig[key](this.props);
                }
            });
        };
    }

    renderIcon() {
        if (this.props.renderActionIcon) {
            return this.props.renderActionIcon();
        }
        const {bunnyKit: {sizeLabor, themeLabor}} = this.props;
        const styles = getStyles(sizeLabor, themeLabor);
        // TODO support multi actions
        return (<View style={[styles.wrapper, this.props.actionWrapperStyle]}>
            <Text style={[styles.iconText, this.props.actionIconTextStyle]}>+</Text>
        </View>);
    }

    render() {
        const {bunnyKit: {sizeLabor, themeLabor}} = this.props;
        const styles = getStyles(sizeLabor, themeLabor);
        return (<TouchableOpacity style={[styles.container, this.props.actionContainerStyle]}
                                  onPress={this.props.onPressActionButton || this.onActionsPress}>
            {this.renderIcon()}
        </TouchableOpacity>);
    }
}

Actions.defaultProps = {
    actionsConfig: {},
    actionOptionTintColor: '#007AFF',
    renderActionIcon: undefined,
    actionContainerStyle: {},
    actionIconTextStyle: {},
    actionWrapperStyle: {},
};
export default withBunnyKit(connectActionSheet(Actions));
