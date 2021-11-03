import React from 'react';
import {useKeyboardHeight} from './useKeyboardHeight';

export function withKeyboardHeight(WrappedComponent) {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    const ComponentWithKeyboardHeight = (props) => {
        const keyboardHeight = useKeyboardHeight();
        return <WrappedComponent {...props} keyboardHeight={keyboardHeight}/>;
    };
    ComponentWithKeyboardHeight.displayName = `withKeyboardHeight(${displayName})`;
    return ComponentWithKeyboardHeight;
}
