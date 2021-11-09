import { useSizeLabor } from './useSizeLabor';
import React from 'react';
export const withSizeLabor = (WrappedComponent) => {
    // Try to create a nice displayName for React Dev Tools.
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    // Creating the inner component. The calculated Props type here is the where the magic happens.
    const ComponentWithSizeLabor = (props) => {
        // Fetch the props you want to inject. This could be done with context instead.
        const sizeLabor = useSizeLabor();
        // props comes afterwards so the can override the default ones.
        return <WrappedComponent {...props} sizeLabor={sizeLabor}/>;
    };
    ComponentWithSizeLabor.displayName = `withSizeLabor(${displayName})`;
    return ComponentWithSizeLabor;
};
