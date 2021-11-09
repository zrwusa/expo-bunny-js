import { bunnyAPI } from '../../helpers/bunny-api';
import { EBizLogicMsg, EDemoThunk } from '../../constants';
import { collectSysError, requestFailed, requesting, requestSuccess } from './sys';
import { collectBizLogicResult } from './biz-logic-result';
import { bizLogicError } from '../../helpers';
export const demoThunkSuccess = (payload) => {
    return {
        type: EDemoThunk.DEMO_THUNK_SUCCESS,
        payload
    };
};
export const demoThunk = (reqParams) => {
    return async (dispatch) => {
        let result;
        const config = { url: '/api/example-thunks', method: 'POST', data: reqParams };
        try {
            result = dispatch(requesting(config));
            const { data: { data } } = await bunnyAPI.request(config);
            if (data) {
                result = dispatch(demoThunkSuccess(data));
                result = dispatch(requestSuccess(config));
            }
            else {
                result = dispatch(collectBizLogicResult(bizLogicError(EBizLogicMsg.NO_DEMO_THUNK_DATA)));
            }
            return result;
        }
        catch (e) {
            result = dispatch(collectSysError(e));
            result = dispatch(requestFailed(config));
            return result;
        }
    };
};
