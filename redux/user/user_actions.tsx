
export const types = {
    UPDATE_USER: 'UPDATE_USER'
};

export function onUpdateUser(params?: any, cb?: any) {
    return {
        type: types.UPDATE_USER,
        params,
        cb
    }
}
