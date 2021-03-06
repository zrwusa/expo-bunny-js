import * as React from 'react';
import { ActionSheetIOS, View } from 'react-native';
export default class ActionSheet extends React.Component {
    render() {
        return (<View pointerEvents={this.props.pointerEvents} style={{ flex: 1 }}>
                {React.Children.only(this.props.children)}
            </View>);
    }
    showActionSheetWithOptions(dataOptions, onSelect) {
        // ...dataOptions include other keys which use in android and web, thats why `Android-Only options` Crash on IOS
        const { cancelButtonIndex, destructiveButtonIndex, options, tintColor } = dataOptions;
        const iosOptions = {
            cancelButtonIndex,
            destructiveButtonIndex,
            options,
            tintColor,
            // A null title or message on iOS causes a crash
            title: dataOptions.title || undefined,
            message: dataOptions.message || undefined,
            anchor: dataOptions.anchor || undefined,
            userInterfaceStyle: dataOptions.userInterfaceStyle || undefined,
        };
        ActionSheetIOS.showActionSheetWithOptions(iosOptions, onSelect);
    }
}
