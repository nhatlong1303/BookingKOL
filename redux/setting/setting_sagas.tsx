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
        const getToken = localStorage.getItem('TOKEN');
        let _token = {
            token: null,
            expire: 0
        };
        let expire = 0;
        if (getToken) {
            _token = JSON.parse(getToken);
            expire = _token?.expire ?? 0;
        }
        const timer = new Date().getTime();
        const newDate = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 1days
        if (getToken && expire > timer) {
            const _expireCal = Math.round((expire - timer) / (1000 * 60 * 60 * 24));
            console.log('còn ' + _expireCal + ' ngày')
            Config.token = _token;
            if (_expireCal > 0.2) {
                const _getProfile = Config.decryptData(localStorage.getItem('PROFILE'));
                if (_getProfile) {
                    const profile = JSON.parse(_getProfile);
                    Config.profile = profile;
                    yield put({
                        type: types.LOGIN_SUCCESS,
                        data: profile,
                    });
                    yield put({
                        type: types.LOADING_SUCCESS,
                        data: false,
                    });
                }
            } else {
                localStorage.removeItem('TOKEN');
                localStorage.removeItem('PROFILE');
                yield put({
                    type: types.LOADING_SUCCESS,
                    data: false,
                });
            }

        } else {
            yield put({
                type: types.LOADING_SUCCESS,
                data: false,
            });
        }
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
            yield put({
                type: types.LOGIN_SUCCESS,
                data: response.data.user,
            });
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
            yield put({
                type: types.LOGIN_SUCCESS,
                data: response.data.data,
            });
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
