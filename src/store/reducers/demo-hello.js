import {EDemoHello} from '../../constants';

export function demoHelloStateReducer(prevState = {
    name: 'initialed name',
    order: 0
}, {type, payload}) {
    switch (type) {
        case EDemoHello.DEMO_HELLO: {
            return {
                ...prevState,
                ...payload,
            };
        }
        case EDemoHello.DEMO_HELLO2: {
            return {
                ...prevState,
                ...payload,
            };
        }
        default:
            return prevState;
    }
}
