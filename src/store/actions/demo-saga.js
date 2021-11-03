import {EDemoSaga} from '../../constants';

export function getDemoSagas(params) {
    return {
        type: EDemoSaga.GET_DEMO_SAGAS,
        payload: params
    };
}

export function receiveGetDemoSagas(sagas) {
    return {
        type: EDemoSaga.RECEIVE_GET_DEMO_SAGAS,
        payload: sagas
    };
}
