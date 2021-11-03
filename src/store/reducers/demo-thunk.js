import { EDemoThunk } from '../../constants';
export function demoThunkStateReducer(prevState = {
    id: 0,
    text: 'initialed text'
}, { type, payload }) {
    switch (type) {
        case EDemoThunk.DEMO_THUNK_SUCCESS: {
            return {
                ...prevState,
                ...payload,
            };
        }
        default:
            return prevState;
    }
}
