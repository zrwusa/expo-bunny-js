import React from 'react';
import { ActivityIndicator, Clipboard, StyleSheet, Text, TouchableWithoutFeedback, View, } from 'react-native';
import QuickReplies from './QuickReplies';
import MessageText from './MessageText';
import MessageImage from './MessageImage';
import MessageVideo from './MessageVideo';
import MessageAudio from './MessageAudio';
import Time from './Time';
import { isSameDay, isSameUser } from './utils';
import MessageSticker from './MessageSticker';
import { withBunnyKit } from '../../hooks/bunny-kit';
import { connectActionSheet } from '../../../packages/react-native-action-sheet/src';
const makeStyles = (sizeLabor, themeLabor) => {
    const { wp } = sizeLabor.designsBasedOn.iphoneX;
    const { theme: { colors } } = themeLabor;
    return {
        left: StyleSheet.create({
            container: {
                flex: 1,
                alignItems: 'flex-start',
            },
            wrapper: {
                borderRadius: wp(15),
                backgroundColor: colors.backgroundA,
                marginRight: wp(60),
                minHeight: wp(20),
                justifyContent: 'flex-end',
            },
            containerToNext: {
                borderBottomLeftRadius: wp(3),
            },
            containerToPrevious: {
                borderTopLeftRadius: wp(3),
            },
            bottom: {
                flexDirection: 'row',
                justifyContent: 'flex-start',
            },
        }),
        right: StyleSheet.create({
            container: {
                flex: 1,
                alignItems: 'flex-end',
            },
            wrapper: {
                borderRadius: wp(15),
                backgroundColor: colors.backgroundB,
                marginLeft: wp(60),
                minHeight: wp(20),
                justifyContent: 'flex-end',
            },
            containerToNext: {
                borderBottomRightRadius: wp(3),
            },
            containerToPrevious: {
                borderTopRightRadius: wp(3),
            },
            bottom: {
                flexDirection: 'row',
                justifyContent: 'flex-end',
            },
        }),
        content: StyleSheet.create({
            tick: {
                fontSize: wp(10),
                backgroundColor: colors.transparent,
                color: colors.textB,
            },
            tickView: {
                flexDirection: 'row',
                marginRight: wp(10),
            },
            username: {
                top: wp(-3),
                left: 0,
                fontSize: wp(12),
                backgroundColor: 'transparent',
                color: '#aaa',
            },
            usernameView: {
                flexDirection: 'row',
                marginHorizontal: wp(10),
            },
        }),
    };
};
// TODO need i18n
const DEFAULT_OPTION_TITLES = ['Copy Text', 'Cancel'];
class Bubble extends React.Component {
    constructor() {
        super(...arguments);
        this.onPress = () => {
            if (this.props.onPress) {
                this.props.onPress(this.context, this.props.currentMessage);
            }
        };
        this.onLongPress = () => {
            const { currentMessage } = this.props;
            if (this.props.onLongPress) {
                this.props.onLongPress(this.context, this.props.currentMessage);
            }
            else if (currentMessage && currentMessage.text) {
                const { textLongPressOptionTitles } = this.props;
                const options = textLongPressOptionTitles && textLongPressOptionTitles.length > 0
                    ? textLongPressOptionTitles.slice(0, 2)
                    : DEFAULT_OPTION_TITLES;
                const cancelButtonIndex = options.length - 1;
                this.props.showActionSheetWithOptions({
                    options,
                    cancelButtonIndex,
                }, (buttonIndex) => {
                    switch (buttonIndex) {
                        case 0:
                            Clipboard.setString(currentMessage.text);
                            break;
                        default:
                            break;
                    }
                });
            }
        };
    }
    styledBubbleToNext() {
        const { currentMessage, nextMessage, position, containerToNextStyle, bunnyKit, } = this.props;
        if (currentMessage &&
            nextMessage &&
            position &&
            isSameUser(currentMessage, nextMessage) &&
            isSameDay(currentMessage, nextMessage)) {
            const { sizeLabor, themeLabor } = bunnyKit;
            const styles = makeStyles(sizeLabor, themeLabor);
            return [
                styles[position].containerToNext,
                containerToNextStyle && containerToNextStyle[position],
            ];
        }
        return null;
    }
    styledBubbleToPrevious() {
        const { currentMessage, previousMessage, position, containerToPreviousStyle, bunnyKit } = this.props;
        if (currentMessage &&
            previousMessage &&
            position &&
            isSameUser(currentMessage, previousMessage) &&
            isSameDay(currentMessage, previousMessage)) {
            const { sizeLabor, themeLabor } = bunnyKit;
            const styles = makeStyles(sizeLabor, themeLabor);
            return [
                styles[position].containerToPrevious,
                containerToPreviousStyle && containerToPreviousStyle[position],
            ];
        }
        return null;
    }
    renderQuickReplies() {
        const { currentMessage, nextMessage, } = this.props;
        if (currentMessage && currentMessage.quickReplies) {
            const { onQuickReply, quickRepliesColor, sendText, keepReplies, renderQuickReplySend, quickReplyStyle } = this.props;
            const quickRepliesProps = {
                currentMessage,
                nextMessage,
                onQuickReply,
                quickRepliesColor,
                sendText,
                keepReplies,
                renderQuickReplySend,
                quickReplyStyle
            };
            if (this.props.renderQuickReplies) {
                return this.props.renderQuickReplies(quickRepliesProps);
            }
            return (<QuickReplies {...quickRepliesProps}/>
            // <QuickReplies {...quickRepliesProps} />
            );
        }
        return null;
    }
    renderMessageText() {
        if (this.props.currentMessage && this.props.currentMessage.text) {
            const { position, phoneNumberOptionTitles, currentMessage, textContainerStyle, textStyle, linkStyle, customTextStyle, textProps, parsePatterns, onMessageLoad, onMessageLoadStart, onMessageLoadEnd, onMessageReadyForDisplay, onMessageLoadError, isDebug, } = this.props;
            const messageTextProps = {
                position,
                phoneNumberOptionTitles,
                currentMessage,
                textContainerStyle,
                textStyle,
                linkStyle,
                customTextStyle,
                textProps,
                parsePatterns,
                onMessageLoad,
                onMessageLoadStart,
                onMessageLoadEnd,
                onMessageReadyForDisplay,
                onMessageLoadError,
                isDebug,
            };
            if (this.props.renderMessageText) {
                return this.props.renderMessageText(messageTextProps);
            }
            return <MessageText {...messageTextProps}/>;
            // return <MessageText {...messageTextProps} />
        }
        return null;
    }
    renderMessageImage() {
        if (this.props.currentMessage && this.props.currentMessage.image) {
            const { messages, currentMessage, imageContainerStyle, imageStyle, imageProps, lightBoxProps, onMessageLoad, onMessageLoadStart, onMessageLoadEnd, onMessageReadyForDisplay, onMessageLoadError, isDebug } = this.props;
            const messageImageProps = {
                messages,
                currentMessage,
                imageContainerStyle,
                imageStyle,
                imageProps,
                lightBoxProps,
                onMessageLoad,
                onMessageLoadStart,
                onMessageLoadEnd,
                onMessageReadyForDisplay,
                onMessageLoadError,
                isDebug
            };
            if (this.props.renderMessageImage) {
                return this.props.renderMessageImage(messageImageProps);
            }
            return <MessageImage {...messageImageProps}/>;
            // return <MessageImage {...messageImageProps} />
        }
        return null;
    }
    renderMessageSticker() {
        if (this.props.currentMessage && this.props.currentMessage.sticker) {
            const { currentMessage, stickerContainerStyle, stickerStyle, stickerProps, onMessageLoad, onMessageLoadStart, onMessageLoadEnd, onMessageReadyForDisplay, onMessageLoadError, isDebug } = this.props;
            const messageStickerProps = {
                currentMessage,
                stickerContainerStyle,
                stickerStyle,
                stickerProps,
                onMessageLoad,
                onMessageLoadStart,
                onMessageLoadEnd,
                onMessageReadyForDisplay,
                onMessageLoadError,
                isDebug
            };
            if (this.props.renderMessageSticker) {
                return this.props.renderMessageSticker(messageStickerProps);
            }
            return <MessageSticker {...messageStickerProps}/>;
            // return <MessageSticker {...messageStickerProps} />
        }
        return null;
    }
    renderMessageVideo() {
        if (this.props.currentMessage && this.props.currentMessage.video) {
            // const {bubbleContainerStyle, bubbleWrapperStyle, ...messageVideoProps} = this.props
            const { currentMessage, videoContainerStyle, videoStyle, videoProps, onMessageLoad, onMessageLoadStart, onMessageLoadEnd, onMessageReadyForDisplay, onMessageLoadError, isDebug } = this.props;
            const messageVideoProps = {
                currentMessage,
                videoContainerStyle,
                videoStyle,
                videoProps,
                onMessageLoad,
                onMessageLoadStart,
                onMessageLoadEnd,
                onMessageReadyForDisplay,
                onMessageLoadError,
                isDebug
            };
            if (this.props.renderMessageVideo) {
                return this.props.renderMessageVideo(messageVideoProps);
            }
            return <MessageVideo {...messageVideoProps}/>;
            // return <MessageVideo {...messageVideoProps} />
        }
        return null;
    }
    renderMessageAudio() {
        if (this.props.currentMessage && this.props.currentMessage.audio) {
            const { currentMessage, audioContainerStyle, audioStyle, audioProps, onMessageLoad, onMessageLoadStart, onMessageLoadEnd, onMessageReadyForDisplay, onMessageLoadError, isDebug, position, audioProgressStyle, audioPlayButtonStyle, audioProgressColor, audioRemainTimeStyle, audioPlayButtonIconStyle, } = this.props;
            const messageAudioProps = {
                currentMessage,
                audioContainerStyle,
                audioStyle,
                audioProps,
                onMessageLoad,
                onMessageLoadStart,
                onMessageLoadEnd,
                onMessageReadyForDisplay,
                onMessageLoadError,
                isDebug,
                position,
                audioProgressStyle,
                audioPlayButtonStyle,
                audioProgressColor,
                audioRemainTimeStyle,
                audioPlayButtonIconStyle,
            };
            if (this.props.renderMessageAudio) {
                return this.props.renderMessageAudio(messageAudioProps);
            }
            return <MessageAudio {...messageAudioProps}/>;
            // return <MessageAudio {...messageAudioProps} />
        }
        return null;
    }
    renderTicks() {
        const { currentMessage, renderTicks, user, bunnyKit } = this.props;
        if (renderTicks && currentMessage) {
            return renderTicks(currentMessage);
        }
        if (currentMessage &&
            user &&
            currentMessage.user &&
            currentMessage.user._id !== user._id) {
            return null;
        }
        if (currentMessage &&
            (currentMessage.sent || currentMessage.received || currentMessage.pending)) {
            const { sizeLabor, themeLabor } = bunnyKit;
            const styles = makeStyles(sizeLabor, themeLabor);
            const { wp } = sizeLabor.designsBasedOn.iphoneX;
            return (<View style={styles.content.tickView}>
                    {!!currentMessage.sent && (<Text style={[styles.content.tick, this.props.tickStyle]}>???</Text>)}
                    {!!currentMessage.received && (<Text style={[styles.content.tick, this.props.tickStyle]}>???</Text>)}
                    {!!currentMessage.pending && (
                // <Text style={[styles.content.tick, this.props.tickStyle]}>????</Text>
                <ActivityIndicator color={'white'} size={wp(10)}/>)}
                </View>);
        }
        return null;
    }
    renderTime() {
        if (this.props.currentMessage && this.props.currentMessage.createdAt) {
            const { position, currentMessage, timeContainerStyle, timeFormat, timeTextStyle } = this.props;
            const timeProps = {
                position,
                currentMessage,
                timeContainerStyle,
                timeFormat,
                timeTextStyle
            };
            if (this.props.renderTime) {
                return this.props.renderTime(timeProps);
            }
            return <Time {...timeProps}/>;
            // return <Time {...timeProps} />
        }
        return null;
    }
    renderUsername() {
        const { currentMessage, user, bunnyKit } = this.props;
        if (this.props.renderUsernameOnMessage && currentMessage) {
            if (user && currentMessage.user._id === user._id) {
                return null;
            }
            const { sizeLabor, themeLabor } = bunnyKit;
            const styles = makeStyles(sizeLabor, themeLabor);
            return (<View style={styles.content.usernameView}>
                    <Text style={[styles.content.username, this.props.usernameStyle]}>
                        ~ {currentMessage.user.name}
                    </Text>
                </View>);
        }
        return null;
    }
    renderCustomView() {
        if (this.props.renderCustomView) {
            return this.props.renderCustomView(this.props);
        }
        return null;
    }
    renderBubbleContent() {
        return this.props.isCustomViewBottom ? (<View>
                {this.renderMessageImage()}
                {this.renderMessageSticker()}
                {this.renderMessageVideo()}
                {this.renderMessageAudio()}
                {this.renderMessageText()}
                {this.renderCustomView()}
            </View>) : (<View>
                {this.renderCustomView()}
                {this.renderMessageImage()}
                {this.renderMessageSticker()}
                {this.renderMessageVideo()}
                {this.renderMessageAudio()}
                {this.renderMessageText()}
            </View>);
    }
    render() {
        const { position, bubbleContainerStyle, bubbleWrapperStyle, bottomContainerStyle, bunnyKit } = this.props;
        const { sizeLabor, themeLabor } = bunnyKit;
        const styles = makeStyles(sizeLabor, themeLabor);
        return (<View style={[
                styles[position].container,
                bubbleContainerStyle && bubbleContainerStyle[position],
            ]}>
                <View style={[
                styles[position].wrapper,
                this.styledBubbleToNext(),
                this.styledBubbleToPrevious(),
                bubbleWrapperStyle && bubbleWrapperStyle[position],
            ]}>
                    <TouchableWithoutFeedback onPress={this.onPress} onLongPress={this.onLongPress} 
        // @ts-ignore
        accessibilityTraits="text" {...this.props.touchableProps}>
                        <View>
                            {this.renderBubbleContent()}
                            <View style={[
                styles[position].bottom,
                bottomContainerStyle && bottomContainerStyle[position],
            ]}>
                                {this.renderUsername()}
                                {this.renderTime()}
                                {this.renderTicks()}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                {this.renderQuickReplies()}
            </View>);
    }
}
Bubble.defaultProps = {
    messages: [],
    touchableProps: {},
    onPress: undefined,
    onLongPress: undefined,
    renderMessageImage: undefined,
    renderMessageSticker: undefined,
    renderMessageVideo: undefined,
    renderMessageAudio: undefined,
    renderMessageText: undefined,
    renderCustomView: undefined,
    renderUsername: undefined,
    renderTicks: undefined,
    renderTime: undefined,
    renderQuickReplies: undefined,
    onQuickReply: undefined,
    onMessageLoad: undefined,
    onMessageLoadStart: undefined,
    onMessageLoadEnd: undefined,
    onMessageLoadError: undefined,
    position: 'left',
    textLongPressOptionTitles: DEFAULT_OPTION_TITLES,
    currentMessage: undefined,
    nextMessage: undefined,
    previousMessage: undefined,
    bubbleContainerStyle: {},
    bubbleWrapperStyle: {},
    bottomContainerStyle: {},
    tickStyle: {},
    usernameStyle: {},
    containerToNextStyle: {},
    containerToPreviousStyle: {},
};
export default withBunnyKit(connectActionSheet(Bubble));
