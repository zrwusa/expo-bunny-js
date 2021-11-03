import React, { PureComponent } from 'react';
import { ButtonTO, InButtonText, Text, View } from '../UI';
import { withSizeLabor } from '../../providers/size-labor';
class DemoCCClock extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
            intervalID: setInterval(() => undefined, 0)
        };
        this.go = this.go.bind(this);
        this.stop = this.stop.bind(this);
    }
    tick() {
        this.setState({
            time: new Date()
        });
    }
    go() {
        const intervalID = setInterval(() => this.tick(), 1000);
        this.setState({ intervalID: intervalID });
    }
    stop() {
        clearInterval(this.state.intervalID);
    }
    componentDidMount() {
        this.tick();
        this.go();
    }
    render() {
        const { tipLabel, goButtonTitle, stopButtonTitle } = this.props;
        return (<View>
            <Text>{this.props.title}</Text>
            <Text>{tipLabel}{this.state.time.toLocaleTimeString()}</Text>
            <ButtonTO onPress={this.go}><InButtonText>{goButtonTitle}</InButtonText></ButtonTO>
            <ButtonTO onPress={this.stop}><InButtonText>{stopButtonTitle}</InButtonText></ButtonTO>
        </View>);
    }
    componentWillUnmount() {
        this.stop();
    }
}
// HOC to pass sizeLabor
export default withSizeLabor(DemoCCClock);
