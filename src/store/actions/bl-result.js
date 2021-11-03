import {EBL} from '../../constants';

export const collectBLResult = (payload) => {
    return {
        type: EBL.COLLECT_BL_RESULT,
        payload
    };
};
export const clearBLResults = (payload) => {
    return {
        type: EBL.CLEAR_BL_RESULT,
        payload
    };
};
export const setBLResult = (payload) => {
    return {
        type: EBL.SET_BL_RESULT,
        payload,
    };
};
