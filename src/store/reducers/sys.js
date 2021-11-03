import { ELanguage, ESys, EThemes } from '../../constants';
import _ from 'lodash';
const initialState = {
    isReady: false,
    errors: [],
    warns: [],
    themeName: EThemes.light,
    language: ELanguage.en,
    navInitialState: undefined,
    requestStatuses: []
};
export function sysStateReducer(prevState = initialState, { type, payload }) {
    switch (type) {
        case ESys.RESTORE_IS_READY:
            const restoreIsReadyPayload = payload;
            return {
                ...prevState,
                ...restoreIsReadyPayload,
            };
        case ESys.ERROR:
            const sysErrorPayload = payload;
            prevState.errors.push(sysErrorPayload);
            return {
                ...prevState,
            };
        case ESys.CLEAR_ERRORS:
            const sysClearErrorPayload = payload;
            if (sysClearErrorPayload.all) {
                prevState.errors = [];
            }
            else if (sysClearErrorPayload.top) {
                prevState.errors.splice(0, sysClearErrorPayload.top);
            }
            else if (sysClearErrorPayload.last) {
                prevState.errors.splice(prevState.errors.length - sysClearErrorPayload.last, sysClearErrorPayload.last);
            }
            return { ...prevState };
        case ESys.WARN:
            const sysWarnPayload = payload;
            prevState.warns.push(sysWarnPayload.warn);
            return {
                ...prevState,
            };
        case ESys.RESTORE_NAV_INITIAL_STATE:
            const restoreNavInitialStatePayload = payload;
            return {
                ...prevState,
                ...restoreNavInitialStatePayload
            };
        case ESys.REQUESTING:
            const requestingPayload = payload;
            prevState.requestStatuses.push({ ...requestingPayload, status: 'LOADING' });
            return {
                ...prevState,
            };
        case ESys.REQUEST_RECEIVED:
            const receivedPayload = payload;
            _.remove(prevState.requestStatuses, item => (item.url === receivedPayload.url && item.method === receivedPayload.method && item.params === receivedPayload.params));
            // prevState.requestStatuses.map(item=>{
            //     if(item.id===receivedPayload.id){
            //         item.status = 'SUCCESS'
            //     }
            // })
            return {
                ...prevState,
            };
        case ESys.REQUEST_FAILED:
            const requestFailedPayload = payload;
            _.remove(prevState.requestStatuses, item => (item.url === requestFailedPayload.url && item.method === requestFailedPayload.method && item.params === requestFailedPayload.params));
            // prevState.requestStatuses.map(item=>{
            //     if(item.id===requestFailedPayload.id){
            //         item.status = 'FAILED'
            //     }
            // })
            return {
                ...prevState,
            };
        default:
            return prevState;
    }
}
