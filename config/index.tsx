import { isMobile } from "react-device-detect";
import moment from 'moment';
import { localize } from '../localize/localize';
import env from './env';
import CryptoJS from 'crypto-js';

interface token {
    token: any,
    expire: number
}
class Config {

    static isMobile = isMobile;
    static token: token = {
        token: null,
        expire: 0
    };
    static profile: any = null;
    static language: any = '84';
    static loading: any = null;
    static notify: any = null;
    static popup: any = null;
    static env = env;
    static loadingProcess: any = null;
    static screenMac = typeof window !== "undefined" && window.innerHeight <= 764;

    static srollToTop = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    static getRootPath() {
        return this.env.basePath;
    }

    static getUrl(url = '') {
        return this.env.url + Config.getRootPath() + url;
    }

    static getImage(url: string) {
        return url ? this.env.url + '/' + url : null;
    }

    static numberFormat = (number: number, limitNumber = 0) => {
        const formatter = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: limitNumber,
            maximumFractionDigits: limitNumber,
        });
        const _number = formatter.format(number);
        return !_number || _number === "NaN" ? 0 : _number;
    };

    static countDecimals = (value: number) => {
        if (Math.floor(value) === value) return 0;
        return value.toString().split(".")[1].length || 0;
    }

    static formatPrice(number: number, decimal: number = 0) {
        return Config.numberFormat(number, decimal ?? Config.countDecimals(number));
    }

    static encryptData = (data: any) => {
        if (!data || typeof data !== "string") return false;
        try {
            return CryptoJS.AES.encrypt(data, 'booking').toString();
        } catch (e) {
            console.log("encrypt error", e);
            return false;
        }
    };

    //Decrypt data...
    static decryptData = (data: any, stringDecode = CryptoJS.enc.Utf8) => {
        if (!data) return null;
        try {
            return CryptoJS.AES.decrypt(data, 'booking').toString(stringDecode);
        } catch (e) {
            console.log("decrypt error", e);
            return null;
        }
    };

    static replaceSymbol = (value: any) => {
        // let str = str.replace(/[|?~=",{}[\];^%']/gi, '');
        let str = value.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/\s/g, '');
        str = str.replace(/[^0-9a-z_\-#*/(\\)]/gi, '');

        return str.toUpperCase();
    };

    static convertDate = (value: any, defaultValue: any, format = "DD/MM/YYYY", isUTC = true, inputFormat: any) => {
        if (!value || !moment(value).isValid()) return defaultValue ? defaultValue : null;
        if (isUTC) {
            return moment.utc(value, inputFormat).format(format)
        } else {
            return moment(value, inputFormat).format(format);
        }
    };

    static lang = (text: string) => {
        if (Config.language !== '84') {
            return localize['en'][text] ? localize['en'][text] : text;
        }
        return localize['vi'][text] ? localize['vi'][text] : text;
    };

    static timeBeforeNow = (timeStamp: string, format: any = 'YYYY-MM-DD hh:mm:ss') => {
        const lang = Config.language === '84' ? 'vi' : 'en';
        let start = moment();
        let end = moment(timeStamp, 'YYYY-MM-DD hh:mm:ss');
        let time = start.diff(end, 'minutes');
        return time > 4320 ? moment(new Date(timeStamp)).locale(lang).format('DD/MM/YYYY') : moment(new Date(timeStamp), format).locale(lang).fromNow();
    };

    static getTimeNow = (timeStamp: string, format: any = 'YYYY-MM-DD hh:mm:ss') => {
        let start = moment();
        let end = moment(timeStamp, 'YYYY-MM-DD hh:mm:ss');
        let time = start.diff(end, 'minutes');
        return time > 1440 ? moment(timeStamp).format('DD/MM/YYYY') : moment(timeStamp).format(format);
    };

    static getRandomNumber = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    static isEmpty = (value: any, escapeZero = false) => {
        switch (typeof value) {
            case "object": {
                if (Array.isArray(value))
                    return value.length <= 0;
                else
                    return (value && Object.keys(value).length <= 0) || !value;
            }
            case "string": {
                return !value.trim();
            }
            case "number": {
                if (!escapeZero)
                    return !value;
                else
                    return value === 0 ? false : !value;
            }
            case undefined: {
                return false;
            }
            default: {
                return !value;
            }
        }
    };

    static pattern = (key: any) => {
        let rs: any = '';
        switch (key) {
            case 'email':
                rs = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
                break;
            case 'phone':
                rs = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
                break;
            case 'number':
                rs = /^(0|[1-9][0-9]*)$/;
                break;
            default:
                break;
        }
        return rs;
    };

    static groupByField = (array: Array<any>, key: any) => {
        return array.reduce((group, item) => {
            const val = item[key];
            group[val] = group[val] || [];
            group[val].push(item);
            return group;
        }, {})
    }

    static recursiveData = (list: Array<any>, parent?: any, level?: number) => {
        if (!parent) {
            const listParents = list.filter(rs => !rs.parentId);
            listParents.forEach((parent) => {
                parent.parent = 0;
                parent.level = 0;
                parent.children = Config.recursiveData(list, parent._id, parent.level);
            });
            return listParents;
        } else {
            let _children = list.filter((item) => {
                return item.parentId === parent;
            });
            if (_children.length > 0) {
                _children.forEach((child) => {
                    child.level = level ?? 0 + 1;
                    child.children = Config.recursiveData(list, child._id, child.level);
                });
            }
            return _children;
        }
    };

    static array_move = (arr: Array<any>, old_index: number, new_index: number) => {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr;
    };

    static getFirstChart = (str: string, number: number = 2) => {
        const acronym = str.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '');
        return acronym.slice(0, number);
    }

    static sumValue = (arr: Array<any>, key: number) => {
        return arr.reduce((a, b) => a + (b[key] || 0), 0);
    }

    static scale = (px: number, number: number = 6) => {
        return window.innerHeight <= 764 ? px - number : px;
    }
}

export default Config;
