import React from 'react';
import {connect} from 'react-redux';
import {Button, Text, View} from '../../components/UI';
import {demoThunk} from '../../store/actions';
import {shortenTFunctionKey} from '../../providers';
import {getContainerStyles} from '../../containers';
import {getSharedStyles} from '../../helpers';
import {withBunnyKit} from '../../hooks';

const mapStateToProps = (rootState) => ({...rootState.demoThunkState});
const mapDispatchToProps = (dispatch) => ({
    demoThunk: async (data) => dispatch(demoThunk(data)),
});

class DemoThunkCCScreen extends React.Component {
    constructor(props) {
        super(props);
        this.handleThunk = this.handleThunk.bind(this);
    }

    handleThunk() {
        this.props.demoThunk({
            'text': 'text-demo',
            'id': 0
        }).then((value) => {
            console.log('hello world, got', value);
        });
    }

    render() {
        const {text, id, bunnyKit} = this.props;
        const {sizeLabor, themeLabor, t} = bunnyKit;
        const st = shortenTFunctionKey(t, 'screens.DemoThunkCC');
        const containerStyles = getContainerStyles(sizeLabor, themeLabor);
        const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
        return (<View style={[containerStyles.Screen, sharedStyles.centralized]}>
            <Text>{st(`text`)}{text}</Text>
            <Text>{st(`id`)}{id}</Text>
            <Button onPress={this.handleThunk} title={st(`thunkDispatch`)}/>
        </View>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withBunnyKit(DemoThunkCCScreen));
