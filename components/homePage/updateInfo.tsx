import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import InlineSVG from "react-inlinesvg";
import { TextField, Button } from '@mui/material';
import { useForm } from "react-hook-form";
import Config from '../../config';
import * as UserActions from '../../redux/user/user_actions';
import * as SettingActions from '../../redux/setting/setting_actions';
import { useDispatch } from 'react-redux';

const useStyle = makeStyles((theme: any) => ({
    updateInfo: {
        maxWidth: 600,
        maxHeight: 760,
        boxShadow: '0px 2px 16px rgba(158, 158, 158, 0.16)',
        borderRadius: 16,
        margin: 'auto',
        padding: '38px 10%',
        position: 'relative',
        [theme.breakpoints.down("sm")]: {
            padding: '48px 10px',
        },
        '& .avatar': {
            padding: '0 64px',
            marginBottom: Config.scale(32),
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            '& .avatar_container': {
                width: Config.scale(192, 30),
                height: Config.scale(192, 30),
                display: 'flex',
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
            },
            '& .left': {
                background: theme.palette.common.Gradient.Sunset,
                width: Config.scale(128, 20),
                height: Config.scale(128, 20),
                borderRadius: '50%',
                position: 'absolute',
                left: 0,
                bottom: 0,
                zIndex: 1
            },
            '& .right': {
                background: theme.palette.common.Gradient.Sunshine,
                width: Config.scale(128, 20),
                height: Config.scale(128, 20),
                borderRadius: '50%',
                position: 'absolute',
                right: 0,
                top: 0,
                zIndex: 1
            },
            '& .middle': {
                backgroundColor: theme.palette.common.Neutral.White,
                width: Config.scale(160, 20),
                height: Config.scale(160, 20),
                borderRadius: '50%',
                boxShadow: '0px 3px 8px rgba(102, 102, 102, 0.24)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 2,
                '& .middle-main': {
                    backgroundColor: theme.palette.common.Neutral.Smoke,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    width: Config.scale(150, 20),
                    height: Config.scale(150, 20),
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }
            }
        },
        '& .fullname': {
            marginBottom: Config.scale(32),
            '& input': {
                textAlign: 'center',
                fontWeight: 500,
                fontSize: Config.scale(32, 14),
            }
        },
        '& .become': {
            color: theme.palette.common.Ink.Dark,
            textAlign: 'center',
            marginBottom: Config.scale(32),
            padding: '0 10px',
            '& label': {
                fontSize: Config.scale(20, 4),
                marginBottom: Config.scale(32),
            },
            '& .kol': {
                cursor: 'pointer',
                width: Config.scale(167, 20),
                height: Config.scale(167, 20),
                borderRadius: 24,
                boxShadow: '0px 2px 16px rgba(158, 158, 158, 0.16)',
                justifyContent: 'center',
                '& span': {
                    fontSize: Config.scale(16, 2),
                    fontWeight: 500,
                    marginTop: 20
                },
                '& .icon': {
                    position: 'relative',
                    '& .checked': {
                        position: 'absolute',
                        top: 0,
                        right: '32%'
                    }
                }
            },
            '& .actived': {
                border: '2px solid ' + theme.palette.common.Brand.Orange
            }
        },
        '& .btn-custom-kol': {
            background: theme.palette.common.Brand.Orange + '!important',
            width: '100%',
            color: '#fff'
        },
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
const UpdateInfo = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [selectedImage, setSelectedImage] = useState<any>({ file: null, url: null });
    const [type, setType] = useState('');

    useEffect(() => {
        setValue('type', type);
        /* eslint-disable */
    }, [type])

    useEffect(() => {
        setValue('imgPortrait', selectedImage.file);
        /* eslint-disable */
    }, [selectedImage])

    const onSave = (e: any) => {
        const formData = new FormData();
        formData?.append('files', selectedImage.file);
        const _profile = { ...Config.profile };
        dispatch(SettingActions.onUpload(formData, (error: any, data: any) => {
            if (error) {
                return;
            }
            const params = {
                ...e,
                imgPortrait: data[0]
            }
            dispatch(UserActions.onUpdateUser(params, (error: any, data: any) => {
                if (error) { return; }
                _profile.profile.fullName = e.fullName;
                _profile.profile.imgPortrait = params.imgPortrait;
                _profile.type = e.type;
                dispatch(SettingActions.onUpdateProfile(_profile))
            }))
        }))
    }

    const onClickAvatar = () => {
        document.querySelector<HTMLElement>('#file')?.click();
    }

    const onChangeAvatar = (e: any) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        if (file) {
            reader.onloadend = () => {
                setSelectedImage({
                    file: file,
                    url: reader.result
                });
            }
            reader.readAsDataURL(file)
        }

    }

    return (
        <div className={`${classes.updateInfo} updateInfo`}>
            {!Config.isEmpty(errors) && <div className={classes.error}><InlineSVG src={'/icons/Error.svg'} width={13} height={13} />
                &nbsp;&nbsp;Vui lòng nhập đầy đủ thông tin!</div>}
            <form encType="multipart/form-data">
                <div className='avatar' style={{ marginTop: !Config.isEmpty(errors) ? 32 : 0 }}>
                    <div className='avatar_container'>
                        <div className='left'></div>
                        <div className='middle' onClick={onClickAvatar}>
                            <div className='middle-main' style={{ backgroundImage: `url(${selectedImage.url ?? ''})` }}
                            > {!selectedImage.url && <InlineSVG src={'/icons/Add.svg'} width={48} height={48} />}</div>
                        </div>
                        <div className='right'></div>
                    </div>
                    <input type={'file'} className='hidden' id="file" accept="image/*" onChange={onChangeAvatar} />
                    <input className='hidden' {...register("imgPortrait", { required: true })} />
                </div>
                <div className='fullname'>
                    <TextField
                        variant='standard'
                        placeholder="Nhập họ và tên"
                        fullWidth
                        {...register("fullName", { required: true })}
                    />
                </div>
                <div className='become'>
                    <label>Bạn muốn trở thành</label>
                    <input className='hidden' {...register("type", { required: true })} />
                    <div className='center-row align-between'>
                        <div className={`kol column mgr10 ${type === 'EMPLOYER' ? 'actived' : ''}`} onClick={() => setType('EMPLOYER')}>
                            <div className='icon'>
                                <InlineSVG src={type === 'EMPLOYER' ? '/icons/Role_actived.svg' : '/icons/Role.svg'} width={48} height={53} />
                                {type === 'EMPLOYER' &&
                                    <div className='checked'>
                                        <InlineSVG src={'/icons/Checked.svg'} width={20} height={20} />
                                    </div>
                                }
                            </div>
                            <span>Người thuê KOL</span>
                        </div>
                        <div className={`kol column ${type === 'KOL' ? 'actived' : ''}`} onClick={() => setType('KOL')}>
                            <div className='icon'>
                                <InlineSVG src={type === 'KOL' ? '/icons/Role_actived.svg' : '/icons/Role.svg'} width={48} height={53} />
                                {type === 'KOL' &&
                                    <div className='checked'>
                                        <InlineSVG src={'/icons/Checked.svg'} width={20} height={20} />
                                    </div>
                                }
                            </div>
                            <span>Trở thành KOL</span>
                        </div>
                    </div>
                </div>
                <Button variant="outlined" className='btn-custom-kol' type='submit' onClick={handleSubmit(onSave)}>
                    Lưu lại
                </Button>
            </form>
        </div>
    );
};

export default UpdateInfo;