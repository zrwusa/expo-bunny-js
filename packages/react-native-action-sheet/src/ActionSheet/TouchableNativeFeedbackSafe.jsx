import * as React from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity, View, } from 'react-native';
// This TouchableOpacity has the same staic method of TouchableNativeFeedback
class CustomTouchableOpacity extends React.Component {
    render() {
        return <TouchableOpacity {...this.props}>{this.props.children}</TouchableOpacity>;
    }
}
CustomTouchableOpacity.SelectableBackground = () => ({});
CustomTouchableOpacity.SelectableBackgroundBorderless = () => ({});
CustomTouchableOpacity.Ripple = (color, borderless) => ({});
const TouchableComponent = Platform.select({
    web: CustomTouchableOpacity,
    default: Platform.Version <= 20 ? CustomTouchableOpacity : TouchableNativeFeedback,
});
export default class TouchableNativeFeedbackSafe extends React.Component {
    render() {
        if (TouchableComponent === TouchableNativeFeedback) {
            return (<TouchableComponent {...this.props} style={{}}>
                    <View style={this.props.style}>{this.props.children}</View>
                </TouchableComponent>);
        }
        // @ts-ignore: JSX element type 'TouchableComponent' does not have any construct or call signatures
        return <TouchableComponent {...this.props}>{this.props.children}</TouchableComponent>;
    }
}
TouchableNativeFeedbackSafe.SelectableBackground = TouchableComponent.SelectableBackground;
TouchableNativeFeedbackSafe.SelectableBackgroundBorderless = TouchableComponent.SelectableBackgroundBorderless;
TouchableNativeFeedbackSafe.Ripple = TouchableComponent.Ripple;
