import { cancel, take, takeLatest, takeEvery, delay } from "redux-saga/effects";
import { types } from "./user_actions";
import Api from "../../services/api";

export default function UserSagas() {
    return [
        watchOnUpdateUser(),
        watchOnFindUsers()
    ];
}

export function* onUpdateUser(data: any) {
    try {
        yield delay(300);
        // @ts-ignore
        const response = yield Api.put('/users/update-info', data.params);
        if (response && response.data) {
            data.cb && data.cb(null, response.data)
        } else {
            data.cb && data.cb(response, null)
        }
    }
    catch (e) {
        console.log('onUpdateUser is error');
    }

}
export function* watchOnUpdateUser() {
    while (true) {
        // @ts-ignore
        const watcher = yield takeLatest(types.UPDATE_USER, onUpdateUser);
        yield take(['NETWORK']);
        yield cancel(watcher);
    }
}

export function* onFindUsers(data: any) {
    try {
        yield delay(300);
        // @ts-ignore
        const response = yield Api.get('/user/find-kol-web', data.params);
        if (response && response.data) {
            data.cb && data.cb(null, response.data)
        } else {
            data.cb && data.cb(response, null)
        }
    }
    catch (e) {
        console.log('onFindUsers is error');
    }

}
export function* watchOnFindUsers() {
    while (true) {
        // @ts-ignore
        const watcher = yield takeEvery(types.FIND_USERS, onFindUsers);
        yield take(['NETWORK']);
        yield cancel(watcher);
    }
}
