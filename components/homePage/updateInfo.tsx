import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import InlineSVG from "react-inlinesvg";
import { TextField, Button } from '@mui/material';
import { useForm } from "react-hook-form";
import Config from '../../config';

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
            marginBottom: Config.marginBottmScale,
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            '& .avatar_container': {
                width: Config.screenMac ? 162 : 192,
                height: Config.screenMac ? 162 : 192,
                display: 'flex',
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
            },
            '& .left': {
                background: theme.palette.common.Gradient.Sunset,
                width: Config.screenMac ? 108 : 128,
                height: Config.screenMac ? 108 : 128,
                borderRadius: '50%',
                position: 'absolute',
                left: 0,
                bottom: 0,
                zIndex: 1
            },
            '& .right': {
                background: theme.palette.common.Gradient.Sunshine,
                width: Config.screenMac ? 108 : 128,
                height: Config.screenMac ? 108 : 128,
                borderRadius: '50%',
                position: 'absolute',
                right: 0,
                top: 0,
                zIndex: 1
            },
            '& .middle': {
                backgroundColor: theme.palette.common.Neutral.White,
                width: Config.screenMac ? 140 : 160,
                height: Config.screenMac ? 140 : 160,
                borderRadius: '50%',
                boxShadow: '0px 3px 8px rgba(102, 102, 102, 0.24)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 2,
                '& .middle-main': {
                    backgroundColor: theme.palette.common.Neutral.Smoke,
                    width: Config.screenMac ? 130 : 150,
                    height: Config.screenMac ? 130 : 150,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }
            }
        },
        '& .fullname': {
            marginBottom: Config.marginBottmScale,
            '& input': {
                textAlign: 'center',
                fontWeight: 500,
                fontSize: Config.screenMac ? 18 : 32
            }
        },
        '& .become': {
            color: theme.palette.common.Ink.Dark,
            textAlign: 'center',
            marginBottom: Config.marginBottmScale,
            padding: '0 10px',
            '& label': {
                fontSize: Config.screenMac ? 16 : 20,
                marginBottom: Config.marginBottmScale
            },
            '& .kol': {
                cursor: 'pointer',
                width: Config.screenMac ? 147 : 167,
                height: Config.screenMac ? 147 : 167,
                borderRadius: 24,
                boxShadow: '0px 2px 16px rgba(158, 158, 158, 0.16)',
                justifyContent: 'center',
                '& span': {
                    fontSize: Config.screenMac ? 14 : 16,
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
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedImage, setSelectedImage] = useState<any>({ file: null, url: null });
    const [become, setBecome] = useState('');

    const onSave = (e: any) => {

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
    console.log(errors)
    return (
        <div className={`${classes.updateInfo} updateInfo`}>
            {!Config.isEmpty(errors) && <div className={classes.error}><InlineSVG src={'/icons/Error.svg'} width={13} height={13} />
                &nbsp;&nbsp;Vui lòng nhập đầy đủ thông tin!</div>}
            <form encType="multipart/form-data">
                <div className='avatar' style={{ marginTop: !Config.isEmpty(errors) ? 32 : 0 }}>
                    <div className='avatar_container'>
                        <div className='left'></div>
                        <div className='middle' onClick={onClickAvatar}>
                            <div className='middle-main' style={{ backgroundImage: `url(${selectedImage.url})` }}
                            ><InlineSVG src={'/icons/Add.svg'} width={48} height={48} /></div>
                        </div>
                        <div className='right'></div>
                    </div>
                    <input type={'file'} className='hidden' id="file"  {...register("avatar", { required: true })}
                        accept="image/*" onChange={onChangeAvatar} />
                </div>
                <div className='fullname'>
                    <TextField
                        variant='standard'
                        placeholder="Nhập họ và tên"
                        fullWidth
                        {...register("fullname", { required: true })}
                    />
                </div>
                <div className='become'>
                    <label>Bạn muốn trở thành</label>
                    <div className='center-row align-between'>
                        <div className={`kol column mgr10 ${become === 'EMPLOYER' ? 'actived' : ''}`} onClick={() => setBecome('EMPLOYER')}>
                            <div className='icon'>
                                <InlineSVG src={become === 'EMPLOYER' ? '/icons/Role_actived.svg' : '/icons/Role.svg'} width={48} height={53} />
                                {become === 'EMPLOYER' &&
                                    <div className='checked'>
                                        <InlineSVG src={'/icons/Checked.svg'} width={20} height={20} />
                                    </div>
                                }
                            </div>
                            <span>Người thuê KOL</span>
                        </div>
                        <div className={`kol column ${become === 'KOL' ? 'actived' : ''}`} onClick={() => setBecome('KOL')}>
                            <div className='icon'>
                                <InlineSVG src={become === 'KOL' ? '/icons/Role_actived.svg' : '/icons/Role.svg'} width={48} height={53} />
                                {become === 'KOL' &&
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