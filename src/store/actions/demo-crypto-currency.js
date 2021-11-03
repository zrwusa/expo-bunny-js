import { EDemoCryptoCurrency } from '../../constants';
export function saveQuickAlertSettings(params) {
    return {
        type: EDemoCryptoCurrency.SAVE_QUICK_ALERT_SETTINGS,
        payload: params
    };
}
export function cancelAlertSettings(params) {
    return {
        type: EDemoCryptoCurrency.CANCEL_ALL_ALERT_SETTINGS,
        payload: params
    };
}
export function getCurrentPrice() {
    return {
        type: EDemoCryptoCurrency.GET_CURRENT_PRICE,
    };
}
export function receiveGetCurrentPrice(payload) {
    return {
        type: EDemoCryptoCurrency.RECEIVE_CURRENT_PRICE,
        payload
    };
}
