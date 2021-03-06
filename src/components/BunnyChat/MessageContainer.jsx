import React from 'react';
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import LoadEarlier from './LoadEarlier';
import Message from './Message';
import { warning } from './utils';
import TypingIndicator from './TypingIndicator';
import { withBunnyKit } from '../../hooks/bunny-kit';
const makeStyles = (sizeLabor, themeLabor) => {
    const { ms } = sizeLabor;
    const { wp } = sizeLabor.designsBasedOn.iphoneX;
    const { theme: { colors } } = themeLabor;
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        containerAlignTop: {
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
        contentContainerStyle: {
            flexGrow: 1,
            justifyContent: 'flex-start',
        },
        emptyChatContainer: {
            flex: 1,
            transform: [{ scaleY: -1 }],
        },
        headerWrapper: {
            flex: 1,
        },
        listStyle: {
            flex: 1,
        },
        scrollToBottomStyle: {
            opacity: 0.8,
            position: 'absolute',
            right: wp(10),
            bottom: wp(30),
            zIndex: 999,
            height: wp(40),
            width: wp(40),
            borderRadius: wp(20),
            backgroundColor: colors.backdrop,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: colors.shadow,
            shadowOpacity: 0.5,
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: wp(1),
        },
        scrollToBottomButton: {
            fontSize: ms.fs.m,
            color: colors.text3
        }
    });
};
class MessageContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showScrollBottom: false,
            hasScrolled: false,
        };
        this.renderTypingIndicator = () => {
            if (Platform.OS === 'web') {
                return null;
            }
            return <TypingIndicator isTyping={this.props.isTyping || false}/>;
        };
        this.renderFooter = () => {
            if (this.props.renderFooter) {
                return this.props.renderFooter(this.props);
            }
            return this.renderTypingIndicator();
        };
        this.renderLoadEarlier = () => {
            if (this.props.loadEarlier === true) {
                // const loadEarlierProps = {
                //     ...this.props,
                // }
                const { onLoadEarlier, isLoadingEarlier, loadEarlierLabel, loadEarlierContainerStyle, loadEarlierWrapperStyle, loadEarlierTextStyle, activityIndicatorStyle, activityIndicatorColor, activityIndicatorSize, isDebug } = this.props;
                const loadEarlierProps = {
                    onLoadEarlier,
                    isLoadingEarlier,
                    loadEarlierLabel,
                    loadEarlierContainerStyle,
                    loadEarlierWrapperStyle,
                    loadEarlierTextStyle,
                    activityIndicatorStyle,
                    activityIndicatorColor,
                    activityIndicatorSize
                };
                isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', '[level2]MessageContainer loadEarlierProps', loadEarlierProps);
                if (this.props.renderLoadEarlier) {
                    return this.props.renderLoadEarlier(loadEarlierProps);
                }
                return <LoadEarlier {...loadEarlierProps}/>;
            }
            return null;
        };
        this.scrollToBottom = (animated = true) => {
            const { inverted } = this.props;
            if (inverted) {
                this.scrollTo({ offset: 0, animated });
            }
            else if (this.props.forwardRef && this.props.forwardRef.current) {
                this.props.forwardRef.current.scrollToEnd({ animated });
            }
        };
        this.handleOnScroll = (event) => {
            const { nativeEvent: { contentOffset: { y: contentOffsetY }, contentSize: { height: contentSizeHeight }, layoutMeasurement: { height: layoutMeasurementHeight }, }, } = event;
            const { scrollToBottomOffset } = this.props;
            if (this.props.inverted) {
                if (contentOffsetY > scrollToBottomOffset) {
                    this.setState({ showScrollBottom: true, hasScrolled: true });
                }
                else {
                    this.setState({ showScrollBottom: false, hasScrolled: true });
                }
            }
            else {
                if (contentOffsetY < scrollToBottomOffset &&
                    contentSizeHeight - layoutMeasurementHeight > scrollToBottomOffset) {
                    this.setState({ showScrollBottom: true, hasScrolled: true });
                }
                else {
                    this.setState({ showScrollBottom: false, hasScrolled: true });
                }
            }
        };
        this.renderRow = ({ item, index }) => {
            if (!item._id && item._id !== 0) {
                warning('BunnyChat: `_id` is missing for message', JSON.stringify(item));
            }
            if (!item.user) {
                if (!item.system) {
                    warning('BunnyChat: `user` is missing for message', JSON.stringify(item));
                }
                item.user = { _id: 0 };
            }
            const { messages, user, inverted } = this.props;
            if (messages && user) {
                const previousMessage = (inverted ? messages[index + 1] : messages[index - 1]) || {};
                const nextMessage = (inverted ? messages[index - 1] : messages[index + 1]) || {};
                const { audioContainerStyle, audioStyle, audioProps, avatarContainerStyle, avatarImageStyle, avatarTextStyle, bubbleWrapperStyle, bubbleContainerStyle, bottomContainerStyle, customTextStyle, containerToPreviousStyle, containerToNextStyle, quickRepliesColor, dateFormat, dayContainerStyle, dayTextProps, dayTextStyle, dayWrapperStyle, isCustomViewBottom, imageStyle, imageProps, imageContainerStyle, isDebug, keepReplies, lightBoxProps, linkStyle, messageContainerStyle, phoneNumberOptionTitles, onLongPress, onMessageLoad, onMessageLoadEnd, onMessageLoadError, onMessageLoadStart, onMessageReadyForDisplay, onPress, onQuickReply, onLongPressAvatar, onMessageLayout, onPressAvatar, parsePatterns, quickReplyStyle, renderCustomView, renderMessageAudio, renderMessageImage, renderMessageSticker, renderMessageText, renderMessageVideo, renderQuickReplies, renderQuickReplySend, renderTicks, renderTime, renderUsernameOnMessage, renderAvatar, renderAvatarOnTop, renderBubble, renderDay, renderSystemMessage, stickerProps, stickerContainerStyle, sendText, stickerStyle, shouldUpdateMessage, showAvatarForEveryMessage, showUserAvatar, systemMessageContainerStyle, systemMessageWrapperStyle, systemTextStyle, touchableProps, timeTextStyle, timeFormat, timeContainerStyle, tickStyle, textStyle, textProps, textContainerStyle, usernameStyle, videoContainerStyle, videoStyle, videoProps, audioProgressStyle, audioPlayButtonStyle, audioProgressColor, audioRemainTimeStyle, audioPlayButtonIconStyle, } = this.props;
                const messageProps = {
                    audioContainerStyle,
                    audioStyle,
                    audioProps,
                    avatarContainerStyle,
                    avatarImageStyle,
                    avatarTextStyle,
                    bubbleWrapperStyle,
                    bubbleContainerStyle,
                    bottomContainerStyle,
                    customTextStyle,
                    containerToPreviousStyle,
                    containerToNextStyle,
                    quickRepliesColor,
                    dateFormat,
                    dayContainerStyle,
                    dayTextProps,
                    dayTextStyle,
                    dayWrapperStyle,
                    isCustomViewBottom,
                    imageStyle,
                    imageProps,
                    imageContainerStyle,
                    isDebug,
                    keepReplies,
                    lightBoxProps,
                    linkStyle,
                    messageContainerStyle,
                    nextMessage,
                    phoneNumberOptionTitles,
                    onLongPress,
                    onMessageLoad,
                    onMessageLoadEnd,
                    onMessageLoadError,
                    onMessageLoadStart,
                    onMessageReadyForDisplay,
                    onPress,
                    onQuickReply,
                    onLongPressAvatar,
                    onMessageLayout,
                    onPressAvatar,
                    parsePatterns,
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
                    renderAvatar,
                    renderAvatarOnTop,
                    renderBubble,
                    renderDay,
                    renderSystemMessage,
                    stickerProps,
                    stickerContainerStyle,
                    sendText,
                    stickerStyle,
                    shouldUpdateMessage,
                    showAvatarForEveryMessage,
                    showUserAvatar,
                    systemMessageContainerStyle,
                    systemMessageWrapperStyle,
                    systemTextStyle,
                    touchableProps,
                    timeTextStyle,
                    timeFormat,
                    timeContainerStyle,
                    tickStyle,
                    textStyle,
                    textProps,
                    textContainerStyle,
                    usernameStyle,
                    user,
                    videoContainerStyle,
                    videoStyle,
                    videoProps,
                    audioProgressStyle,
                    audioPlayButtonStyle,
                    audioProgressColor,
                    audioRemainTimeStyle,
                    audioPlayButtonIconStyle,
                    inverted,
                    key: item._id,
                    currentMessage: item,
                    position: item.user._id === user._id ? 'right' : 'left',
                };
                isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', '[level2]MessageContainer messageProps', messageProps);
                if (this.props.renderMessage) {
                    return this.props.renderMessage(messageProps);
                }
                return <Message {...messageProps}/>;
                // return <Message {...messageProps} />
            }
            return null;
        };
        this.renderChatEmpty = () => {
            const { bunnyKit: { sizeLabor, themeLabor } } = this.props;
            const styles = makeStyles(sizeLabor, themeLabor);
            if (this.props.renderChatEmpty) {
                return this.props.inverted ? (this.props.renderChatEmpty()) : (<View style={styles.emptyChatContainer}>
                    {this.props.renderChatEmpty()}
                </View>);
            }
            return <View style={styles.container}/>;
        };
        this.renderHeaderWrapper = () => {
            const { bunnyKit: { sizeLabor, themeLabor } } = this.props;
            const styles = makeStyles(sizeLabor, themeLabor);
            return (<View style={styles.headerWrapper}>{this.renderLoadEarlier()}</View>);
        };
        this.onLayoutList = () => {
            if (!this.props.inverted &&
                !!this.props.messages &&
                this.props.messages.length) {
                setTimeout(() => this.scrollToBottom && this.scrollToBottom(false), 15 * this.props.messages.length);
            }
        };
        this.onEndReached = ({ distanceFromEnd }) => {
            const { loadEarlier, onLoadEarlier, infiniteScroll, isLoadingEarlier, } = this.props;
            if (infiniteScroll &&
                (this.state.hasScrolled || distanceFromEnd > 0) &&
                distanceFromEnd <= 100 &&
                loadEarlier &&
                onLoadEarlier &&
                !isLoadingEarlier &&
                Platform.OS !== 'web') {
                onLoadEarlier();
            }
        };
        this.keyExtractor = (item) => `${item._id}`;
    }
    scrollTo(options) {
        if (this.props.forwardRef && this.props.forwardRef.current && options) {
            this.props.forwardRef.current.scrollToOffset(options);
        }
    }
    renderScrollBottomComponent() {
        const { renderScrollToBottom, bunnyKit: { sizeLabor, themeLabor } } = this.props;
        const styles = makeStyles(sizeLabor, themeLabor);
        if (renderScrollToBottom) {
            return renderScrollToBottom();
        }
        return <Text style={styles.scrollToBottomButton}>v</Text>;
    }
    renderScrollToBottomWrapper() {
        const propsStyle = this.props.scrollToBottomStyle || {};
        const { bunnyKit: { sizeLabor, themeLabor } } = this.props;
        const styles = makeStyles(sizeLabor, themeLabor);
        return (<View style={[styles.scrollToBottomStyle, propsStyle]}>
                <TouchableOpacity onPress={() => this.scrollToBottom()} hitSlop={{ top: 5, left: 5, right: 5, bottom: 5 }}>
                    {this.renderScrollBottomComponent()}
                </TouchableOpacity>
            </View>);
    }
    render() {
        const { inverted, bunnyKit: { sizeLabor, themeLabor } } = this.props;
        const styles = makeStyles(sizeLabor, themeLabor);
        return (<View style={this.props.alignTop ? styles.containerAlignTop : styles.container}>
                {this.state.showScrollBottom && this.props.scrollToBottom
                ? this.renderScrollToBottomWrapper()
                : null}
                {/*<FlatList<TMessage>*/}
                <FlatList ref={this.props.forwardRef} extraData={[this.props.extraData, this.props.isTyping]} keyExtractor={this.keyExtractor} enableEmptySections automaticallyAdjustContentInsets={false} inverted={inverted} data={this.props.messages} style={styles.listStyle} contentContainerStyle={styles.contentContainerStyle} renderItem={this.renderRow} {...this.props.invertibleScrollViewProps} ListEmptyComponent={this.renderChatEmpty} ListFooterComponent={inverted ? this.renderHeaderWrapper : this.renderFooter} ListHeaderComponent={inverted ? this.renderFooter : this.renderHeaderWrapper} onScroll={this.handleOnScroll} scrollEventThrottle={100} onLayout={this.onLayoutList} onEndReached={this.onEndReached} onEndReachedThreshold={0.1} {...this.props.listViewProps}/>
            </View>);
    }
}
MessageContainer.defaultProps = {
    messages: [],
    user: undefined,
    isTyping: false,
    renderChatEmpty: undefined,
    renderFooter: undefined,
    renderMessage: undefined,
    onLoadEarlier: () => {
    },
    onQuickReply: () => {
    },
    inverted: true,
    loadEarlier: false,
    // TODO if({}) return true,this may cause issues
    listViewProps: {},
    invertibleScrollViewProps: {},
    extraData: null,
    scrollToBottom: false,
    scrollToBottomOffset: 200,
    alignTop: false,
    scrollToBottomStyle: {},
    infiniteScroll: false,
    isLoadingEarlier: false,
};
export default withBunnyKit(MessageContainer);
