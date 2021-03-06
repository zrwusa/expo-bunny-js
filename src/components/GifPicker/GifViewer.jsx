import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
const WINDOW_WIDTH = Dimensions.get('window').width;
const GifViewer = ({ gifUrl }) => {
    return <Image source={{ uri: gifUrl }} style={styles.gifImage}/>;
};
export default GifViewer;
const styles = StyleSheet.create({
    gifImage: {
        width: WINDOW_WIDTH - 20,
        aspectRatio: 1,
        alignSelf: 'center',
    },
});
