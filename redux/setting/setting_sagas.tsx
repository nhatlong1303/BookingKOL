import { cancel, take, takeLatest, put } from "redux-saga/effects";
import { types } from "./setting_actions";
import Config from '../../config/index';

export default function SettingSagas() {
    return [
        watchGetSetting(),
    ];
}

export function* getSetting(data: any) {
    try {
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
