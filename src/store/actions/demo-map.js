import { EBLMsg, EDemoMap } from '../../constants';
import bunnyAPI from '../../helpers/bunny-api';
import { requestFailed, requesting, requestReceived, sysError } from './sys';
import { collectBLResult } from './bl-result';
import { blError } from '../../helpers';
export const restoreNearbyFilms = (payload) => {
    return {
        type: EDemoMap.RESTORE_NEARBY_FILMS,
        payload
    };
};
export const getNearbyFilms = (reqParams) => {
    return async (dispatch) => {
        let result;
        const config = { method: 'GET', url: '/nearby-films', params: reqParams };
        try {
            result = dispatch(requesting(config));
            const res = await bunnyAPI.request(config);
            if (res.data) {
                result = dispatch(restoreNearbyFilms(res.data));
                result = dispatch(requestReceived(config));
            }
            else {
                result = dispatch(collectBLResult(blError(EBLMsg.NO_NEARBY_FILMS)));
            }
            return result;
        }
        catch (e) {
            result = dispatch(sysError(e));
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
