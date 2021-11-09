import React from 'react';
import { Image } from 'react-native';
import { makeStyles } from './styles';
import { ImageUploader } from '../ImageUploader';
import { useBunnyKit } from '../../hooks/bunny-kit';
export function Avatar(props) {
    const { sizeLabor, themeLabor, wp } = useBunnyKit();
    const styles = makeStyles(sizeLabor, themeLabor);
    const { size, source, style, shouldUpload = false, uploaderProps, isBorder = true } = props;
    const finalSize = size || 'm';
    const sizeAvatarMap = {
        xxs: wp(16),
        xs: wp(20),
        s: wp(26),
        m: wp(32),
        l: wp(40),
        xl: wp(56),
        xxl: wp(78)
    };
    const borderDiff = isBorder ? wp(2) : 0;
    const borderWidth = isBorder ? wp(1) : 0;
    return shouldUpload
        ?
            <ImageUploader style={[styles.Avatar, {
                        borderWidth,
                        width: sizeAvatarMap[finalSize],
                        height: sizeAvatarMap[finalSize],
                        borderRadius: sizeAvatarMap[finalSize] / 2,
                    }]} imageStyle={[{
                        width: sizeAvatarMap[finalSize] - borderDiff,
                        height: sizeAvatarMap[finalSize] - borderDiff,
                        borderRadius: sizeAvatarMap[finalSize] / 2,
                    }, style]} width={sizeAvatarMap[finalSize] - borderDiff} height={sizeAvatarMap[finalSize] - borderDiff} source={source} {...uploaderProps}/>
        : <Image style={[styles.Avatar, {
                    borderWidth,
                    width: sizeAvatarMap[finalSize],
                    height: sizeAvatarMap[finalSize],
                    borderRadius: sizeAvatarMap[finalSize] / 2,
                }, style]} width={sizeAvatarMap[finalSize]} height={sizeAvatarMap[finalSize]} source={source}/>;
}
