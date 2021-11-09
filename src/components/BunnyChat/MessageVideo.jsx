import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Video } from '../../../packages/expo-av/src';
import { withBunnyKit } from '../../hooks/bunny-kit';
const makeStyles = (sizeLabor, themeLabor) => {
    const { wp } = sizeLabor.designsBasedOn.iphoneX;
    return StyleSheet.create({
        container: {},
        video: {
            width: wp(240),
            height: wp(160),
            borderRadius: wp(13),
            margin: wp(3),
            resizeMode: 'cover',
        }
    });
};
class MessageVideo extends Component {
    render() {
        const { videoContainerStyle, videoProps, videoStyle, currentMessage, isDebug, } = this.props;
        isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', '[level4]MessageVideo props', this.props);
        const { bunnyKit: { sizeLabor, themeLabor } } = this.props;
        const styles = makeStyles(sizeLabor, themeLabor);
        return (<View style={[styles.container, videoContainerStyle]}>
                {currentMessage ?
                currentMessage.video
                    ? <Video style={[styles.video, videoStyle]} useNativeControls resizeMode="contain" source={{ uri: currentMessage.video }} onLoad={() => {
                            isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageVideo onLoad');
                            this.props.onMessageLoad?.(currentMessage);
                        }} onLoadStart={() => {
                            isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageVideo onLoadStart');
                            this.props.onMessageLoadStart?.(currentMessage);
                        }} onReadyForDisplay={() => {
                            isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageVideo onReadyForDisplay');
                            this.props.onMessageLoadEnd?.(currentMessage);
                            isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageVideo onMessageReadyForDisplay');
                            this.props.onMessageReadyForDisplay?.(currentMessage);
                        }} onError={(e) => {
                            isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageVideo onError', e);
                            this.props.onMessageLoadError?.(new Error(e), currentMessage);
                        }} {...videoProps}/>
                    : <Text>{'currentMessage.video is undefined'}</Text>
                : <Text>{'currentMessage is undefined'}</Text>}

            </View>);
    }
}
MessageVideo.defaultProps = {
    currentMessage: undefined,
    videoContainerStyle: {},
    videoStyle: {},
    videoProps: {},
    onMessageLoad: undefined,
    onMessageLoadStart: undefined,
    onMessageLoadEnd: undefined,
    onMessageReadyForDisplay: undefined,
    onMessageLoadError: undefined,
    isDebug: false,
};
export default withBunnyKit(MessageVideo);
