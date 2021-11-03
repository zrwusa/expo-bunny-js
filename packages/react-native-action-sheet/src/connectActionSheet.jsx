import * as React from 'react';
import { Consumer } from './context';
import hoistNonReactStatic from 'hoist-non-react-statics';
export default function connectActionSheet(WrappedComponent) {
    const ConnectedActionSheet = (props) => {
        return (<Consumer>
                {({ showActionSheetWithOptions }) => {
                return (<WrappedComponent {...props} showActionSheetWithOptions={showActionSheetWithOptions}/>);
            }}
            </Consumer>);
    };
    return hoistNonReactStatic(ConnectedActionSheet, WrappedComponent);
}
