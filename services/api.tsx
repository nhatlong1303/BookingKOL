import Config from '../config';
import React from 'react';

interface options {
    method: string,
    headers: any,
    body: any
}

class Api extends React.Component {
    static headers(isFormData?: boolean) {
        let headers = {
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

    static get(route: string) {
        return this.xhr(route, null, 'GET');
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
            // const timer = setTimeout(() => {
            //     return reject({code: 'SYS001', message: 'System error!'});
            // }, 2000);
            fetch(url, options)
                .then(async (resp) => {
                    // clearTimeout(timer);
                    if (resp && resp.ok) {
                        // console.log('===== API.xhr => data:',url, resp);
                        try {
                            const data = await resp.json();

                            // console.log('===== API.xhr => data:',url, data);
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
                    // clearTimeout(timer);
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
            case "SYS002":
                error = { code: 'SYS002', message: "Authentication token is required" };
                break;
            case "SYS003":
                error = { code: 'SYS003', message: "Authentication token are not matching" };
                break;
            case "SYS004":
                error = { code: 'SYS004', message: "Authentication token is expired" };
                alert("Phiên làm việc đã hết hạn.\nVui lòng đăng nhập lại.");
                break;
            case "SYS005":
                error = { code: 'SYS005', message: "Authentication error request timeout" };
                break;
            case "SYS006":
                error = { code: 'SYS006', message: "Update token fail" };
                break;
            case "SYS007":
                error = { code: 'SYS007', message: "Socket error" };
                break;
            case "SYS008":
                error = { code: 'SYS008', message: "The data is not in JSON format" };
                break;
            case "SYS009":
                error = { code: 'SYS009', message: "The data is not in list" };
                break;
            case "SYS010":
                error = { code: 'SYS010', message: "The data is not number" };
                break;
            case "SYS011":
                error = { code: 'SYS011', message: "The data is unique" };
                break;
            case "SYS500":
                error = { code: 'SYS500', message: "The unknown error has occurred" };
                break;
            default:
                error = { code: 'SYS500', message: "The unknown error has occurred", ...error };
                break;
        }

        // if (error.code === 'SYS500' || error.code === 'SYS001') {
        //     Config.notifyError && Config.notifyError.show('error', Config.lang("ERP_Co_loi_xay_ra_trong_qua_trinh_xu_ly"), 5000);
        //     // browserHistory.push(Config.getRootPath() + 'error-page');
        //     console.log("Error: " + route, error);
        //     return true;
        // }
        if (error.code === 'ERROR_POLICE_1000') {
            // const message = error.code === 'SYS030' ? Config.lang('ERP_Khong_du_quyen') : Config.lang('ERP_Dang_nhap_lai');
            Config.popup.show('INFO', `${error.message} - Đăng nhập lại`, null, null, () => {
                // Config.logout();
            });
            return false;

        }

        return error;
    }
}

export default Api;
