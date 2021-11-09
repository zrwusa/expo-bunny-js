import { EBizLogicMsg, EDemoMap } from '../../constants';
import { bunnyAPI } from '../../helpers/bunny-api';
import { collectSysError, requestFailed, requesting, requestSuccess } from './sys';
import { collectBizLogicResult } from './biz-logic-result';
import { bizLogicError } from '../../helpers';
export const restoreNearbyFilms = (payload) => {
    return {
        type: EDemoMap.RESTORE_NEARBY_FILMS,
        payload
    };
};
export const getNearbyFilms = (reqParams) => {
    return async (dispatch) => {
        let result;
        const config = { method: 'GET', url: '/api/nearby-films', params: reqParams };
        try {
            result = dispatch(requesting(config));
            const { data: { data } } = await bunnyAPI.request(config);
            if (data) {
                result = dispatch(restoreNearbyFilms(data));
                result = dispatch(requestSuccess(config));
            }
            else {
                result = dispatch(collectBizLogicResult(bizLogicError(EBizLogicMsg.NO_NEARBY_FILMS)));
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
export const restoreRegion = (payload) => {
    return {
        type: EDemoMap.RESTORE_REGION,
        payload
    };
};
