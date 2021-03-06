import { Dimensions, PixelRatio } from 'react-native';
const percentageToDP = (type, percentage, shouldRound) => {
    let _shouldRound = shouldRound;
    if (typeof shouldRound === 'undefined') {
        _shouldRound = true;
    }
    let screenWidthOrHeight;
    const { width, height } = Dimensions.get('window');
    switch (type) {
        case 'W':
            screenWidthOrHeight = width;
            break;
        case 'H':
            screenWidthOrHeight = height;
            break;
        default:
            screenWidthOrHeight = width;
            break;
    }
    // Parse string percentage input and convert it to number.
    const elemWidthOrHeight = typeof percentage === 'number' ? percentage : parseFloat(percentage);
    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.
    const value = screenWidthOrHeight * elemWidthOrHeight;
    if (_shouldRound === true) {
        return PixelRatio.roundToNearestPixel(value);
    }
    return value;
};
export const widthPercentageToDP = (widthPercent, shouldRound) => {
    return percentageToDP('W', widthPercent, shouldRound);
};
export const heightPercentageToDP = (heightPercent, shouldRound) => {
    return percentageToDP('H', heightPercent, shouldRound);
};
