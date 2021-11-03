import React, { Children, cloneElement, Component, createRef } from 'react';
import { Animated, TouchableHighlight, View } from 'react-native';
import { LightBoxOverlay } from "./LightBoxOverlay";
export default class LightBox extends Component {
    constructor() {
        super(...arguments);
        this._root = createRef();
        this.state = {
            isOpen: false,
            origin: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            },
            layoutOpacity: new Animated.Value(1),
        };
        this.getContent = () => {
            if (this.props.renderContent) {
                return this.props.renderContent();
            }
            else if (this.props.activeProps) {
                return cloneElement(
                // @ts-ignore
                Children.only(this.props.children), this.props.activeProps);
            }
            return this.props.children;
        };
        this.getOverlayProps = () => ({
            isOpen: this.state.isOpen,
            origin: this.state.origin,
            renderHeader: this.props.renderHeader,
            swipeToDismiss: this.props.swipeToDismiss,
            springConfig: this.props.springConfig,
            backgroundColor: this.props.backgroundColor,
            children: this.getContent(),
            didOpen: this.props.didOpen,
            willClose: this.props.willClose,
            onClose: this.onClose,
        });
        this.open = () => {
            this._root.current?.measure((ox, oy, width, height, px, py) => {
                this.props.onOpen && this.props.onOpen();
                this.setState({
                    isOpen: (!!this.props.navigator),
                    isAnimating: true,
                    origin: {
                        width,
                        height,
                        x: px,
                        y: py,
                    },
                }, () => {
                    this.props.didOpen?.();
                    if (this.props.navigator) {
                        const route = {
                            component: LightBoxOverlay,
                            passProps: this.getOverlayProps(),
                        };
                        const routes = this.props.navigator.getCurrentRoutes();
                        routes.push(route);
                        this.props.navigator.immediatelyResetRouteStack(routes);
                    }
                    else {
                        this.setState({
                            isOpen: true,
                        });
                    }
                    setTimeout(() => {
                        this._root && this.state.layoutOpacity.setValue(0);
                    });
                });
            });
        };
        this.close = () => {
            throw new Error('LightBox.close method is deprecated. Use renderHeader(close) prop instead.');
        };
        this.onClose = () => {
            this.state.layoutOpacity.setValue(1);
            this.setState({
                isOpen: false,
            }, this.props.onClose);
            if (this.props.navigator) {
                const routes = this.props.navigator.getCurrentRoutes();
                routes.pop();
                this.props.navigator.immediatelyResetRouteStack(routes);
            }
        };
    }
    render() {
        // measure will not return anything useful if we dont attach a onLayout handler on android
        return (<View ref={this._root} style={this.props.style} onLayout={() => {
            }}>
                <Animated.View style={{ opacity: this.state.layoutOpacity }}>
                    <TouchableHighlight underlayColor={this.props.underlayColor} onPress={this.open} onLongPress={this.props.onLongPress}>
                        {this.props.children}
                    </TouchableHighlight>
                </Animated.View>
                {this.props.navigator ? false : <LightBoxOverlay {...this.getOverlayProps()}/>}
            </View>);
    }
}
LightBox.defaultProps = {
    swipeToDismiss: true,
    onOpen: () => {
    },
    didOpen: () => {
    },
    willClose: () => {
    },
    onClose: () => {
    },
    onLongPress: () => {
    },
};
