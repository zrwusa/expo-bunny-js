import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { warning } from './utils';
import { withBunnyKit } from '../../hooks/bunny-kit';
const getStyles = (sizeLabor, themeLabor) => {
    const { wp } = sizeLabor.designsBasedOn.iphoneX;
    const { theme: { colors } } = themeLabor;
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            maxWidth: wp(300),
        },
        quickReply: {
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: wp(1),
            maxWidth: wp(200),
            paddingVertical: wp(7),
            paddingHorizontal: wp(12),
            minHeight: wp(50),
            borderRadius: wp(13),
            margin: wp(3),
        },
        quickReplyText: {
            overflow: 'visible',
        },
        sendLink: {
            borderWidth: 0,
        },
        sendLinkText: {
            color: colors.accent,
            fontWeight: '600',
            fontSize: wp(17),
        },
    });
};
const sameReply = (currentReply) => (reply) => currentReply.value === reply.value;
const diffReply = (currentReply) => (reply) => currentReply.value !== reply.value;
class QuickReplies extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            replies: [],
        };
        this.handlePress = (reply) => () => {
            const { currentMessage } = this.props;
            const { replies } = this.state;
            if (currentMessage) {
                const { type } = currentMessage.quickReplies;
                switch (type) {
                    case 'radio': {
                        this.handleSend([reply])();
                        return;
                    }
                    case 'checkbox': {
                        if (replies.find(sameReply(reply))) {
                            this.setState({
                                replies: this.state.replies.filter(diffReply(reply)),
                            });
                        }
                        else {
                            this.setState({ replies: [...this.state.replies, reply] });
                        }
                        return;
                    }
                    default: {
                        warning(`onQuickReply unknown type: ${type}`);
                        return;
                    }
                }
            }
        };
        this.handleSend = (replies) => () => {
            const { currentMessage } = this.props;
            if (this.props.onQuickReply) {
                this.props.onQuickReply(replies.map((reply) => ({
                    ...reply,
                    messageId: currentMessage._id,
                })));
            }
        };
        this.shouldComponentDisplay = () => {
            const { currentMessage, nextMessage } = this.props;
            const hasReplies = !!currentMessage && !!currentMessage.quickReplies;
            const hasNext = !!nextMessage && !!nextMessage._id;
            const keepIt = currentMessage.quickReplies.keepIt;
            if (hasReplies && !hasNext) {
                return true;
            }
            if (hasReplies && hasNext && keepIt) {
                return true;
            }
            return false;
        };
        this.renderQuickReplySend = () => {
            const { replies } = this.state;
            const { sendText, renderQuickReplySend: customSend } = this.props;
            const { bunnyKit: { sizeLabor, themeLabor } } = this.props;
            const styles = getStyles(sizeLabor, themeLabor);
            return (<TouchableOpacity style={[styles.quickReply, styles.sendLink]} onPress={this.handleSend(replies)}>
                {customSend ? (customSend()) : (<Text style={styles.sendLinkText}>{sendText}</Text>)}
            </TouchableOpacity>);
        };
    }
    render() {
        const { currentMessage, quickRepliesColor, quickReplyStyle } = this.props;
        const { replies } = this.state;
        if (!this.shouldComponentDisplay()) {
            return null;
        }
        const { type } = currentMessage.quickReplies;
        const { bunnyKit: { sizeLabor, themeLabor, colors } } = this.props;
        const styles = getStyles(sizeLabor, themeLabor);
        return (<View style={styles.container}>
                {currentMessage.quickReplies.values.map((reply, index) => {
                const selected = type === 'checkbox' && replies.find(sameReply(reply));
                return (<TouchableOpacity onPress={this.handlePress(reply)} style={[
                        styles.quickReply,
                        quickReplyStyle,
                        { borderColor: quickRepliesColor },
                        selected && { backgroundColor: quickRepliesColor },
                    ]} key={`${reply.value}-${index}`}>
                                <Text numberOfLines={10} ellipsizeMode={'tail'} style={[
                        styles.quickReplyText,
                        { color: selected ? colors.text : quickRepliesColor },
                    ]}>
                                    {reply.title}
                                </Text>
                            </TouchableOpacity>);
            })}
                {replies.length > 0 && this.renderQuickReplySend()}
            </View>);
    }
}
QuickReplies.defaultProps = {
    currentMessage: undefined,
    nextMessage: undefined,
    onQuickReply: () => {
    },
    quickRepliesColor: '#3498db',
    sendText: 'Send',
    keepReplies: false,
    renderQuickReplySend: undefined,
    quickReplyStyle: undefined,
};
export default withBunnyKit(QuickReplies);
