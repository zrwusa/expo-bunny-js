import React from 'react';
import { StyleSheet, View } from 'react-native';
import ChatAvatar from './ChatAvatar';
import Bubble from './Bubble';
import SystemMessage from './SystemMessage';
import Day from './Day';
import { isSameUser } from './utils';
import { withBunnyKit } from '../../hooks/bunny-kit';
const makeStyles = (sizeLabor, themeLabor) => {
    const { wp } = sizeLabor.designsBasedOn.iphoneX;
    return {
        left: StyleSheet.create({
            container: {
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginLeft: wp(8),
                marginRight: 0,
            },
        }),
        right: StyleSheet.create({
            container: {
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                marginLeft: 0,
                marginRight: wp(8),
            },
        }),
    };
};
class Message extends React.Component {
    shouldComponentUpdate(nextProps) {
        const next = nextProps.currentMessage;
        const current = this.props.currentMessage;
        const { previousMessage, nextMessage } = this.props;
        const nextPropsMessage = nextProps.nextMessage;
        const nextPropsPreviousMessage = nextProps.previousMessage;
        const shouldUpdate = (this.props.shouldUpdateMessage &&
            this.props.shouldUpdateMessage(this.props, nextProps)) ||
            false;
        return (next.sent !== current.sent ||
            next.received !== current.received ||
            next.pending !== current.pending ||
            next.createdAt !== current.createdAt ||
            next.text !== current.text ||
            next.image !== current.image ||
            next.sticker !== current.sticker ||
            next.video !== current.video ||
            next.audio !== current.audio ||
            previousMessage !== nextPropsPreviousMessage ||
            nextMessage !== nextPropsMessage ||
            shouldUpdate);
    }
    renderDay() {
        if (this.props.currentMessage && this.props.currentMessage.createdAt) {
            // const {messageContainerStyle, onMessageLayout, ...dayProps} = this.props
            const { currentMessage, previousMessage, nextMessage, dayContainerStyle, dayWrapperStyle, dayTextStyle, dayTextProps, dateFormat, isDebug } = this.props;
            const dayProps = {
                currentMessage,
                previousMessage,
                nextMessage,
                dayContainerStyle,
                dayWrapperStyle,
                dayTextStyle,
                dayTextProps,
                dateFormat
            };
            isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', '[level3]Message dayProps', dayProps);
            if (this.props.renderDay) {
                return this.props.renderDay(dayProps);
            }
            return <Day {...dayProps}/>;
            // return <Day {...dayProps} />
        }
        return null;
    }
    renderBubble() {
        // const {messageContainerStyle, onMessageLayout, ...props} = this.props
        const { audioProps, audioStyle, audioContainerStyle, bottomContainerStyle, bubbleContainerStyle, bubbleWrapperStyle, currentMessage, quickRepliesColor, containerToNextStyle, containerToPreviousStyle, customTextStyle, isDebug, imageContainerStyle, imageProps, imageStyle, isCustomViewBottom, keepReplies, lightBoxProps, linkStyle, messages, nextMessage, onLongPress, onMessageLoad, onMessageLoadEnd, onMessageLoadError, onMessageLoadStart, onMessageReadyForDisplay, onPress, onQuickReply, textLongPressOptionTitles, phoneNumberOptionTitles, parsePatterns, position, previousMessage, quickReplyStyle, renderCustomView, renderMessageAudio, renderMessageImage, renderMessageSticker, renderMessageText, renderMessageVideo, renderQuickReplies, renderQuickReplySend, renderTicks, renderTime, renderUsernameOnMessage, stickerStyle, sendText, stickerContainerStyle, stickerProps, textContainerStyle, textProps, textStyle, tickStyle, timeContainerStyle, timeFormat, timeTextStyle, touchableProps, usernameStyle, user, videoProps, videoContainerStyle, videoStyle, audioProgressStyle, audioPlayButtonStyle, audioProgressColor, audioRemainTimeStyle, audioPlayButtonIconStyle, } = this.props;
        const bubbleProps = {
            audioProps,
            audioStyle,
            audioContainerStyle,
            bottomContainerStyle,
            bubbleContainerStyle,
            bubbleWrapperStyle,
            currentMessage,
            quickRepliesColor,
            containerToNextStyle,
            containerToPreviousStyle,
            customTextStyle,
            isDebug,
            imageContainerStyle,
            imageProps,
            imageStyle,
            isCustomViewBottom,
            keepReplies,
            lightBoxProps,
            linkStyle,
            messages,
            nextMessage,
            onLongPress,
            onMessageLoad,
            onMessageLoadEnd,
            onMessageLoadError,
            onMessageLoadStart,
            onMessageReadyForDisplay,
            onPress,
            onQuickReply,
            textLongPressOptionTitles,
            phoneNumberOptionTitles,
            parsePatterns,
            position,
            previousMessage,
            quickReplyStyle,
            renderCustomView,
            renderMessageAudio,
            renderMessageImage,
            renderMessageSticker,
            renderMessageText,
            renderMessageVideo,
            renderQuickReplies,
            renderQuickReplySend,
            renderTicks,
            renderTime,
            renderUsernameOnMessage,
            stickerStyle,
            sendText,
            stickerContainerStyle,
            stickerProps,
            textContainerStyle,
            textProps,
            textStyle,
            tickStyle,
            timeContainerStyle,
            timeFormat,
            timeTextStyle,
            touchableProps,
            usernameStyle,
            user,
            videoProps,
            videoContainerStyle,
            videoStyle,
            audioProgressStyle,
            audioPlayButtonStyle,
            audioProgressColor,
            audioRemainTimeStyle,
            audioPlayButtonIconStyle,
        };
        isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', '[level3]Message bubbleProps', bubbleProps);
        if (this.props.renderBubble) {
            return this.props.renderBubble(bubbleProps);
        }
        return <Bubble {...bubbleProps}/>;
        // return <Bubble {...bubbleProps} />
    }
    renderSystemMessage() {
        // const {messageContainerStyle, onMessageLayout, ...props} = this.props
        const { currentMessage, systemMessageContainerStyle, systemMessageWrapperStyle, systemTextStyle, isDebug } = this.props;
        const systemMessageProps = {
            currentMessage,
            systemMessageContainerStyle,
            systemMessageWrapperStyle,
            systemTextStyle
        };
        isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', '[level3]Message systemMessageProps', systemMessageProps);
        if (this.props.renderSystemMessage) {
            return this.props.renderSystemMessage(systemMessageProps);
        }
        return <SystemMessage {...systemMessageProps}/>;
        // return <SystemMessage {...systemMessageProps} />
    }
    renderAvatar() {
        const { user, currentMessage, showUserAvatar } = this.props;
        if (user &&
            user._id &&
            currentMessage &&
            currentMessage.user &&
            user._id === currentMessage.user._id &&
            !showUserAvatar) {
            return null;
        }
        if (currentMessage &&
            currentMessage.user &&
            currentMessage.user.avatar === null) {
            return null;
        }
        // const {messageContainerStyle, onMessageLayout, ...props} = this.props
        const { renderAvatarOnTop, showAvatarForEveryMessage, position, previousMessage, nextMessage, avatarContainerStyle, avatarImageStyle, onPressAvatar, onLongPressAvatar, isDebug } = this.props;
        const avatarProps = {
            renderAvatarOnTop,
            showAvatarForEveryMessage,
            position,
            currentMessage,
            previousMessage,
            nextMessage,
            avatarContainerStyle,
            avatarImageStyle,
            onPressAvatar,
            onLongPressAvatar
        };
        isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', '[level3]Message avatarProps', avatarProps);
        return <ChatAvatar {...avatarProps}/>;
    }
    render() {
        const { currentMessage, onMessageLayout, nextMessage, position, messageContainerStyle, } = this.props;
        if (currentMessage) {
            const sameUser = isSameUser(currentMessage, nextMessage);
            const { bunnyKit: { sizeLabor, themeLabor } } = this.props;
            const styles = makeStyles(sizeLabor, themeLabor);
            return (<View onLayout={onMessageLayout}>
                    {this.renderDay()}
                    {currentMessage.system ? (this.renderSystemMessage()) : (<View style={[
                        styles[position].container,
                        { marginBottom: sameUser ? 2 : 10 },
                        !this.props.inverted && { marginBottom: 2 },
                        messageContainerStyle && messageContainerStyle[position],
                    ]}>
                            {this.props.position === 'left' ? this.renderAvatar() : null}
                            {this.renderBubble()}
                            {this.props.position === 'right' ? this.renderAvatar() : null}
                        </View>)}
                </View>);
        }
        return null;
    }
}
Message.defaultProps = {
    messages: [],
    renderAvatar: undefined,
    renderBubble: undefined,
    renderDay: undefined,
    renderSystemMessage: undefined,
    position: 'left',
    currentMessage: undefined,
    nextMessage: undefined,
    previousMessage: undefined,
    user: undefined,
    messageContainerStyle: {},
    showUserAvatar: false,
    inverted: true,
    shouldUpdateMessage: undefined,
    onMessageLayout: undefined,
};
export default withBunnyKit(Message);
