import { EBizLogic } from '../../constants';
const initialState = {
    bizLogicResults: []
};
export function blStateReducer(prevState = initialState, { type, payload }) {
    switch (type) {
        case EBizLogic.COLLECT_BL_RESULT:
            const collectBizLogicResultsPayload = payload;
            prevState.bizLogicResults.push(collectBizLogicResultsPayload);
            return {
                ...prevState,
            };
        case EBizLogic.CLEAR_BL_RESULT:
            const clearBizLogicResultsPayload = payload;
            if (clearBizLogicResultsPayload.all) {
                prevState.bizLogicResults = [];
            }
            else if (clearBizLogicResultsPayload.top) {
                prevState.bizLogicResults.splice(0, clearBizLogicResultsPayload.top);
            }
            else if (clearBizLogicResultsPayload.last) {
                prevState.bizLogicResults.splice(prevState.bizLogicResults.length - clearBizLogicResultsPayload.last, clearBizLogicResultsPayload.last);
            }
            return { ...prevState };
        case EBizLogic.SET_BL_RESULT:
            const bizLogicResult = payload;
            prevState.bizLogicResults.map((item) => {
                if (item.id === bizLogicResult.id) {
                    item.shouldShow = bizLogicResult.shouldShow;
                }
                return item;
            });
            return { ...prevState };
        default:
            return prevState;
    }
}
