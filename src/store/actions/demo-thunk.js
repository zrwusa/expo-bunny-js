import bunnyAPI from '../../helpers/bunny-api';
import {EBLMsg, EDemoThunk} from '../../constants';
import {requestFailed, requesting, requestReceived, sysError} from './sys';
import {collectBLResult} from './bl-result';
import {blError} from '../../helpers';

export const demoThunkSuccess = (payload) => {
    return {
        type: EDemoThunk.DEMO_THUNK_SUCCESS,
        payload
    };
};
export const demoThunk = (reqParams) => {
    return async (dispatch) => {
        let result;
        const config = {url: '/demo-thunks', method: 'POST', data: reqParams};
        try {
            result = dispatch(requesting(config));
            const res = await bunnyAPI.request(config);
            if (res.data) {
                result = dispatch(demoThunkSuccess(res.data));
                result = dispatch(requestReceived(config));
            } else {
                result = dispatch(collectBLResult(blError(EBLMsg.NO_DEMO_THUNK_DATA)));
            }
            return result;
        } catch (e) {
            result = dispatch(sysError(e));
            result = dispatch(requestFailed(config));
            return result;
        }
    };
};
