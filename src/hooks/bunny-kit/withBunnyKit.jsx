import React from 'react';
import { useBunnyKit } from './useBunnyKit';
export const withBunnyKit = (Component) => {
    // Try to create a nice displayName for React Dev Tools.
    const displayName = Component.displayName || Component.name || 'Component';
    // TODO not very well for supporting generic components
    const GenericComponent = Component;
    // Creating the inner component. The calculated Props type here is the where the magic happens.
    const ComponentWithBunnyKit = function (props) {
        // Fetch the props you want to inject. This could be done with context instead.
        const bunnyKit = useBunnyKit();
        // props comes afterwards so the can override the default ones.
        // TODO HOC support generic component
        return <GenericComponent {...props} bunnyKit={bunnyKit}/>;
    };
    ComponentWithBunnyKit.displayName = `withBunnyKit(${displayName})`;
    return ComponentWithBunnyKit;
};
