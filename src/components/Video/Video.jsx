import * as React from 'react';
import { createRef } from 'react';
import { Video } from '../../../packages/expo-av/src';
import { Button, Text, View } from '../UI';
import { makeStyles } from './styles';
import { withBunnyKit } from '../../hooks/bunny-kit';
class ShowVideoInner extends React.PureComponent {
    constructor(props) {
        super(props);
        this.video = createRef();
        this._isMounted = false;
        this.state = {
            isPlaying: false,
            playbackStatus: undefined,
        };
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        const { isPlaying, playbackStatus } = this.state;
        const { bunnyKit, onPlaybackStatusUpdate, shouldShowButton, shouldShowStatus, ...rest } = this.props;
        const { sizeLabor, themeLabor } = bunnyKit;
        const styles = makeStyles(sizeLabor, themeLabor);
        return (<View>
                <Video ref={this.video} style={styles.video} useNativeControls resizeMode="contain" isLooping onPlaybackStatusUpdate={playbackStatus => {
                if (!this._isMounted) {
                    return;
                }
                if (!playbackStatus.isLoaded) {
                    // Update your UI for the unloaded state
                    if (playbackStatus.error) {
                        console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
                        // Send Expo team the error on Slack or the forums so we can help you debug!
                    }
                }
                else {
                    // Update your UI for the loaded state
                    if (playbackStatus.isPlaying) {
                        // Update your UI for the playing state
                    }
                    else {
                        // Update your UI for the paused state
                    }
                    // todo Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
                    // this.setState({isPlaying: playbackStatus.isPlaying})
                    if (playbackStatus.isBuffering) {
                        // Update your UI for the buffering state
                    }
                    if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
                        // The player has just finished playing and will stop. Maybe you want to play something else?
                    }
                }
                // todo Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
                // this.setState({playbackStatus: playbackStatus})
            }} {...rest}/>
                {shouldShowButton
                ? <View style={styles.buttons}>
                        <Button title={isPlaying ? 'Pause' : 'Play'} onPress={() => {
                        if (this.video.current) {
                            return isPlaying ? this.video.current.pauseAsync() : this.video.current.playAsync();
                        }
                    }}/>
                    </View>
                : null}

                {shouldShowStatus
                ? <Text>{JSON.stringify(playbackStatus)}</Text>
                : null}
            </View>);
    }
}
export const ShowVideo = withBunnyKit(ShowVideoInner);
