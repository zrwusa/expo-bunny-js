import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';
import { TIME_FORMAT } from './Constant';
import { withBunnyKit } from '../../hooks/bunny-kit';
const makeStyles = (sizeLabor, themeLabor) => {
    const { wp } = sizeLabor.designsBasedOn.iphoneX;
    const { theme: { colors } } = themeLabor;
    const containerStyle = {
        marginLeft: wp(10),
        marginRight: wp(10),
        marginBottom: wp(5),
    };
    const textStyle = {
        fontSize: wp(10),
        backgroundColor: 'transparent',
        textAlign: 'right',
    };
    return {
        left: StyleSheet.create({
            container: {
                ...containerStyle,
            },
            text: {
                color: colors.text3,
                ...textStyle,
            },
        }),
        right: StyleSheet.create({
            container: {
                ...containerStyle,
            },
            text: {
                color: colors.textB,
                ...textStyle,
            },
        }),
    };
};
class Time extends Component {
    render() {
        const { position, timeContainerStyle, currentMessage, timeFormat, timeTextStyle, bunnyKit } = this.props;
        const { language } = bunnyKit;
        if (!!currentMessage) {
            const { bunnyKit: { sizeLabor, themeLabor } } = this.props;
            const styles = makeStyles(sizeLabor, themeLabor);
            return (<View style={[
                    styles[position].container,
                    timeContainerStyle && timeContainerStyle[position],
                ]}>
                    <Text style={[
                    styles[position].text,
                    timeTextStyle && timeTextStyle[position],
                ]}>
                        {dayjs(currentMessage.createdAt)
                    .locale(language)
                    .format(timeFormat)}
                    </Text>
                </View>);
        }
        return null;
    }
}
Time.defaultProps = {
    position: 'left',
    currentMessage: undefined,
    timeContainerStyle: {},
    timeFormat: TIME_FORMAT,
    timeTextStyle: {},
};
export default withBunnyKit(Time);
