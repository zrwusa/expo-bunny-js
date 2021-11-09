import React from 'react';
import { Animated, View } from 'react-native';
import { makeStyles } from './styles';
import config from '../../config';
import { withBunnyKit } from '../../hooks/bunny-kit';
class ImageProgressive extends React.Component {
    constructor() {
        super(...arguments);
        this.thumbnailAnimated = new Animated.Value(0);
        this.imageAnimated = new Animated.Value(0);
        this.handleThumbnailLoad = () => {
            Animated.timing(this.thumbnailAnimated, {
                useNativeDriver: config.useNativeDriver,
                toValue: 1,
            }).start();
        };
        this.onImageLoad = () => {
            Animated.timing(this.imageAnimated, {
                useNativeDriver: config.useNativeDriver,
                toValue: 1,
            }).start();
        };
    }
    render() {
        const { previewSource, source, style, bunnyKit, ...rest } = this.props;
        const { sizeLabor, themeLabor } = bunnyKit;
        const styles = makeStyles(sizeLabor, themeLabor);
        return (<View style={styles.ImageProgressive.container}>
                <Animated.Image {...rest} source={previewSource} style={[style, { opacity: this.thumbnailAnimated }]} onLoad={this.handleThumbnailLoad} blurRadius={1}/>
                <Animated.Image {...rest} source={source} style={[styles.ImageProgressive.imageOverlay, { opacity: this.imageAnimated }, style]} onLoad={this.onImageLoad}/>
            </View>);
    }
}
export default withBunnyKit(ImageProgressive);
