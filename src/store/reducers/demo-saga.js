import {EDemoSaga} from '../../constants';

export function demoSagaReducer(prevState = {
    items: [],
}, {type, payload}) {
    switch (type) {
        case EDemoSaga.RECEIVE_GET_DEMO_SAGAS:
            const payloadNow = payload;
            return {
                ...prevState,
                items: payloadNow
            };
        default:
            return prevState;
    }
}
