import { cancel, take, takeLatest, put, delay } from "redux-saga/effects";
import { types } from "./setting_actions";
import Config from '../../config/index';
import Api from "../../services/api";

export default function SettingSagas() {
    return [
        watchGetSetting(),
        watchOnRegister(),
        watchOnVerify(),
        watchOnLogin()
    ];
}

export function* getSetting(data: any) {
    try {
        // @ts-ignore
        const areasOfConcern = yield Api.get('/areas-of-concern/list');
        yield put({
            type: types.GET_SETTING_COMPLETE,
            data: areasOfConcern.data,
        });
        if (localStorage.getItem('language')) {
            Config.language = localStorage.getItem('language');
        } else {
            localStorage.setItem('language', '84');
            Config.language = '84';
        }

    }
    catch (e) {
        console.log('getSetting is error');
    }
}
export function* watchGetSetting() {
    while (true) {
        // @ts-ignore
        const watcher = yield takeLatest(types.GET_SETTING, getSetting);
        yield take(['LOGOUT', 'NETWORK']);
        yield cancel(watcher);
    }
}


export function* onRegister(data: any) {
    try {
        yield delay(300);
        // @ts-ignore
        const response = yield Api.post('/user/registration', data.params);
        if (response && response.data) {
            data.cb && data.cb(null, response.data)
        } else {
            data.cb && data.cb(response, null)
        }
    }
    catch (e) {
        console.log('onRegister is error');
    }

}
export function* watchOnRegister() {
    while (true) {
        // @ts-ignore
        const watcher = yield takeLatest(types.REGISTRATION, onRegister);
        yield take(['LOGOUT', 'NETWORK']);
        yield cancel(watcher);
    }
}

export function* onVerify(data: any) {
    try {
        yield delay(300);
        // @ts-ignore
        const response = yield Api.put('/user/email-verification', data.params);
        if (response && response.data) {
            data.cb && data.cb(null, response.data)
        } else {
            data.cb && data.cb(response, null)
        }
    }
    catch (e) {
        console.log('onVerify is error');
    }

}
export function* watchOnVerify() {
    while (true) {
        // @ts-ignore
        const watcher = yield takeLatest(types.VERIFICATION, onVerify);
        yield take(['LOGOUT', 'NETWORK']);
        yield cancel(watcher);
    }
}


export function* onLogin(data: any) {
    try {
        yield delay(300);
        // @ts-ignore
        const response = yield Api.post('/user/login-system', data.params);
        if (response && response.data) {
            data.cb && data.cb(null, response.data)
        } else {
            data.cb && data.cb(response, null)
        }
    }
    catch (e) {
        console.log('onLogin is error');
    }

}
export function* watchOnLogin() {
    while (true) {
        // @ts-ignore
        const watcher = yield takeLatest(types.LOGIN, onLogin);
        yield take(['LOGOUT', 'NETWORK']);
        yield cancel(watcher);
    }
}
