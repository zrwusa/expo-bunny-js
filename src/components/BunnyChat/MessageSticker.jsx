import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { withBunnyKit } from '../../hooks/bunny-kit';
const getStyles = (sizeLabor, themeLabor) => {
    const { wp } = sizeLabor.designsBasedOn.iphoneX;
    return StyleSheet.create({
        container: {},
        sticker: {
            width: wp(120),
            height: wp(120),
            borderRadius: wp(13),
            margin: wp(3),
            resizeMode: 'cover',
        }
    });
};
class MessageSticker extends Component {
    render() {
        const { stickerContainerStyle, stickerProps, stickerStyle, currentMessage, isDebug, } = this.props;
        isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', '[level4]MessageSticker props', this.props);
        const { bunnyKit: { sizeLabor, themeLabor } } = this.props;
        const styles = getStyles(sizeLabor, themeLabor);
        return (<View style={[styles.container, stickerContainerStyle]}>
                {currentMessage
                ? currentMessage.sticker
                    ? <Image style={[styles.sticker, stickerStyle]} onLoad={() => {
                            isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageSticker onLoad');
                            this.props.onMessageLoad?.(currentMessage);
                            isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageSticker onMessageReadyForDisplay');
                            this.props.onMessageReadyForDisplay?.(currentMessage);
                        }} onLoadStart={() => {
                            isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageSticker onLoadStart');
                            this.props.onMessageLoadStart?.(currentMessage);
                        }} onLoadEnd={() => {
                            isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageSticker onLoadEnd');
                            this.props.onMessageLoadEnd?.(currentMessage);
                        }} onError={(e) => {
                            isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageSticker onError');
                            this.props.onMessageLoadError?.(e.nativeEvent.error, currentMessage);
                        }} source={{ uri: currentMessage.sticker }} {...stickerProps}/>
                    : <Text>{'currentMessage.sticker is undefined'}</Text>
                : <Text>{'currentMessage is undefined'}</Text>}

            </View>);
    }
}
MessageSticker.defaultProps = {
    currentMessage: undefined,
    stickerContainerStyle: {},
    stickerStyle: {},
    stickerProps: {},
    onMessageLoad: undefined,
    onMessageLoadStart: undefined,
    onMessageLoadEnd: undefined,
    onMessageReadyForDisplay: undefined,
    onMessageLoadError: undefined,
    isDebug: false,
};
export default withBunnyKit(MessageSticker);
