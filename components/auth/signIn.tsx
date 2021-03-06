import React, { useState, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Button, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { useForm } from "react-hook-form";
import Image from 'next/image';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as SettingActions from '../../redux/setting/setting_actions';
import { useDispatch } from 'react-redux';
import InlineSVG from "react-inlinesvg";
import Config from '../../config/index';
import { useRouter } from 'next/router';

const useStyle = makeStyles((theme: any) => ({
    other: {
        margin: 'auto',
        [theme.breakpoints.up("sm")]: {
            width: 400,
        },
        '& .other': {
            width: '100%',
            color: theme.palette.common.Ink.Gray,
            marginTop: '0 !important',
            '&::before, &::after': {
                backgroundColor: theme.palette.common.Neutral.Smoke,
            },

        },
        '& .btnFb': {
            width: '100%',
            '& button': {
                backgroundColor: '#1877F2 !important',
                border: 'none !important',
                color: 'white',
                width: '100%'
            },
        }
    },
    forgotPassword: {
        marginTop: 48,
        marginBottom: -32,
        cursor: 'pointer',
        color: theme.palette.common.Brand.Orange,
        [theme.breakpoints.down("lg")]: {
            marginTop: '28px !important',
            marginBottom: '-12px !important',
        },
    }
}))
interface Props {
    classesProp: any,
    setTab: (tab: number) => void,
    setIsverify: (e: string) => void,
    onClose: (e: boolean) => void
}
const SignIn = (props: Props) => {
    const dispatch = useDispatch();
    const classes = useStyle();
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { classesProp, setTab, setIsverify, onClose } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const errorText = useRef('');
    const onLogin = (e: any) => {
        setLoading(true);
        dispatch(SettingActions.onLogin((e), (error: any, data: any) => {
            if (error) {
                console.log(error)
                switch (error.error) {
                    case 'EMAIL_IS_NOT_VERIFIED':
                        setTab(0);
                        setIsverify(e.email);
                        break;
                    case "USERNAME_OR_PASSWORD_IS_INCORRECT":
                        errorText.current = 'Email ho???c m???t kh???u ch??a ????ng. Vui l??ng th??? l???i!!';
                        break;
                    default:
                        errorText.current = 'L???i kh??ng x??c ?????nh!!';
                        break
                }
                setLoading(false);
                return;
            }
            setLoading(false);
            const expire = new Date().getTime() + 1 * 24 * 60 * 60 * 1000;
            Config.token = {
                token: data.token,
                expire: expire
            };
            // document.cookie = `BOOKING_ACCESS_TOKEN=${data.token};max-age=${24 * 60 * 60}`;
            localStorage.setItem("TOKEN", JSON.stringify(Config.token));
            onClose(true);
        }))
    }

    const onForgot = () => {
        router.push('/forgotPassword');
        onClose(false);
    }

    const { password } = watch();

    return (
        <div>
            {errorText.current && <div className={classesProp.error}><InlineSVG src={'/icons/Error.svg'} width={13} height={13} />
                &nbsp;&nbsp;{errorText.current}</div>}
            <div className={classesProp.general}>
                <div className='title column'>
                    <label>????ng nh???p</label>
                    <span>Ch??? v??i b?????c ????n gi???n ????? kh??m ph?? ngay c??c t??nh n??ng c???a Booking KOL</span>
                </div>
                <div className={`form-hook column`}>
                    <form>
                        <TextField
                            label='Email'
                            className={`text-field ${errors.email ? 'mgb32' : ''}`}
                            {...register("email", { required: true, pattern: Config.pattern('email') })}
                            error={!!errors.email}
                            helperText={errors.email && (errors.email?.type === 'required' ? "Nh???p email" : 'Email kh??ng h???p l???')}
                            autoComplete="off"
                        />
                        <TextField
                            label='M???t kh???u'
                            className={`text-field ${errors.password ? 'mgb32' : ''}`}
                            {...register("password", { required: true })}
                            error={!!errors.password}
                            helperText={errors.password && "Nh???p m???t kh???u"}
                            autoComplete="off"
                            type={showPassword ? "text" : "password"}
                            InputProps={{
                                endAdornment: (password &&
                                    <InputAdornment position="end">
                                        <IconButton size={"small"} className={"mgr5"}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {!showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button variant="outlined" className='btn-custom-kol btn-login' type='submit' onClick={handleSubmit(onLogin)}>
                            {loading ? <div className="center-row"><CircularProgress size={20} className="mgr10" color="inherit" /> ??ang ????ng nh???p </div> : '????ng nh???p'}
                        </Button>
                    </form>
                </div>
                <div className={classes.other}>
                    <div className={`other other-sign`}>Ho???c</div>
                    <div className={`btnFb`}>
                        <Button variant="outlined" className={`btn-custom-kol btn-login `} >
                            <Image src={'/icons/Facebook.svg'} priority alt='' width={20} height={20} />
                            <span className='pdl10'>Ti???p t???c v???i Facebook</span>
                        </Button>
                    </div>
                </div>
                <div className={classes.forgotPassword} onClick={onForgot}>Qu??n m???t kh???u?</div>
                <div className='other center-row'><span>Ch??a c?? t??i kho???n? &nbsp;</span><div className='cursor-pointer' onClick={() => setTab(0)}>T???o t??i kho???n</div></div>
            </div>
        </div>

    );
};

export default SignIn;