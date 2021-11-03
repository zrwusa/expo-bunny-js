import * as React from 'react';
import {Image as RNImage} from 'react-native';
import imageCacheManager from './CacheManager';

export class CachedImage extends React.Component {
    constructor(props) {
        super(props);
        this.mounted = false;
        this.state = {
            sourceState: {uri: ''}
        };
    }

    async componentDidMount() {
        this.mounted = true;
        await this.load();
    }

    async componentDidUpdate(prevProps, prevState) {
        const {source: newSource} = this.props;
        if (newSource.uri !== prevProps.source.uri) {
            await this.load();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    async load() {
        const {source, onError} = this.props;
        if (source?.uri) {
            try {
                const cacheLabor = imageCacheManager.getCacheLabor(source.uri);
                cacheLabor.register((path) => {
                    if (this.mounted) {
                        if (path) {
                            this.setState({sourceState: {uri: path}});
                        }
                    }
                }, (progress) => {
                });
            } catch (error) {
                onError?.(error);
            }
        }
    }

    render() {
        const {source, ...rest} = this.props;
        const {sourceState} = this.state;
        const isImageReady = sourceState && sourceState?.uri;
        return isImageReady
            ? <RNImage source={sourceState} {...rest}/>
            : null;
    }
}

CachedImage.defaultProps = {};
