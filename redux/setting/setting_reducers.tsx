import { types } from "./setting_actions";

const initialState = {
};

interface Action {
    type: string,
    data: any
}


export const setting = (state = initialState, action: Action) => {
    switch (action.type) {
        default:
            return state;
    }
}
