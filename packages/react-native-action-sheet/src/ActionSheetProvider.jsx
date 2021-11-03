import * as React from 'react';
import ActionSheet from './ActionSheet';
import { Provider } from './context';
export default class ActionSheetProvider extends React.Component {
    constructor(props) {
        super(props);
        this.getContext = () => {
            return {
                showActionSheetWithOptions: (options, callback) => {
                    this._actionSheetRef.current !== null &&
                        this._actionSheetRef.current.showActionSheetWithOptions(options, callback);
                },
            };
        };
        this._actionSheetRef = React.createRef();
    }
    render() {
        return (<Provider value={this.getContext()}>
                <ActionSheet ref={this._actionSheetRef} useNativeDriver={this.props.useNativeDriver}>
                    {React.Children.only(this.props.children)}
                </ActionSheet>
            </Provider>);
    }
}
