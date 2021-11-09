import { EDemoSagaFirebase } from '../../constants';
export function saveDemoSagaFirebaseTodo(params) {
    return {
        type: EDemoSagaFirebase.SAVE_DEMO_SAGA_FIREBASE_TODO,
        payload: params
    };
}
