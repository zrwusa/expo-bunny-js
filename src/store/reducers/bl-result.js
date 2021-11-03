import { EBL } from '../../constants';
const initialState = {
    blResults: []
};
export function blStateReducer(prevState = initialState, { type, payload }) {
    switch (type) {
        case EBL.COLLECT_BL_RESULT:
            const collectBLResultsPayload = payload;
            prevState.blResults.push(collectBLResultsPayload);
            return {
                ...prevState,
            };
        case EBL.CLEAR_BL_RESULT:
            const clearBLResultsPayload = payload;
            if (clearBLResultsPayload.all) {
                prevState.blResults = [];
            }
            else if (clearBLResultsPayload.top) {
                prevState.blResults.splice(0, clearBLResultsPayload.top);
            }
            else if (clearBLResultsPayload.last) {
                prevState.blResults.splice(prevState.blResults.length - clearBLResultsPayload.last, clearBLResultsPayload.last);
            }
            return { ...prevState };
        case EBL.SET_BL_RESULT:
            const blResult = payload;
            prevState.blResults.map((item) => {
                if (item.id === blResult.id) {
                    item.shouldShow = blResult.shouldShow;
                }
                return item;
            });
            return { ...prevState };
        default:
            return prevState;
    }
}
