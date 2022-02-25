
export const types = {
    UPDATE_USER: 'UPDATE_USER',
    FIND_USERS: 'FIND_USERS'
};

export function onUpdateUser(params?: any, cb?: any) {
    return {
        type: types.UPDATE_USER,
        params,
        cb
    }
}

export function onFindUsers(params?: any, cb?: any) {
    return {
        type: types.FIND_USERS,
        params,
        cb
    }
}

