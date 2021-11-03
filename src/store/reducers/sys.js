import {ELanguage, ESys, EThemes} from '../../constants';
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

export function sysStateReducer(prevState = initialState, {type, payload}) {
    switch (type) {
        case ESys.RESTORE_IS_READY:
            return {
                ...prevState,
                ...payload,
            };
        case ESys.ERROR:
            prevState.errors.push(payload);
            return {
                ...prevState,
            };
        case ESys.CLEAR_ERRORS:
            if (payload.all) {
                prevState.errors = [];
            } else if (payload.top) {
                prevState.errors.splice(0, payload.top);
            } else if (payload.last) {
                prevState.errors.splice(prevState.errors.length - payload.last, payload.last);
            }
            return {...prevState};
        case ESys.WARN:
            prevState.warns.push(payload.warn);
            return {
                ...prevState,
            };
        case ESys.RESTORE_NAV_INITIAL_STATE:
            return {
                ...prevState,
                ...payload
            };
        case ESys.REQUESTING:
            prevState.requestStatuses.push({...payload, status: 'LOADING'});
            return {
                ...prevState,
            };
        case ESys.REQUEST_RECEIVED:
            _.remove(prevState.requestStatuses, item => (item.url === payload.url && item.method === payload.method && item.params === payload.params));
            // prevState.requestStatuses.map(item=>{
            //     if(item.id===payload.id){
            //         item.status = 'SUCCESS'
            //     }
            // })
            return {
                ...prevState,
            };
        case ESys.REQUEST_FAILED:
            _.remove(prevState.requestStatuses, item => (item.url === payload.url && item.method === payload.method && item.params === payload.params));
            // prevState.requestStatuses.map(item=>{
            //     if(item.id===payload.id){
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
