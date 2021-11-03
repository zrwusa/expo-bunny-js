import React from 'react';
import {useAuthLabor} from './useAuthLabor';

export function withAuthLabor(WrappedComponent) {
    // Try to create a nice displayName for React Dev Tools.
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    // Creating the inner component. The calculated Props type here is the where the magic happens.
    const ComponentWithAuthLabor = (props) => {
        // Fetch the props you want to inject. This could be done with context instead.
        const authLabor = useAuthLabor();
        // props comes afterwards so the can override the default ones.
        return <WrappedComponent {...props} authLabor={authLabor}/>;
    };
    ComponentWithAuthLabor.displayName = `withAuthLabor(${displayName})`;
    return ComponentWithAuthLabor;
}
