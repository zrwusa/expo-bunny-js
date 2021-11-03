import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import dayjs from 'dayjs';
import { isSameDay } from './utils';
import { DATE_FORMAT } from './Constant';
import { withBunnyKit } from '../../hooks/bunny-kit';
const getStyles = (sizeLabor, themeLabor) => {
    const { wp } = sizeLabor.designsBasedOn.iphoneX;
    const { theme: { colors } } = themeLabor;
    return StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: wp(5),
            marginBottom: wp(10),
        },
        text: {
            backgroundColor: colors.transparent,
            color: colors.text3,
            fontSize: wp(12),
            fontWeight: '600',
        },
    });
};
class Day extends PureComponent {
    render() {
        const { dateFormat, currentMessage, previousMessage, dayContainerStyle, dayWrapperStyle, dayTextStyle, dayTextProps, bunnyKit, } = this.props;
        const { language } = bunnyKit;
        if (currentMessage && !isSameDay(currentMessage, previousMessage)) {
            const { createdAt } = currentMessage;
            const { sizeLabor, themeLabor } = bunnyKit;
            const styles = getStyles(sizeLabor, themeLabor);
            return (<View style={[styles.container, dayContainerStyle]}>
                    <View style={dayWrapperStyle}>
                        <Text style={[styles.text, dayTextStyle]} {...dayTextProps}>
                            {dayjs(createdAt)
                    .locale(language)
                    .format(dateFormat)}
                        </Text>
                    </View>
                </View>);
        }
        return null;
    }
}
Day.defaultProps = {
    currentMessage: undefined,
    previousMessage: undefined,
    nextMessage: undefined,
    dayContainerStyle: {},
    dayWrapperStyle: {},
    dayTextStyle: {},
    dayTextProps: {},
    dateFormat: DATE_FORMAT,
};
export default withBunnyKit(Day);
