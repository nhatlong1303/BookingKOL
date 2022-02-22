import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { makeStyles } from '@mui/styles';
import InlineSVG from "react-inlinesvg";
import Config from '../config/index';
import { TextField, Button } from '@mui/material';
import { useForm } from "react-hook-form";
import Image from 'next/image';

const useStyle = makeStyles((theme: any) => ({
    forgot: {
        maxWidth: 600,
        maxHeight: 760,
        boxShadow: '0px 2px 16px rgba(158, 158, 158, 0.16)',
        borderRadius: 16,
        margin: 'auto',
        padding: '38px 10%',
        position: 'relative',
        textAlign: 'center',
        '& .title': {
            marginBottom: 32,
            '& label': {
                color: theme.palette.common.Ink.Dark,
                fontSize: Config.scale(32, 4),
                fontWeight: 500
            },
            '& span': {
                color: theme.palette.common.Ink.Gray,
                fontSize: 14
            }
        }
    },
    error: {
        backgroundColor: 'rgba(245, 108, 108, 0.1)',
        color: theme.palette.common.Denotative.Error,
        fontSize: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        padding: '15px 0',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    }
}))

const ForgotPassword = () => {
    const classes = useStyle();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');

    const onForgot = (e: any) => {

    }

    return (
        <div className={classes.forgot}>
            {error && <div className={classes.error}><InlineSVG src={'/icons/Error.svg'} width={13} height={13} />
                &nbsp;&nbsp;Email này chưa được đăng ký. Vui lòng nhập email khác!</div>}
            <div className='avatar' style={{ marginTop: error ? 32 : 0 }}>
                <Image src={'/images/Password.png'} alt="" width={120} height={120} />
            </div>
            <div className="title column">
                <label>Quên mật khẩu</label>
                <span>Mã xác thực sẽ được gửi về email của bạn</span>
            </div>
            <form className="form-hook">
                <TextField
                    label='Email'
                    className={`text-field`}
                    {...register("email", { required: true, pattern: Config.pattern('email') })}
                    error={!!errors.email}
                    helperText={errors.email && (errors.email?.type === 'required' ? "Nhập email" : 'Email không hợp lệ')}
                    autoComplete="off"
                />
                <Button variant="outlined" className='btn-custom-kol' type='submit' onClick={handleSubmit(onForgot)} >
                    Tiếp tục
                </Button>
            </form>
        </div>
    );
};
export const getStaticProps: GetStaticProps = async () => {
    const metaTags = {
        title: 'Quên mật khẩu'
    };
    return {
        props: { metaTags }
    }
}
export default ForgotPassword;