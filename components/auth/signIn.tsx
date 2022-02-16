import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { useForm } from "react-hook-form";
import Image from 'next/image';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const useStyle = makeStyles((theme: any) => ({
    other: {
        color: theme.palette.common.Ink.Gray,
        '&::before, &::after': {
            backgroundColor: theme.palette.common.Neutral.Smoke,
        }
    },
    btnFb: {
        backgroundColor: '#1877F2 !important',
        color: 'white',
        width: 400,
        border: 'none !important',
        [theme.breakpoints.down("sm")]: {
            width: 300,
        },
    },
    forgotPassword: {
        marginTop: 48,
        marginBottom: -32,
        color: theme.palette.common.Brand.Orange,
    }
}))
interface Props {
    classesProp: any,
    setTab: (tab: number) => void
}
const SignIn = (props: Props) => {
    const classes = useStyle();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { classesProp, setTab } = props;
    const [showPassword, setShowPassword] = useState(false);

    const onLogin = (e: any) => {
        console.log(e)
    }

    const { password } = watch();

    return (
        <div className={classesProp.general}>
            <div className='title column'>
                <label>Đăng nhập</label>
                <span>Chỉ vài bước đơn giản để khám phá ngay các tính năng của Booking KOL</span>
            </div>
            <div className={`form-hook column`}>
                <form>
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
                    <Button variant="outlined" className='btn-custom-kol btn-login' onClick={handleSubmit(onLogin)}>
                        Đăng nhập
                    </Button>
                </form>
            </div>
            <div className={`${classes.other} other-sign`}>Hoặc</div>
            <Button variant="outlined" className={`btn-custom-kol btn-login ${classes.btnFb}`} >
                <Image src={'/icons/Facebook.svg'} priority alt='' width={20} height={20} />
                <span className='pdl10'>Tiếp tục với Facebook</span>
            </Button>
            <div className={classes.forgotPassword}>Quên mật khẩu?</div>
            <div className='other center-row'><span>Chưa có tài khoản? &nbsp;</span><div className='cursor-pointer' onClick={() => setTab(0)}>Tạo tài khoản</div></div>
        </div>
    );
};

export default SignIn;