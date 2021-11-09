import React from 'react';
import { useKeyboardHeight } from './useKeyboardHeight';
export const withKeyboardHeight = (WrappedComponent) => {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    const ComponentWithKeyboardHeight = (props) => {
        const keyboardHeight = useKeyboardHeight();
        return <WrappedComponent {...props} keyboardHeight={keyboardHeight}/>;
    };
    ComponentWithKeyboardHeight.displayName = `withKeyboardHeight(${displayName})`;
    return ComponentWithKeyboardHeight;
};
export default withKeyboardHeight;
