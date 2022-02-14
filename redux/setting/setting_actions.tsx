
export const types = {
    GET_SETTING: 'GET_SETTING',
    GET_SETTING_COMPLETE: 'GET_SETTING_COMPLETE',
};

export function getSetting(params?: any, cb?: any) {
    return {
        type: types.GET_SETTING,
        params,
        cb
    }
}





