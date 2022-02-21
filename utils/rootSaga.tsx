import _ from 'lodash';
import { all } from 'redux-saga/effects';
import SettingSagas from '../redux/setting/setting_sagas';
import UserSagas from '../redux/user/user_sagas';
export default function* rootSaga() {
    yield all(_.flattenDeep([
        SettingSagas(),
        UserSagas()
    ]));
}


