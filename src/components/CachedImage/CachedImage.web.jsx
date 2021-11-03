import * as React from 'react';
import {Image} from 'react-native';

export const CachedImage = ({source, ...rest}) => {
    return <Image source={source} {...rest}/>;
};
