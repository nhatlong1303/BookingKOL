import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Button, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { useForm } from "react-hook-form";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InlineSVG from "react-inlinesvg";
import Config from '../../config';
import * as SettingActions from '../../redux/setting/setting_actions';
import { useDispatch } from 'react-redux';
const useStyle = makeStyles((theme: any) => ({
    required: {
        fontSize: 14,
        color: theme.palette.common.Ink.Gray,
        paddingLeft: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: -10,
        marginBottom: 16,
        '& svg': {
            marginBottom: 2
        },
        '& path': {
            fill: theme.palette.common.Ink.Gray,
        },
        '& .isOk path': {
            fill: theme.palette.common.Denotative.Success,
        },
    },
    verify: {
        marginTop: 32,
        '& label': {
            color: theme.palette.common.Ink.Dark,
            marginBottom: 22,
        },
        '& .center-row': {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            marginRight: 20,
            '& .MuiInput-root': {
                marginRight: 10,
                maxWidth: 60,
                '&:last-of-type': {
                    marginRight: 0
                },
                '& input': {
                    textAlign: 'center'
                }
            }
        }
    }
}))

interface Props {
    classesProp: any,
    setTab: (tab: number) => void,
    setIsverify: (e: string) => void,
    isVerify: string,
    onClose: (e: boolean) => void
}
const SignUp = (props: Props) => {
    const { classesProp, setTab, setIsverify, isVerify, onClose } = props;
    const dispatch = useDispatch();
    const classes = useStyle();
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({
        defaultValues: {
            email: '',
            password: '',
            ref: '',
            code1: '',
            code2: '',
            code3: '',
            code4: '',
            code5: '',
            code6: '',
        }
    });

    useEffect(() => {
        setValue('email', isVerify)
        /* eslint-disable */
    }, [isVerify])

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const errorText = useRef('');

    const onRegister = (e: any) => {
        setLoading(true);
        dispatch(SettingActions.onRegister((e), (error: any, data: any) => {
            if (error) {
                errorText.current = error.error;
                switch (error.error) {
                    case 'EMAIL_EXIST':
                        errorText.current = 'Email n??y ???? ???????c ????ng k??. Vui l??ng nh???p email kh??c!';
                        break;
                    default:
                        errorText.current = 'L???i kh??ng x??c ?????nh!!';
                        break
                }
                setLoading(false);
                return;
            }
            setIsverify(e.email);
        }))
    }

    const onVerify = (e: any) => {
        const params = {
            code: e.code1 + e.code2 + e.code3 + e.code4 + e.code5 + e.code6,
            email: e.email
        }
        setLoading(true);
        dispatch(SettingActions.onVerify((params), (error: any, data: any) => {
            if (error) {
                errorText.current = error.error;
                switch (error.error) {
                    case 'CODE_NOT_FOUND':
                        errorText.current = 'M?? x??c th???c kh??ng ch??nh x??c!';
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
            localStorage.setItem("TOKEN", JSON.stringify(Config.token));
            onClose(true);
        }))
    }

    const onChange = (e: any) => {
        const { value, name, } = e.target;
        const [fieldName, fieldIndex] = name.split("code");
        let fieldIntIndex = parseInt(fieldIndex, 10);
        if (value.length >= 1) {
            if (value.length > 1) {
                setValue(name, value.substring(1))
            }
            const nextfield = document.querySelector<HTMLElement>(
                `input[name=code${fieldIntIndex + 1}]`
            );
            if (nextfield) {
                nextfield?.focus();
            }
        }
    }

    const password = watch('password');
    const minLength = /^.{6,}$/.test(password);
    const uppercase = /(?=.*[A-Z])/.test(password);
    const number = /(?=.*\d)/.test(password);

    return (
        <div>
            {errorText.current && <div className={classesProp.error}><InlineSVG src={'/icons/Error.svg'} width={13} height={13} />
                &nbsp;&nbsp;{errorText.current}</div>}
            <div className={classesProp.general}>
                <div className='title column'>
                    <label>T???o t??i kho???n</label>
                    <span>Ch??? v??i b?????c ????n gi???n ????? kh??m ph?? ngay c??c t??nh n??ng c???a Booking KOL</span>
                </div>
                <div className={`form-hook`}>
                    <form >
                        <TextField
                            label='Email'
                            className={`text-field ${errors.email ? 'mgb32' : ''}`}
                            {...register("email", { required: true, pattern: Config.pattern('email') })}
                            error={!!errors.email}
                            helperText={errors.email && (errors.email?.type === 'required' ? "Nh???p email" : 'Email kh??ng h???p l???')}
                            autoComplete="off"
                            disabled={isVerify ? true : false}
                        />
                        {isVerify ?
                            <div className={classes.verify}>
                                <label>Nh???p m?? x??c th???c</label>
                                <div className='center-row'>
                                    <TextField
                                        variant='standard'
                                        {...register("code1", { required: true })}
                                        onChange={onChange}
                                    />
                                    <TextField
                                        variant='standard'
                                        {...register("code2", { required: true })}
                                        onChange={onChange}
                                    />
                                    <TextField
                                        variant='standard'
                                        {...register("code3", { required: true })}
                                        onChange={onChange}
                                    />
                                    <TextField
                                        variant='standard'
                                        {...register("code4", { required: true })}
                                        onChange={onChange}
                                    />
                                    <TextField
                                        variant='standard'
                                        {...register("code5", { required: true })}
                                        onChange={onChange}
                                    />
                                    <TextField
                                        variant='standard'
                                        {...register("code6", { required: true })}
                                        onChange={onChange}
                                    />
                                </div>
                                <Button disabled={loading} variant="outlined" className='btn-custom-kol btn-login' type='submit' onClick={handleSubmit(onVerify)}>
                                    {loading ? <div className="center-row"><CircularProgress size={20} className="mgr10" color="inherit" /> ??ang x??c th???c </div> : 'X??c th???c'}
                                </Button>
                            </div>
                            :
                            <>
                                <TextField
                                    label='M???t kh???u'
                                    className={`text-field ${errors.password ? 'mgb32' : ''}`}
                                    {...register("password", { required: true, minLength: 6, pattern: /(?=.*\d)(?=.*[A-Z])/ })}
                                    error={!!errors.password}
                                    helperText={errors.password?.type === 'required' && "Nh???p m???t kh???u"}
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
                                {password ?
                                    <div className={classes.required}>
                                        <div className={minLength ? 'isOk' : ''}><InlineSVG src={'/icons/SuccessCircle.svg'} width={13} height={13} />&nbsp;??t nh???t 6 k?? t???</div>
                                        <div className={uppercase ? 'isOk' : ''}><InlineSVG src={'/icons/SuccessCircle.svg'} width={13} height={13} />&nbsp;Bao g???m ch??? in hoa</div>
                                        <div className={number ? 'isOk' : ''}><InlineSVG src={'/icons/SuccessCircle.svg'} width={13} height={13} />&nbsp;Bao g???m s???</div>
                                    </div>
                                    : !errors.password &&
                                    <div className={classes.required}>??t nh???t 6 k?? t???, bao g???m ch??? in hoa v?? s???</div>
                                }
                                <TextField
                                    label={'M?? gi???i thi???u'}
                                    className={'text-field'}
                                    {...register("ref")}
                                />
                                <Button disabled={loading} variant="outlined" className='btn-custom-kol btn-login' type='submit' onClick={handleSubmit(onRegister)}>
                                    {loading ? <div className="center-row"><CircularProgress size={20} className="mgr10" color="inherit" /> ??ang t???o </div> : 'T???o t??i kho???n'}
                                </Button>
                            </>
                        }

                    </form>
                </div>
                <div className='other center-row'><span>C?? s???n t??i kho???n? &nbsp;</span><div className='cursor-pointer' onClick={() => setTab(1)}>????ng nh???p</div></div>
            </div>
        </div>
    );
};

export default SignUp;