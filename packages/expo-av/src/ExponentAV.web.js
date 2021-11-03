// TODO phone webkit browsers do not support MediaRecorder
import { SyntheticPlatformEmitter } from '@unimodules/core';
import { PermissionStatus } from 'unimodules-permissions-interface';
import { RECORDING_OPTIONS_PRESET_HIGH_QUALITY } from './Audio/Recording';
/**
 * Gets the permission details. The implementation is not very good as it actually requests
 * access to the microhpone, not all browsers support the experimental permissions api
 */
async function getPermissionsAsync() {
    const resolveWithStatus = (status) => ({
        status,
        granted: status === PermissionStatus.GRANTED,
        canAskAgain: true,
        expires: 0,
    });
    try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        return resolveWithStatus(PermissionStatus.GRANTED);
    }
    catch (e) {
        return resolveWithStatus(PermissionStatus.DENIED);
    }
}
function getStatusFromMedia(media) {
    if (!media) {
        return {
            isLoaded: false,
            error: undefined,
        };
    }
    const isPlaying = (media.currentTime > 0 && !media.paused && !media.ended && media.readyState > 2);
    const status = {
        isLoaded: true,
        uri: media.src,
        progressUpdateIntervalMillis: 100,
        durationMillis: media.duration * 1000,
        positionMillis: media.currentTime * 1000,
        // playableDurationMillis: media.buffered * 1000,
        // seekMillisToleranceBefore?: number
        // seekMillisToleranceAfter?: number
        shouldPlay: media.autoplay,
        isPlaying,
        isBuffering: false,
        rate: media.playbackRate,
        // TODO: Bacon: This seems too complicated right now: https://webaudio.github.io/web-audio-api/#dom-biquadfilternode-frequency
        shouldCorrectPitch: false,
        volume: media.volume,
        isMuted: media.muted,
        isLooping: media.loop,
        didJustFinish: media.ended,
    };
    return status;
}
function setStatusForMedia(media, status) {
    if (status.positionMillis !== undefined) {
        media.currentTime = status.positionMillis / 1000;
    }
    // if (status.progressUpdateIntervalMillis !== undefined) {
    //   media.progressUpdateIntervalMillis = status.progressUpdateIntervalMillis;
    // }
    // if (status.seekMillisToleranceBefore !== undefined) {
    //   media.seekMillisToleranceBefore = status.seekMillisToleranceBefore;
    // }
    // if (status.seekMillisToleranceAfter !== undefined) {
    //   media.seekMillisToleranceAfter = status.seekMillisToleranceAfter;
    // }
    // if (status.shouldCorrectPitch !== undefined) {
    //   media.shouldCorrectPitch = status.shouldCorrectPitch;
    // }
    if (status.shouldPlay !== undefined) {
        if (status.shouldPlay) {
            media.play();
        }
        else {
            media.pause();
        }
    }
    if (status.rate !== undefined) {
        media.playbackRate = status.rate;
    }
    if (status.volume !== undefined) {
        media.volume = status.volume;
    }
    if (status.isMuted !== undefined) {
        media.muted = status.isMuted;
    }
    if (status.isLooping !== undefined) {
        media.loop = status.isLooping;
    }
    return getStatusFromMedia(media);
}
let mediaRecorder = null;
let mediaRecorderUptimeOfLastStartResume = 0;
let mediaRecorderDurationAlreadyRecorded = 0;
let mediaRecorderIsRecording = false;
function getAudioRecorderDurationMillis() {
    let duration = mediaRecorderDurationAlreadyRecorded;
    if (mediaRecorderIsRecording && mediaRecorderUptimeOfLastStartResume > 0) {
        duration += Date.now() - mediaRecorderUptimeOfLastStartResume;
    }
    return duration;
}
export default {
    get name() {
        return 'ExponentAV';
    },
    async getStatusForVideo(element) {
        return getStatusFromMedia(element);
    },
    async loadForVideo(element, nativeSource, fullInitialStatus) {
        return getStatusFromMedia(element);
    },
    async unloadForVideo(element) {
        return getStatusFromMedia(element);
    },
    async setStatusForVideo(element, status) {
        return setStatusForMedia(element, status);
    },
    async replayVideo(element, status) {
        return setStatusForMedia(element, status);
    },
    /* Audio */
    async setAudioMode() {
    },
    async setAudioIsEnabled() {
    },
    async getStatusForSound(element) {
        return getStatusFromMedia(element);
    },
    async loadForSound(nativeSource, fullInitialStatus) {
        const source = typeof nativeSource === 'string' ? nativeSource : nativeSource.uri;
        const media = new Audio(source);
        media.ontimeupdate = () => {
            SyntheticPlatformEmitter.emit('didUpdatePlaybackStatus', {
                key: media,
                status: getStatusFromMedia(media),
            });
        };
        media.onerror = () => {
            SyntheticPlatformEmitter.emit('ExponentAV.onError', {
                key: media,
                error: media.error.message,
            });
        };
        const status = setStatusForMedia(media, fullInitialStatus);
        return [media, status];
    },
    async unloadForSound(element) {
        element.pause();
        element.removeAttribute('src');
        element.load();
        return getStatusFromMedia(element);
    },
    async setStatusForSound(element, status) {
        return setStatusForMedia(element, status);
    },
    async replaySound(element, status) {
        return setStatusForMedia(element, status);
    },
    /* Recording */
    //   async setUnloadedCallbackForAndroidRecording() {},
    async getAudioRecordingStatus() {
        return {
            canRecord: mediaRecorder?.state === 'recording' || mediaRecorder?.state === 'inactive',
            isRecording: mediaRecorder?.state === 'recording',
            durationMillis: getAudioRecorderDurationMillis(),
        };
    },
    async prepareAudioRecorder(options) {
        if (typeof navigator !== 'undefined' && !navigator.mediaDevices) {
            throw new Error('No media devices available');
        }
        mediaRecorderUptimeOfLastStartResume = 0;
        mediaRecorderDurationAlreadyRecorded = 0;
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new window.MediaRecorder(stream, options?.web || RECORDING_OPTIONS_PRESET_HIGH_QUALITY.web);
        mediaRecorder.addEventListener('pause', () => {
            mediaRecorderDurationAlreadyRecorded = getAudioRecorderDurationMillis();
            mediaRecorderIsRecording = false;
        });
        mediaRecorder.addEventListener('resume', () => {
            mediaRecorderUptimeOfLastStartResume = Date.now();
            mediaRecorderIsRecording = true;
        });
        mediaRecorder.addEventListener('start', () => {
            mediaRecorderUptimeOfLastStartResume = Date.now();
            mediaRecorderDurationAlreadyRecorded = 0;
            mediaRecorderIsRecording = true;
        });
        mediaRecorder.addEventListener('stop', () => {
            mediaRecorderDurationAlreadyRecorded = getAudioRecorderDurationMillis();
            mediaRecorderIsRecording = false;
            // Clears recording icon in Chrome tab
            stream.getTracks().forEach(track => track.stop());
        });
        return { uri: null, status: await this.getAudioRecordingStatus() };
    },
    async startAudioRecording() {
        if (mediaRecorder === null) {
            throw new Error('Cannot start an audio recording without initializing a MediaRecorder. Run prepareToRecordAsync() before attempting to start an audio recording.');
        }
        if (mediaRecorder.state === 'paused') {
            mediaRecorder.resume();
        }
        else {
            mediaRecorder.start();
        }
        return this.getAudioRecordingStatus();
    },
    async pauseAudioRecording() {
        if (mediaRecorder === null) {
            throw new Error('Cannot start an audio recording without initializing a MediaRecorder. Run prepareToRecordAsync() before attempting to start an audio recording.');
        }
        // Set status to paused
        mediaRecorder.pause();
        return this.getAudioRecordingStatus();
    },
    async stopAudioRecording() {
        if (mediaRecorder === null) {
            throw new Error('Cannot start an audio recording without initializing a MediaRecorder. Run prepareToRecordAsync() before attempting to start an audio recording.');
        }
        if (mediaRecorder.state === 'inactive') {
            return { uri: null, status: await this.getAudioRecordingStatus() };
        }
        const dataPromise = new Promise(resolve => {
            return mediaRecorder.addEventListener('dataavailable', (e) => {
                resolve(e.data);
            });
        });
        mediaRecorder.stop();
        const data = await dataPromise;
        const url = URL.createObjectURL(data);
        return { uri: url, status: await this.getAudioRecordingStatus() };
    },
    async unloadAudioRecorder() {
        mediaRecorder = null;
    },
    getPermissionsAsync,
    async requestPermissionsAsync() {
        return getPermissionsAsync();
    },
};
