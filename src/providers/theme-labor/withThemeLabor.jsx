import {useThemeLabor} from './useThemeLabor';
import React from 'react';

export function withThemeLabor(WrappedComponent) {
    // Try to create a nice displayName for React Dev Tools.
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    // Creating the inner component. The calculated Props type here is the where the magic happens.
    const ComponentWithThemeLabor = (props) => {
        // Fetch the props you want to inject. This could be done with context instead.
        const themeLabor = useThemeLabor();
        // props comes afterwards so the can override the default ones.
        return <WrappedComponent {...props} themeLabor={themeLabor}/>;
    };
    ComponentWithThemeLabor.displayName = `withThemeLabor(${displayName})`;
    return ComponentWithThemeLabor;
}
