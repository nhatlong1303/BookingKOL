import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { useForm } from "react-hook-form";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Image from 'next/image';
import InlineSVG from "react-inlinesvg";

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
        '& div': {

        }
    },
}))

interface Props {
    classesProp: any,
    setTab: (tab: number) => void
}
const SignUp = (props: Props) => {
    const { classesProp, setTab } = props;
    const classes = useStyle();
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
            ref: ''
        }
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const onRegister = () => {
        setLoading(true)
    }

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(!loading)
            }, 5000);
        }
    }, [loading])

    const onSave = (e: any) => {
        console.log(e)
    }

    const password = watch('password');
    const minLength = /^.{6,}$/.test(password)
    console.log(minLength)

    return (
        <div className={classesProp.general}>
            <div className='title column'>
                <label>Tạo tài khoản</label>
                <span>Chỉ vài bước đơn giản để khám phá ngay các tính năng của Booking KOL</span>
            </div>
            <div className={`form-hook`}>
                <form >
                    <TextField
                        label='Email'
                        className={`text-field ${errors.email ? 'mgb32' : ''}`}
                        {...register("email", { required: true })}
                        error={!!errors.email}
                        helperText={errors.email && "Nhập email"}
                        autoComplete="off"
                    />
                    <TextField
                        label='Mật khẩu'
                        className={`text-field ${errors.password ? 'mgb32' : ''}`}
                        {...register("password", { required: true })}
                        error={!!errors.password}
                        helperText={errors.password && "Nhập mật khẩu"}
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
                            <div className={minLength ? 'isOk' : ''}><InlineSVG src={'/icons/SuccessCircle.svg'} width={13} height={13} />&nbsp;Ít nhất 6 ký tự</div>
                            <div><InlineSVG src={'/icons/SuccessCircle.svg'} width={13} height={13} />&nbsp;Bao gồm chữ in hoa</div>
                            <div><InlineSVG src={'/icons/SuccessCircle.svg'} width={13} height={13} />&nbsp;Bao gồm số</div>
                        </div>
                        : !errors.password &&
                        <div className={classes.required}>Ít nhất 6 ký tự, bao gồm chữ in hoa và số</div>
                    }
                    <TextField
                        label={'Mã giới thiệu'}
                        className={'text-field'}
                        {...register("ref")}
                    />
                    <input className='hidden' id="submit" type='submit' />
                    <Button disabled={loading} variant="outlined" className='btn-custom-kol btn-login' type='submit' onClick={handleSubmit(onSave)}>
                        {loading ? <><div className="loader-icon"></div> Đang tạo </> : 'Tạo tài khoản'}
                    </Button>
                </form>
            </div>
            <div className='other center-row'><span>Có sẵn tài khoản? &nbsp;</span><div className='cursor-pointer' onClick={() => setTab(1)}>Đăng nhập</div></div>
        </div>
    );
};

export default SignUp;