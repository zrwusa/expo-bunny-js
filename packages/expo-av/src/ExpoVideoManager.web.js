import ExponentAV from './ExponentAV';
import { exitFullscreen, requestFullscreen } from './FullscreenUtils.web';
export default {
    get name() {
        return 'ExpoVideoManager';
    },
    get ScaleNone() {
        return 'none';
    },
    get ScaleToFill() {
        return 'fill';
    },
    get ScaleAspectFit() {
        return 'contain';
    },
    get ScaleAspectFill() {
        return 'cover';
    },
    async setFullscreen(element, isFullScreenEnabled) {
        if (isFullScreenEnabled) {
            await requestFullscreen(element);
        }
        else {
            await exitFullscreen(element);
        }
        return ExponentAV.getStatusForVideo(element);
    },
};
