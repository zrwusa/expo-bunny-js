import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { makeStyles } from './styles';
import { IcoMoon, Text } from '../UI';
import { Audio } from '../../../packages/expo-av/src';
import { ProgressBar } from 'react-native-paper';
import { minuted } from '../../utils';
import { useBunnyKit } from '../../hooks/bunny-kit';
export function AudioPlayer(props) {
    const { sizeLabor, themeLabor, colors } = useBunnyKit();
    const styles = makeStyles(sizeLabor, themeLabor);
    const { source, style, onLoad, onLoadStart, onLoadEnd, onError, isDebug = false, progressStyle, progressColor, playButtonStyle, remainTimeStyle, playButtonIconStyle } = props;
    const soundRef = useRef();
    const [status, setStatus] = useState({ isLoaded: false });
    const [error, setError] = useState('');
    useEffect(() => {
        (async () => {
            try {
                if (!source) {
                    return;
                }
                onLoadStart?.();
                const { sound } = await Audio.Sound.createAsync(source);
                if (status?.isLoaded) {
                    onLoad?.();
                }
                // todo on web platform status.durationMillis is NaN
                soundRef.current = sound;
                soundRef.current.setOnPlaybackStatusUpdate(setStatus);
                onLoadEnd?.();
            }
            catch (e) {
                isDebug && console.log(e.toString());
                setError(e.toString());
                onError?.(e);
                onLoadEnd?.();
            }
        })();
        return () => {
            (async () => {
                const curSoundRef = soundRef.current;
                if (curSoundRef) {
                    curSoundRef.setOnPlaybackStatusUpdate(null);
                    // await curSoundRef.stopAsync();
                    await curSoundRef.unloadAsync();
                }
            })();
        };
    }, []);
    async function togglePlayOrPause() {
        if (!soundRef.current) {
            return;
        }
        if (status && status.isLoaded) {
            const curSoundRef = soundRef.current;
            if (curSoundRef) {
                if (status.isPlaying) {
                    await curSoundRef.pauseAsync();
                }
                else {
                    if (status.positionMillis === status.durationMillis) {
                        await curSoundRef.replayAsync();
                    }
                    else {
                        await curSoundRef.playAsync();
                    }
                }
            }
        }
    }
    return <View style={[styles.container, style]}>
        {isDebug
            ? <>
                <Text>error:{error}</Text>
                <Text>status:{JSON.stringify(status)}</Text>
            </>
            : null}
        {<TouchableOpacity onPress={async () => {
                await togglePlayOrPause();
            }}>
                <View style={styles.control}>
                    <View style={[styles.playButton, playButtonStyle]}>
                        {status?.isLoaded
                ?
                    status.isPlaying
                        ? <IcoMoon style={[styles.playButtonIcon, playButtonIconStyle]} name="pause"/>
                        : <IcoMoon style={[styles.playButtonIcon, playButtonIconStyle]} name="play"/>
                : <ActivityIndicator />}
                    </View>
                    <View style={styles.progress}>
                        {status?.isLoaded
                ?
                    status.durationMillis
                        ? <>
                                        <ProgressBar style={progressStyle} color={progressColor} progress={(status.positionMillis | 0) / status.durationMillis}/>
                                        <Text style={[styles.remainTime, remainTimeStyle]}>
                                            {minuted(status.durationMillis - status.positionMillis)}</Text>
                                    </>
                        : <>
                                        <ProgressBar progress={0} color={progressColor} style={progressStyle}/>
                                        <Text style={[styles.remainTime, remainTimeStyle]}> </Text>
                                    </>
                : <ActivityIndicator color={progressColor}/>}

                    </View>
                </View>
            </TouchableOpacity>}
    </View>;
}
