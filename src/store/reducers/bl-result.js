import {EBL} from '../../constants';

const initialState = {
    blResults: []
};

export function blStateReducer(prevState = initialState, {type, payload}) {
    switch (type) {
        case EBL.COLLECT_BL_RESULT:
            prevState.blResults.push(payload);
            return {
                ...prevState,
            };
        case EBL.CLEAR_BL_RESULT:
            if (payload.all) {
                prevState.blResults = [];
            } else if (payload.top) {
                prevState.blResults.splice(0, payload.top);
            } else if (payload.last) {
                prevState.blResults.splice(prevState.blResults.length - payload.last, payload.last);
            }
            return {...prevState};
        case EBL.SET_BL_RESULT:
            prevState.blResults.map((item) => {
                if (item.id === payload.id) {
                    item.shouldShow = payload.shouldShow;
                }
                return item;
            });
            return {...prevState};
        default:
            return prevState;
    }
}
