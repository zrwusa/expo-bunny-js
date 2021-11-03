import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {withBunnyKit} from '../../hooks';

const getStyles = (sizeLabor, themeLabor) => {
    const {wp} = sizeLabor.designsBasedOn.iphoneX;
    const {theme: {colors}} = themeLabor;
    return StyleSheet.create({
        avatarStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            width: wp(40),
            height: wp(40),
            borderRadius: wp(20),
        },
        avatarTransparent: {
            backgroundColor: colors.transparent,
        },
        textStyle: {
            color: colors.text,
            fontSize: wp(16),
            backgroundColor: colors.transparent,
            fontWeight: '100',
        },
    });
};

class BunnyAvatar extends React.Component {
    constructor() {
        super(...arguments);
        this.avatarName = undefined;
        this.avatarColor = undefined;
        this.handleOnPress = () => {
            const {onPress, ...other} = this.props;
            if (this.props.onPress) {
                this.props.onPress(other);
            }
        };
        this.handleOnLongPress = () => {
        };
    }

    setAvatarColor() {
        const userName = (this.props.user && this.props.user.name) || '';
        const name = userName.toUpperCase().split(' ');
        if (name.length === 1) {
            this.avatarName = `${name[0].charAt(0)}`;
        } else if (name.length > 1) {
            this.avatarName = `${name[0].charAt(0)}${name[1].charAt(0)}`;
        } else {
            this.avatarName = '';
        }
        let sumChars = 0;
        for (let i = 0; i < userName.length; i += 1) {
            sumChars += userName.charCodeAt(i);
        }
        // inspired by https://github.com/wbinnssmith/react-user-avatar
        // colors from https://flatuicolors.com/
        const colors = [
            '#e67e22',
            '#2ecc71',
            '#3498db',
            '#8e44ad',
            '#e74c3c',
            '#1abc9c',
            '#2c3e50',
        ];
        this.avatarColor = colors[sumChars % colors.length];
    }

    renderAvatar() {
        const {user} = this.props;
        if (user) {
            const {bunnyKit: {sizeLabor, themeLabor}} = this.props;
            const styles = getStyles(sizeLabor, themeLabor);
            if (typeof user.avatar === 'function') {
                return user.avatar([styles.avatarStyle, this.props.avatarStyle]);
            } else if (typeof user.avatar === 'string') {
                return (<Image source={{uri: user.avatar}} style={[styles.avatarStyle, this.props.avatarStyle]}/>);
            } else if (typeof user.avatar === 'number') {
                return (<Image source={user.avatar} style={[styles.avatarStyle, this.props.avatarStyle]}/>);
            }
        }
        return null;
    }

    renderInitials() {
        const {bunnyKit: {sizeLabor, themeLabor}} = this.props;
        const styles = getStyles(sizeLabor, themeLabor);
        return (<Text style={[styles.textStyle, this.props.textStyle]}>
            {this.avatarName}
        </Text>);
    }

    render() {
        const {bunnyKit: {sizeLabor, themeLabor}} = this.props;
        const styles = getStyles(sizeLabor, themeLabor);
        if (!this.props.user ||
            (!this.props.user.name && !this.props.user.avatar)) {
            // render placeholder
            return (<View style={[
                styles.avatarStyle,
                styles.avatarTransparent,
                this.props.avatarStyle,
            ]}
                // @ts-ignore
                          accessibilityTraits="image"/>);
        }
        if (this.props.user.avatar) {
            return (<TouchableOpacity disabled={!this.props.onPress} onPress={this.props.onPress}
                                      onLongPress={this.props.onLongPress}
                // @ts-ignore
                                      accessibilityTraits="image">
                {this.renderAvatar()}
            </TouchableOpacity>);
        }
        this.setAvatarColor();
        return (<TouchableOpacity disabled={!this.props.onPress} onPress={this.props.onPress}
                                  onLongPress={this.props.onLongPress} style={[
            styles.avatarStyle,
            {backgroundColor: this.avatarColor},
            this.props.avatarStyle,
        ]}
            // @ts-ignore
                                  accessibilityTraits="image">
            {this.renderInitials()}
        </TouchableOpacity>);
    }
}

BunnyAvatar.defaultProps = {
    user: undefined,
    onPress: undefined,
    onLongPress: undefined,
    avatarStyle: {},
    textStyle: {},
};
export default withBunnyKit(BunnyAvatar);
