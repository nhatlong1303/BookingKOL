import Config from '../config';
import React from 'react';

interface options {
    method: string,
    headers: any,
    body: any
}

class Api extends React.Component {
    static headers(isFormData?: boolean) {
        let headers: any = {
            'Accept': '*',
            "Access-Control-Allow-Headers": "X-Access-Token,  Content-Type, Origin, Accept",
        };
        if (!isFormData) {
            headers['Content-Type'] = "application/x-www-form-urlencoded";
        }
        if (Config.getToken) {
            Config.getToken = false;
        } else {
            headers['api-token'] = Config.token.token;
        }
        return headers;
    }

    static get(route: string, params: any) {
        const _router = Config.isEmpty(params) ? route : route + '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&');
        return this.xhr(_router, null, 'GET');
    }

    static put(route: string, params: any) {
        return this.xhr(route, params, 'PUT');
    }

    static post(route: string, params: any) {
        return this.xhr(route, params, 'POST');
    }

    static delete(route: string, params: any) {
        return this.xhr(route, params, 'DELETE')
    }

    static xhr(route: string, params: any, method: string) {
        let url = Config.env.api + route;
        const options: options = {
            method: method,
            headers: Api.headers(),
            body: params ? JSON.stringify(params) : null
        };
        if (method !== 'GET') {
            const urlencoded = new URLSearchParams();
            if (params) {
                Object.keys(params).forEach((key) => {
                    urlencoded.append(key, params[key]);
                })
            }
            options.body = urlencoded;
        }
        if (typeof window !== "undefined" && params instanceof FormData) {
            options.body = params;
            options.headers = Api.headers(true);
        }
        const promise = new Promise((resolve, reject) => {
            fetch(url, options)
                .then(async (resp) => {
                    if (resp && resp.ok) {
                        try {
                            const data = await resp.json();
                            if (data && data.code && data.message) {
                                return resolve(Api.checkSystemError(data, route));
                            } else {
                                return resolve(data);
                            }
                        } catch (e) {
                            return resolve(Api.checkSystemError({ code: 'SYS001', message: 'System error!' }, route));
                        }
                    } else {
                        const data = await resp.json();
                        return resolve(Api.checkSystemError(data, route));
                    }
                }).catch(e => {
                    return resolve(Api.checkSystemError(e, route));
                });
        });
        return promise.then((result) => {
            return result;
        }, (err) => {
            return err;
        });
    }

    static checkSystemError = (error: any, route: string) => {
        const code = error.code || null;
        switch (code) {
            case "SYS001":
                error = { code: 'SYS001', message: 'System error!' };
                break;
            default:
                error = { code: 'SYS500', message: "The unknown error has occurred", ...error };
                break;
        }
        return error;
    }
}

export default Api;
