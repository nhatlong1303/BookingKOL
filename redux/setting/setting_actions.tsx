
export const types = {
    GET_SETTING: 'GET_SETTING',
    GET_SETTING_COMPLETE: 'GET_SETTING_COMPLETE',
    REGISTRATION: 'REGISTRATION',
    VERIFICATION: 'VERIFICATION',
    LOGIN: 'LOGIN',
};

export function getSetting(params?: any, cb?: any) {
    return {
        type: types.GET_SETTING,
        params,
        cb
    }
}

export function onRegister(params?: any, cb?: any) {
    return {
        type: types.REGISTRATION,
        params,
        cb
    }
}

export function onVerify(params?: any, cb?: any) {
    return {
        type: types.VERIFICATION,
        params,
        cb
    }
}

export function onLogin(params?: any, cb?: any) {
    return {
        type: types.LOGIN,
        params,
        cb
    }
}





