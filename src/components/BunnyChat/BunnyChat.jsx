import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, View, } from 'react-native';
import { ActionSheetProvider, } from '../../../packages/react-native-action-sheet/src';
import { v4 } from 'uuid';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import * as utils from './utils';
import Actions from './Actions';
import ChatAvatar from './ChatAvatar';
import Bubble from './Bubble';
import SystemMessage from './SystemMessage';
import MessageImage from './MessageImage';
import MessageSticker from './MessageSticker';
import MessageText from './MessageText';
import Composer from './Composer';
import Day from './Day';
import InputToolbar from './InputToolbar';
import LoadEarlier from './LoadEarlier';
import Message from './Message';
import MessageContainer from './MessageContainer';
import Send from './Send';
import Time from './Time';
import BunnyAvatar from './BunnyAvatar';
import { DATE_FORMAT, DEFAULT_PLACEHOLDER, MAX_COMPOSER_HEIGHT, MIN_COMPOSER_HEIGHT, TIME_FORMAT, } from './Constant';
import { withBunnyKit } from '../../hooks/bunny-kit';
dayjs.extend(localizedFormat);
class BunnyChatInner extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this._keyboardHeight = 0;
        this._bottomOffset = 0;
        this._maxHeight = undefined;
        this._isFirstLayout = true;
        this._locale = 'en';
        this.invertibleScrollViewProps = undefined;
        this._actionSheetRef = undefined;
        this._messageContainerRef = React.createRef();
        this._isTextInputWasFocused = false;
        this.state = {
            isInitialized: false,
            composerHeight: this.props.minComposerHeight,
            messagesContainerHeight: undefined,
            typingDisabled: false,
            text: undefined,
            messages: undefined,
        };
        this.safeAreaSupport = (bottomOffset) => {
            return bottomOffset != null ? bottomOffset : getBottomSpace();
        };
        this.onKeyboardWillShow = (e) => {
            this.handleTextInputFocusWhenKeyboardShow();
            if (this.props.isKeyboardInternallyHandled) {
                this.setIsTypingDisabled(true);
                this.setKeyboardHeight(e.endCoordinates ? e.endCoordinates.height : e.end.height);
                this.setBottomOffset(this.safeAreaSupport(this.props.bottomOffset));
                const newMessagesContainerHeight = this.getMessagesContainerHeightWithKeyboard();
                this.setState({
                    messagesContainerHeight: newMessagesContainerHeight,
                });
            }
        };
        this.onKeyboardWillHide = (_e) => {
            this.handleTextInputFocusWhenKeyboardHide();
            if (this.props.isKeyboardInternallyHandled) {
                this.setIsTypingDisabled(true);
                this.setKeyboardHeight(0);
                this.setBottomOffset(0);
                const newMessagesContainerHeight = this.getBasicMessagesContainerHeight();
                this.setState({
                    messagesContainerHeight: newMessagesContainerHeight,
                });
            }
        };
        this.onKeyboardDidShow = (e) => {
            if (Platform.OS === 'android') {
                this.onKeyboardWillShow(e);
            }
            this.setIsTypingDisabled(false);
        };
        this.onKeyboardDidHide = (e) => {
            if (Platform.OS === 'android') {
                this.onKeyboardWillHide(e);
            }
            this.setIsTypingDisabled(false);
        };
        this.onSend = (messages = [], shouldResetInputToolbar = false) => {
            if (!Array.isArray(messages)) {
                messages = [messages];
            }
            const newMessages = messages.map(message => {
                return {
                    ...message,
                    user: this.props.user,
                    createdAt: new Date(),
                    _id: this.props.messageIdGenerator && this.props.messageIdGenerator(),
                };
            });
            if (shouldResetInputToolbar) {
                this.setIsTypingDisabled(true);
                this.resetInputToolbar();
            }
            if (this.props.onSend) {
                this.props.onSend(newMessages, shouldResetInputToolbar);
            }
            if (shouldResetInputToolbar) {
                setTimeout(() => {
                    if (this.getIsMounted()) {
                        this.setIsTypingDisabled(false);
                    }
                }, 100);
            }
        };
        this.onInputSizeChanged = (size) => {
            const { bunnyKit: { wp } } = this.props;
            const newComposerHeight = Math.max(this.props.minComposerHeight, Math.min(this.props.maxComposerHeight, size.height));
            const newMessagesContainerHeight = this.getMessagesContainerHeightWithKeyboard(newComposerHeight);
            this.setState({
                composerHeight: newComposerHeight,
                messagesContainerHeight: newMessagesContainerHeight,
            });
        };
        this.onInputTextChanged = (text) => {
            // TODO consider to move this to Composer
            if (this.getIsTypingDisabled()) {
                return;
            }
            if (this.props.onInputTextChanged) {
                this.props.onInputTextChanged(text);
            }
            // Only set state if it's not being overridden by a prop.
            if (this.props.text === undefined) {
                this.setState({ text });
            }
        };
        this.onInitialLayoutViewLayout = (e) => {
            const { layout } = e.nativeEvent;
            if (layout.height <= 0) {
                return;
            }
            this.notifyInputTextReset();
            this.setMaxHeight(layout.height);
            const newComposerHeight = this.props.minComposerHeight;
            const newMessagesContainerHeight = this.getMessagesContainerHeightWithKeyboard(newComposerHeight);
            const initialText = this.props.initialText || '';
            this.setState({
                isInitialized: true,
                text: this.getTextFromProp(initialText),
                composerHeight: newComposerHeight,
                messagesContainerHeight: newMessagesContainerHeight,
            });
        };
        this.onMainViewLayout = (e) => {
            // fix an issue when keyboard is dismissing during the initialization
            const { layout } = e.nativeEvent;
            if (this.getMaxHeight() !== layout.height ||
                this.getIsFirstLayout() === true) {
                this.setMaxHeight(layout.height);
                this.setState({
                    messagesContainerHeight: this._keyboardHeight > 0
                        ? this.getMessagesContainerHeightWithKeyboard()
                        : this.getBasicMessagesContainerHeight(),
                });
            }
            if (this.getIsFirstLayout() === true) {
                this.setIsFirstLayout(false);
            }
        };
        this.invertibleScrollViewProps = {
            inverted: this.props.inverted,
            keyboardShouldPersistTaps: this.props.keyboardShouldPersistTaps,
            onKeyboardWillShow: this.onKeyboardWillShow,
            onKeyboardWillHide: this.onKeyboardWillHide,
            onKeyboardDidShow: this.onKeyboardDidShow,
            onKeyboardDidHide: this.onKeyboardDidHide,
        };
    }
    static append(currentMessages = [], messages, inverted = true) {
        if (!Array.isArray(messages)) {
            messages = [messages];
        }
        return inverted
            ? messages.concat(currentMessages)
            : currentMessages.concat(messages);
    }
    static prepend(currentMessages = [], messages, inverted = true) {
        if (!Array.isArray(messages)) {
            messages = [messages];
        }
        return inverted
            ? currentMessages.concat(messages)
            : messages.concat(currentMessages);
    }
    componentDidMount() {
        const { messages, text } = this.props;
        this.setIsMounted(true);
        // this.initLocale()
        this.setMessages(messages || []);
        this.setTextFromProp(text);
    }
    componentWillUnmount() {
        this.setIsMounted(false);
    }
    componentDidUpdate(prevProps) {
        const { messages, text, inverted } = this.props;
        if (this.props !== prevProps) {
            this.setMessages(messages || []);
        }
        if (inverted === false &&
            messages &&
            prevProps.messages &&
            messages.length !== prevProps.messages.length) {
            setTimeout(() => this.scrollToBottom(false), 200);
        }
        if (text !== prevProps.text) {
            this.setTextFromProp(text);
        }
    }
    setTextFromProp(textProp) {
        // Text prop takes precedence over state.
        if (textProp !== undefined && textProp !== this.state.text) {
            this.setState({ text: textProp });
        }
    }
    getTextFromProp(fallback) {
        if (this.props.text === undefined) {
            return fallback;
        }
        return this.props.text;
    }
    setMessages(messages) {
        this.setState({ messages });
    }
    getMessages() {
        return this.state.messages;
    }
    setMaxHeight(height) {
        this._maxHeight = height;
    }
    getMaxHeight() {
        return this._maxHeight;
    }
    setKeyboardHeight(height) {
        this._keyboardHeight = height;
    }
    getKeyboardHeight() {
        if (Platform.OS === 'android' && !this.props.forceGetKeyboardHeight) {
            // For android: on-screen keyboard resized main container and has own height.
            // @see https://developer.android.com/training/keyboard-input/visibility.html
            // So for calculate the messages container height ignore keyboard height.
            return 0;
        }
        return this._keyboardHeight;
    }
    setBottomOffset(value) {
        this._bottomOffset = value;
    }
    getBottomOffset() {
        return this._bottomOffset;
    }
    setIsFirstLayout(value) {
        this._isFirstLayout = value;
    }
    getIsFirstLayout() {
        return this._isFirstLayout;
    }
    setIsTypingDisabled(value) {
        this.setState({
            typingDisabled: value,
        });
    }
    getIsTypingDisabled() {
        return this.state.typingDisabled;
    }
    setIsMounted(value) {
        this._isMounted = value;
    }
    getIsMounted() {
        return this._isMounted;
    }
    getMinInputToolbarHeight() {
        return this.props.renderAccessory
            ? this.props.minInputToolbarHeight * 2
            : this.props.minInputToolbarHeight;
    }
    calculateInputToolbarHeight(composerHeight) {
        return (composerHeight +
            (this.getMinInputToolbarHeight() - this.props.minComposerHeight));
    }
    /**
     * Returns the height, based on current window size, without taking the keyboard into account.
     */
    getBasicMessagesContainerHeight(composerHeight = this.state.composerHeight) {
        return (this.getMaxHeight() - this.calculateInputToolbarHeight(composerHeight));
    }
    /**
     * Returns the height, based on current window size, taking the keyboard into account.
     */
    getMessagesContainerHeightWithKeyboard(composerHeight = this.state.composerHeight) {
        return (this.getBasicMessagesContainerHeight(composerHeight) -
            this.getKeyboardHeight() +
            this.getBottomOffset());
    }
    /**
     * Store text input focus status when keyboard hide to retrieve
     * it after wards if needed.
     * `onKeyboardWillHide` may be called twice in sequence so we
     * make a guard condition (eg. showing image picker)
     */
    handleTextInputFocusWhenKeyboardHide() {
        if (!this._isTextInputWasFocused) {
            this._isTextInputWasFocused = this.textInput?.isFocused() || false;
        }
    }
    /**
     * Refocus the text input only if it was focused before showing keyboard.
     * This is needed in some cases (eg. showing image picker).
     */
    handleTextInputFocusWhenKeyboardShow() {
        if (this.textInput &&
            this._isTextInputWasFocused &&
            !this.textInput.isFocused()) {
            this.textInput.focus();
        }
        // Reset the indicator since the keyboard is shown
        this._isTextInputWasFocused = false;
    }
    scrollToBottom(animated = true) {
        if (this._messageContainerRef && this._messageContainerRef.current) {
            const { inverted } = this.props;
            if (!inverted) {
                this._messageContainerRef.current.scrollToEnd({ animated });
            }
            else {
                this._messageContainerRef.current.scrollToOffset({
                    offset: 0,
                    animated,
                });
            }
        }
    }
    renderMessages() {
        const { audioProps, alignTop, activityIndicatorSize, activityIndicatorStyle, audioContainerStyle, audioStyle, avatarContainerStyle, avatarImageStyle, avatarTextStyle, activityIndicatorColor, bottomContainerStyle, bubbleContainerStyle, bubbleWrapperStyle, customTextStyle, containerToPreviousStyle, containerToNextStyle, dayWrapperStyle, dayTextStyle, dayTextProps, dayContainerStyle, dateFormat, extraData, forwardRef, renderFooter, isDebug, isTyping, isLoadingEarlier, isCustomViewBottom, invertibleScrollViewProps, inverted, infiniteScroll, imageStyle, imageProps, imageContainerStyle, keepReplies, loadEarlierWrapperStyle, loadEarlierTextStyle, loadEarlierContainerStyle, loadEarlier, listViewProps, linkStyle, lightBoxProps, loadEarlierLabel, messages, messagesContainerStyle, nextMessage, onMessageReadyForDisplay, onQuickReply, onPressAvatar, onPress, onMessageLayout, onLongPressAvatar, onLongPress, onLoadEarlier, onMessageLoad, onMessageLoadError, onMessageLoadStart, onMessageLoadEnd, phoneNumberOptionTitles, previousMessage, parsePatterns, quickReplyStyle, quickRepliesColor, renderTicks, renderSystemMessage, renderScrollToBottom, renderQuickReplySend, renderQuickReplies, renderMessageVideo, renderMessageText, renderMessageSticker, renderMessageImage, renderMessageAudio, renderMessage, renderLoadEarlier, renderDay, renderCustomView, renderChatEmpty, renderBubble, renderAvatarOnTop, renderAvatar, renderTime, renderUsernameOnMessage, sendText, stickerStyle, stickerProps, scrollToBottom, scrollToBottomOffset, scrollToBottomStyle, shouldUpdateMessage, showAvatarForEveryMessage, showUserAvatar, stickerContainerStyle, systemMessageContainerStyle, systemMessageWrapperStyle, systemTextStyle, textStyle, textLongPressOptionTitles, timeContainerStyle, textContainerStyle, textProps, tickStyle, timeFormat, timeTextStyle, touchableProps, user, usernameStyle, videoContainerStyle, videoProps, videoStyle, audioProgressStyle, audioPlayButtonStyle, audioProgressColor, audioRemainTimeStyle, audioPlayButtonIconStyle, } = this.props;
        const messageContainerProps = {
            audioProps,
            alignTop,
            activityIndicatorSize,
            activityIndicatorStyle,
            audioContainerStyle,
            audioStyle,
            avatarContainerStyle,
            avatarImageStyle,
            avatarTextStyle,
            activityIndicatorColor,
            bottomContainerStyle,
            bubbleContainerStyle,
            bubbleWrapperStyle,
            customTextStyle,
            containerToPreviousStyle,
            containerToNextStyle,
            dayWrapperStyle,
            dayTextStyle,
            dayTextProps,
            dayContainerStyle,
            dateFormat,
            extraData,
            forwardRef,
            renderFooter,
            isDebug,
            isTyping,
            isLoadingEarlier,
            isCustomViewBottom,
            invertibleScrollViewProps,
            inverted,
            infiniteScroll,
            imageStyle,
            imageProps,
            imageContainerStyle,
            keepReplies,
            loadEarlierWrapperStyle,
            loadEarlierTextStyle,
            loadEarlierContainerStyle,
            loadEarlier,
            listViewProps,
            linkStyle,
            lightBoxProps,
            loadEarlierLabel,
            messages,
            nextMessage,
            onMessageReadyForDisplay,
            onQuickReply,
            onPressAvatar,
            onPress,
            onMessageLayout,
            onLongPressAvatar,
            onLongPress,
            onLoadEarlier,
            onMessageLoad,
            onMessageLoadError,
            onMessageLoadStart,
            onMessageLoadEnd,
            phoneNumberOptionTitles,
            previousMessage,
            parsePatterns,
            quickReplyStyle,
            quickRepliesColor,
            renderTicks,
            renderSystemMessage,
            renderScrollToBottom,
            renderQuickReplySend,
            renderQuickReplies,
            renderMessageVideo,
            renderMessageText,
            renderMessageSticker,
            renderMessageImage,
            renderMessageAudio,
            renderMessage,
            renderLoadEarlier,
            renderDay,
            renderCustomView,
            renderChatEmpty,
            renderBubble,
            renderAvatarOnTop,
            renderAvatar,
            renderTime,
            renderUsernameOnMessage,
            sendText,
            stickerStyle,
            stickerProps,
            scrollToBottom,
            scrollToBottomOffset,
            scrollToBottomStyle,
            shouldUpdateMessage,
            showAvatarForEveryMessage,
            showUserAvatar,
            stickerContainerStyle,
            systemMessageContainerStyle,
            systemMessageWrapperStyle,
            systemTextStyle,
            textStyle,
            textLongPressOptionTitles,
            timeContainerStyle,
            textContainerStyle,
            textProps,
            tickStyle,
            timeFormat,
            timeTextStyle,
            touchableProps,
            user,
            usernameStyle,
            videoContainerStyle,
            videoProps,
            videoStyle,
            audioProgressStyle,
            audioPlayButtonStyle,
            audioProgressColor,
            audioRemainTimeStyle,
            audioPlayButtonIconStyle,
        };
        const fragment = (<View style={[
                {
                    height: this.state.messagesContainerHeight,
                },
                messagesContainerStyle,
            ]}>
                <MessageContainer {...messageContainerProps} invertibleScrollViewProps={this.invertibleScrollViewProps} messages={this.getMessages()} 
        // TODO type check error
        // @ts-ignore
        forwardRef={this._messageContainerRef} isTyping={this.props.isTyping}/>
                {this.renderChatFooter()}
            </View>);
        return this.props.isKeyboardInternallyHandled ? (<KeyboardAvoidingView enabled>{fragment}</KeyboardAvoidingView>) : (fragment);
    }
    resetInputToolbar() {
        if (this.textInput) {
            this.textInput.clear();
        }
        this.notifyInputTextReset();
        const newComposerHeight = this.props.minComposerHeight;
        const newMessagesContainerHeight = this.getMessagesContainerHeightWithKeyboard(newComposerHeight);
        this.setState({
            text: this.getTextFromProp(''),
            composerHeight: newComposerHeight,
            messagesContainerHeight: newMessagesContainerHeight,
        });
    }
    focusTextInput() {
        if (this.textInput) {
            this.textInput.focus();
        }
    }
    notifyInputTextReset() {
        if (this.props.onInputTextChanged) {
            this.props.onInputTextChanged('');
        }
    }
    renderInputToolbar() {
        const { actionsConfig, actionSheet, alwaysShowSend, audioProps, bottomOffset, composerHeight, dateFormat, disableComposer, extraData, forceGetKeyboardHeight, imageProps, inverted, isCustomViewBottom, isKeyboardInternallyHandled, isLoadingEarlier, keyboardShouldPersistTaps, lightBoxProps, listViewProps, loadEarlier, locale, maxComposerHeight, maxInputLength, messageIdGenerator, messages, messagesContainerStyle, minComposerHeight, minInputToolbarHeight, onInputSizeChanged, onInputTextChanged, onLoadEarlier, onLongPress, onLongPressAvatar, onMessageLoad, onMessageLoadEnd, onMessageLoadError, onMessageLoadStart, onMessageReadyForDisplay, onPressActionButton, onPressAvatar, onSend, onTextChanged, placeholder, renderAccessory, renderActions, renderAvatar, renderAvatarOnTop, renderBubble, renderChatEmpty, renderChatFooter, renderComposer, renderCustomView, renderDay, renderFooter, renderInputToolbar, renderLoadEarlier, renderLoading, renderMessage, renderMessageAudio, renderMessageImage, renderMessageSticker, renderMessageText, renderMessageVideo, renderSend, renderSystemMessage, renderTime, renderUsernameOnMessage, showUserAvatar, stickerProps, text, textInputProps, timeFormat, user, videoProps, wrapInSafeArea } = this.props;
        const inputToolbarProps = {
            actionsConfig,
            actionSheet,
            alwaysShowSend,
            audioProps,
            bottomOffset,
            dateFormat,
            disableComposer,
            extraData,
            forceGetKeyboardHeight,
            imageProps,
            inverted,
            isCustomViewBottom,
            isKeyboardInternallyHandled,
            isLoadingEarlier,
            keyboardShouldPersistTaps,
            lightBoxProps,
            listViewProps,
            loadEarlier,
            locale,
            maxComposerHeight,
            maxInputLength,
            messageIdGenerator,
            messages,
            messagesContainerStyle,
            minComposerHeight,
            minInputToolbarHeight,
            onInputTextChanged,
            onLoadEarlier,
            onLongPress,
            onLongPressAvatar,
            onMessageLoad,
            onMessageLoadEnd,
            onMessageLoadError,
            onMessageLoadStart,
            onMessageReadyForDisplay,
            onPressActionButton,
            onPressAvatar,
            placeholder,
            renderAccessory,
            renderActions,
            renderAvatar,
            renderAvatarOnTop,
            renderBubble,
            renderChatEmpty,
            renderChatFooter,
            renderComposer,
            renderCustomView,
            renderDay,
            renderFooter,
            renderLoadEarlier,
            renderLoading,
            renderMessage,
            renderMessageAudio,
            renderMessageImage,
            renderMessageSticker,
            renderMessageText,
            renderMessageVideo,
            renderSend,
            renderSystemMessage,
            renderTime,
            renderUsernameOnMessage,
            showUserAvatar,
            stickerProps,
            timeFormat,
            user,
            videoProps,
            wrapInSafeArea,
            text: this.getTextFromProp(this.state.text),
            composerHeight: Math.max(this.props.minComposerHeight, this.state.composerHeight),
            onSend: this.onSend,
            onInputSizeChanged: this.onInputSizeChanged,
            onTextChanged: this.onInputTextChanged,
            textInputProps: {
                ...textInputProps,
                ref: (textInput) => (this.textInput = textInput),
                maxLength: this.getIsTypingDisabled() ? 0 : this.props.maxInputLength,
            },
        };
        if (this.props.renderInputToolbar) {
            return this.props.renderInputToolbar(inputToolbarProps);
        }
        // TODO type check error
        // @ts-ignore
        return <InputToolbar {...inputToolbarProps}/>;
        // return <InputToolbar {...inputToolbarProps} />
    }
    renderChatFooter() {
        if (this.props.renderChatFooter) {
            return this.props.renderChatFooter();
        }
        return null;
    }
    renderLoading() {
        if (this.props.renderLoading) {
            return this.props.renderLoading();
        }
        return null;
    }
    render() {
        const { bunnyKit: { sizeLabor, themeLabor } } = this.props;
        const styles = makeStyles(sizeLabor, themeLabor);
        if (this.state.isInitialized === true) {
            const { wrapInSafeArea } = this.props;
            const Wrapper = wrapInSafeArea ? SafeAreaView : View;
            return (<Wrapper style={styles.safeArea}>
                    <ActionSheetProvider ref={(component) => (this._actionSheetRef = component)}>
                        <View style={styles.container} onLayout={this.onMainViewLayout}>
                            {this.renderMessages()}
                            {this.renderInputToolbar()}
                        </View>
                    </ActionSheetProvider>
                </Wrapper>);
        }
        return (<View style={styles.container} onLayout={this.onInitialLayoutViewLayout}>
                {this.renderLoading()}
            </View>);
    }
}
BunnyChatInner.defaultProps = {
    messages: [],
    messagesContainerStyle: undefined,
    text: undefined,
    placeholder: DEFAULT_PLACEHOLDER,
    disableComposer: false,
    messageIdGenerator: () => v4(),
    user: undefined,
    onSend: () => {
    },
    locale: '',
    timeFormat: TIME_FORMAT,
    dateFormat: DATE_FORMAT,
    loadEarlier: false,
    onLoadEarlier: () => {
    },
    onMessageLoadStart: () => {
    },
    onMessageLoadEnd: () => {
    },
    onMessageReadyForDisplay() {
    },
    onMessageLoad() {
    },
    onMessageLoadError(e) {
    },
    isLoadingEarlier: false,
    renderLoading: undefined,
    renderLoadEarlier: undefined,
    renderAvatar: undefined,
    showUserAvatar: false,
    actionSheet: undefined,
    onPressAvatar: undefined,
    onLongPressAvatar: undefined,
    renderUsernameOnMessage: false,
    renderAvatarOnTop: false,
    renderBubble: undefined,
    renderSystemMessage: undefined,
    onLongPress: undefined,
    renderMessage: undefined,
    renderMessageText: undefined,
    renderMessageImage: undefined,
    renderMessageSticker: undefined,
    renderMessageVideo: undefined,
    renderMessageAudio: undefined,
    imageProps: {},
    stickerProps: {},
    videoProps: {},
    audioProps: {},
    lightBoxProps: {},
    textInputProps: {},
    listViewProps: {},
    renderCustomView: undefined,
    isCustomViewBottom: false,
    renderDay: undefined,
    renderTime: undefined,
    renderFooter: undefined,
    renderChatEmpty: undefined,
    renderChatFooter: undefined,
    renderInputToolbar: undefined,
    renderComposer: undefined,
    renderActions: undefined,
    renderSend: undefined,
    renderAccessory: undefined,
    isKeyboardInternallyHandled: true,
    onPressActionButton: undefined,
    bottomOffset: undefined,
    minInputToolbarHeight: 44,
    keyboardShouldPersistTaps: Platform.select({
        ios: 'never',
        android: 'always',
        default: 'never',
    }),
    onInputTextChanged: undefined,
    maxInputLength: undefined,
    forceGetKeyboardHeight: false,
    inverted: true,
    extraData: undefined,
    minComposerHeight: MIN_COMPOSER_HEIGHT,
    maxComposerHeight: MAX_COMPOSER_HEIGHT,
    wrapInSafeArea: true,
    scrollToBottom: true,
};
const makeStyles = (sizeLabor, themeLabor) => {
    const { wp } = sizeLabor.designsBasedOn.iphoneX;
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        safeArea: {
            flex: 1,
        },
    });
};
export * from './types';
const BunnyChat = withBunnyKit(BunnyChatInner);
export { BunnyChat, Actions, ChatAvatar, Bubble, SystemMessage, MessageImage, MessageSticker, MessageText, Composer, Day, InputToolbar, LoadEarlier, Message, MessageContainer, Send, Time, BunnyAvatar, utils, };
