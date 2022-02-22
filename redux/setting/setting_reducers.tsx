import { types } from "./setting_actions";

const initialState = {
    areasOfConcern: [],
    profile: null,
    loading: true,
};

interface Action {
    type: string,
    data: any
}


export const setting = (state = initialState, action: Action) => {
    switch (action.type) {
        case types.GET_SETTING_COMPLETE:
            return {
                ...state,
                areasOfConcern: action.data ?? [],
            }
        case types.LOGIN_SUCCESS:
        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                profile: action.data
            }
        case types.LOADING_SUCCESS:
            return {
                ...state,
                loading: action.data
            }
        default:
            return state;
    }
}
