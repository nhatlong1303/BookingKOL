import { types } from "./setting_actions";

const initialState = {
    areasOfConcern: []
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
                areasOfConcern: action.data
            }
        default:
            return state;
    }
}
