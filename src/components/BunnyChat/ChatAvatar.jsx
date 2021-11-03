import React from 'react';
import { StyleSheet, View, } from 'react-native';
import BunnyAvatar from './BunnyAvatar';
import { isSameDay, isSameUser } from './utils';
import { withBunnyKit } from '../../hooks/bunny-kit';
const getStyles = (sizeLabor, themeLabor) => {
    const { wp } = sizeLabor.designsBasedOn.iphoneX;
    return {
        left: StyleSheet.create({
            container: {
                marginRight: wp(8),
            },
            onTop: {
                alignSelf: 'flex-start',
            },
            onBottom: {},
            image: {
                height: wp(36),
                width: wp(36),
                borderRadius: wp(18),
            },
        }),
        right: StyleSheet.create({
            container: {
                marginLeft: wp(8),
            },
            onTop: {
                alignSelf: 'flex-start',
            },
            onBottom: {},
            image: {
                height: wp(36),
                width: wp(36),
                borderRadius: wp(18),
            },
        }),
    };
};
class ChatAvatar extends React.Component {
    renderAvatar() {
        if (this.props.renderAvatar) {
            const { renderAvatar, ...avatarProps } = this.props;
            return this.props.renderAvatar(avatarProps);
        }
        if (this.props.currentMessage) {
            const { bunnyKit: { sizeLabor, themeLabor } } = this.props;
            const styles = getStyles(sizeLabor, themeLabor);
            return (<BunnyAvatar avatarStyle={[
                    styles[this.props.position].image,
                    this.props.avatarImageStyle &&
                        this.props.avatarImageStyle[this.props.position],
                ]} textStyle={this.props.avatarTextStyle ? this.props.avatarTextStyle : {}} user={this.props.currentMessage.user} onPress={() => this.props.onPressAvatar &&
                    this.props.onPressAvatar(this.props.currentMessage.user)} onLongPress={() => this.props.onLongPressAvatar &&
                    this.props.onLongPressAvatar(this.props.currentMessage.user)}/>);
        }
        return null;
    }
    render() {
        const { renderAvatarOnTop, showAvatarForEveryMessage, avatarContainerStyle, position, currentMessage, renderAvatar, previousMessage, nextMessage, avatarImageStyle, } = this.props;
        const messageToCompare = renderAvatarOnTop ? previousMessage : nextMessage;
        const computedStyle = renderAvatarOnTop ? 'onTop' : 'onBottom';
        if (renderAvatar === null) {
            return null;
        }
        const { bunnyKit: { sizeLabor, themeLabor } } = this.props;
        const styles = getStyles(sizeLabor, themeLabor);
        if (!showAvatarForEveryMessage &&
            currentMessage &&
            messageToCompare &&
            isSameUser(currentMessage, messageToCompare) &&
            isSameDay(currentMessage, messageToCompare)) {
            return (<View style={[
                    styles[position].container,
                    avatarContainerStyle && avatarContainerStyle[position],
                ]}>
                    <BunnyAvatar avatarStyle={[
                    styles[position].image,
                    avatarImageStyle && avatarImageStyle[position],
                ]}/>
                </View>);
        }
        return (<View style={[
                styles[position].container,
                styles[position][computedStyle],
                avatarContainerStyle && avatarContainerStyle[position],
            ]}>
                {this.renderAvatar()}
            </View>);
    }
}
ChatAvatar.defaultProps = {
    renderAvatarOnTop: false,
    showAvatarForEveryMessage: false,
    position: 'left',
    currentMessage: undefined,
    previousMessage: undefined,
    nextMessage: undefined,
    avatarContainerStyle: {},
    avatarImageStyle: {},
    onPressAvatar: () => {
    },
    onLongPressAvatar: () => {
    },
};
export default withBunnyKit(ChatAvatar);
