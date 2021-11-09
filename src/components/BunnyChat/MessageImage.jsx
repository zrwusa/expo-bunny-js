import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, } from 'react-native';
import LightBox from '../../../packages/react-native-lightbox';
import { withBunnyKit } from '../../hooks/bunny-kit';
const makeStyles = (sizeLabor, themeLabor) => {
    const { wp } = sizeLabor.designsBasedOn.iphoneX;
    return StyleSheet.create({
        container: {},
        image: {
            width: wp(150),
            height: wp(100),
            borderRadius: wp(13),
            margin: wp(3),
            resizeMode: 'cover',
        },
        imageActive: {
            flex: 1,
            resizeMode: 'contain',
        },
    });
};
class MessageImage extends Component {
    render() {
        const { imageContainerStyle, lightBoxProps, imageProps, imageStyle, currentMessage, isDebug, messages, } = this.props;
        isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', '[level4]MessageImage props', this.props);
        const { bunnyKit: { sizeLabor, themeLabor } } = this.props;
        const styles = makeStyles(sizeLabor, themeLabor);
        return (<View style={[styles.container, imageContainerStyle]}>
                <LightBox activeProps={{
                style: styles.imageActive,
            }} {...lightBoxProps}>
                    {currentMessage
                ? currentMessage.image
                    ? <Image style={[styles.image, imageStyle]} onLoad={() => {
                            isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageImage onLoad');
                            this.props.onMessageLoad?.(currentMessage);
                            isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageImage onMessageReadyForDisplay');
                            this.props.onMessageReadyForDisplay?.(currentMessage);
                        }} onLoadStart={() => {
                            isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageImage onLoadStart');
                            this.props.onMessageLoadStart?.(currentMessage);
                        }} onLoadEnd={() => {
                            isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageImage onLoadEnd');
                            this.props.onMessageLoadEnd?.(currentMessage);
                        }} onError={(e) => {
                            isDebug && console.log('%c[ chat ]', 'background: #555; color: #bada55', 'MessageImage onError');
                            this.props.onMessageLoadError?.(e.nativeEvent.error, currentMessage);
                        }} source={{ uri: currentMessage.image }} {...imageProps}/>
                    : <Text>{'currentMessage.image is undefined'}</Text>
                : <Text>{'currentMessage is undefined'}</Text>}
                </LightBox>
            </View>);
    }
}
MessageImage.defaultProps = {
    messages: [],
    currentMessage: undefined,
    imageContainerStyle: {},
    imageStyle: {},
    imageProps: {},
    lightBoxProps: {},
    onMessageLoad: undefined,
    onMessageLoadStart: undefined,
    onMessageLoadEnd: undefined,
    onMessageReadyForDisplay: undefined,
    onMessageLoadError: undefined,
    isDebug: false
};
export default withBunnyKit(MessageImage);
