import { EBizLogic } from '../../constants';
export const collectBizLogicResult = (payload) => {
    return {
        type: EBizLogic.COLLECT_BL_RESULT,
        payload
    };
};
export const clearBizLogicResults = (payload) => {
    return {
        type: EBizLogic.CLEAR_BL_RESULT,
        payload
    };
};
export const setBizLogicResult = (payload) => {
    return {
        type: EBizLogic.SET_BL_RESULT,
        payload,
    };
};
