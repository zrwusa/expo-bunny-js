import * as React from 'react';
const context = React.createContext({
    showActionSheetWithOptions: (options, callback) => {
    },
});
export function useActionSheet() {
    return React.useContext(context);
}
const { Provider, Consumer } = context;
export { Provider, Consumer };
