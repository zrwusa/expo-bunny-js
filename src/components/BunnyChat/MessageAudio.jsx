import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AudioPlayer } from '../AudioPlayer';
import { withBunnyKit } from '../../hooks/bunny-kit';
const makeStyles = (sizeLabor, themeLabor) => {
    const { wp } = sizeLabor.designsBasedOn.iphoneX;
    const { theme: { colors } } = themeLabor;
    return {
        left: StyleSheet.create({
            container: {
                height: wp(46)
            },
            audio: {},
            playButton: {
                backgroundColor: colors.backgroundAA,
            },
            playButtonIcon: {
                color: colors.backgroundAAA
            },
            progress: {
                backgroundColor: colors.backgroundAB
            },
            remainTime: {
                color: colors.textAC
            }
        }),
        right: StyleSheet.create({
            container: {
                height: wp(46)
            },
            audio: {},
            playButton: {
                backgroundColor: colors.backgroundBA,
            },
            playButtonIcon: {
                color: colors.backgroundBAA
            },
            progress: {
                backgroundColor: colors.backgroundBB
            },
            remainTime: {
                color: colors.textBC
            }
        }),
    };
};
class MessageAudio extends Component {
    render() {
        const { audioContainerStyle, audioProps, audioStyle, audioProgressStyle, audioPlayButtonStyle, currentMessage, isDebug, position, audioProgressColor, audioRemainTimeStyle, audioPlayButtonIconStyle, } = this.props;
        isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', '[level4]MessageAudio props', this.props);
        const { bunnyKit: { sizeLabor, themeLabor, colors } } = this.props;
        const styles = makeStyles(sizeLabor, themeLabor);
        const stylesEnsurePosition = styles[position];
        return (<View style={[stylesEnsurePosition.container, audioContainerStyle]}>
                {currentMessage
                ? currentMessage.audio
                    ? <AudioPlayer style={[stylesEnsurePosition.audio, audioStyle]} progressStyle={[stylesEnsurePosition.progress, audioProgressStyle]} progressColor={position === 'left' ? colors.backgroundABA || audioProgressColor?.left : colors.backgroundBBA || audioProgressColor?.right} playButtonStyle={[stylesEnsurePosition.playButton, audioPlayButtonStyle]} remainTimeStyle={[stylesEnsurePosition.remainTime, audioRemainTimeStyle]} playButtonIconStyle={[stylesEnsurePosition.playButtonIcon, audioPlayButtonIconStyle]} source={{ uri: currentMessage.audio }} onLoad={() => {
                            isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageAudio onLoad');
                            this.props.onMessageLoad?.(currentMessage);
                            isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageAudio onMessageReadyForDisplay');
                            this.props.onMessageReadyForDisplay?.(currentMessage);
                        }} onLoadStart={() => {
                            isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageAudio onLoadStart');
                            this.props.onMessageLoadStart?.(currentMessage);
                        }} onLoadEnd={() => {
                            isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageAudio onLoadEnd');
                            this.props.onMessageLoadEnd?.(currentMessage);
                        }} onError={(e) => {
                            isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageAudio onError');
                            this.props.onMessageLoadError?.(e, currentMessage);
                        }} {...audioProps}/>
                    : isDebug ? <Text>{'currentMessage.audio is undefined'}</Text> : null
                : isDebug ? <Text>{'currentMessage is undefined'}</Text> : null}

            </View>);
    }
}
MessageAudio.defaultProps = {
    position: 'left',
    currentMessage: undefined,
    audioContainerStyle: {},
    audioStyle: {},
    audioProgressStyle: {},
    audioProgressColor: undefined,
    audioPlayButtonStyle: {},
    audioPlayButtonIconStyle: {},
    audioProps: {},
    onMessageLoad: undefined,
    onMessageLoadStart: undefined,
    onMessageLoadEnd: undefined,
    onMessageReadyForDisplay: undefined,
    onMessageLoadError: undefined,
    isDebug: false,
};
export default withBunnyKit(MessageAudio);
