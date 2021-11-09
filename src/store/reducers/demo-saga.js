import { EDemoSaga } from '../../constants';
export function demoSagaReducer(prevState = {
    items: [],
}, { type, payload }) {
    switch (type) {
        case EDemoSaga.RECEIVE_GET_DEMO_SAGAS:
            return {
                ...prevState,
                items: payload
            };
        default:
            return prevState;
    }
}
