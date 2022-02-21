import React, { useState, useContext, useMemo, useEffect } from 'react';
import Modal from '../common/modal/modal';
import TabContent, { TabPanel } from '../common/tabs/tabContent';
import { Tabs, Tab } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SignUp from './signUp';
import SignIn from './signIn';
import ResizePageContainer from '../common/resizePageContainer';
import { ResizeContext } from '../common/context/context';


const useStyle = makeStyles((theme: any) => ({
    auth: {
        [theme.breakpoints.down("lg")]: {
            '& .MuiTabs-flexContainer button': {
                margin: '5px 0 !important',
            }
        },
        '& .MuiPaper-root': {
            borderRadius: 16,
            '& .MuiDialogContent-root': {
                padding: 0,
                minHeight: 500,
                '& .MuiTabs-root': {
                    borderBottom: '1px solid' + theme.palette.common.Neutral.Smoke,
                    '& .MuiTabs-indicator': {
                        backgroundColor: theme.palette.common.Brand.Orange,
                    },
                    '& .MuiTabs-flexContainer button': {
                        margin: '12px 0',
                        width: '50%',
                        color: theme.palette.common.Brand.Orange,
                        textTransform: 'initial',
                        '&:first-of-type': {
                            borderRight: '1px solid' + theme.palette.common.Neutral.Smoke,
                        },
                    }
                }
            }
        },
        '& .text-field': {
            backgroundColor: theme.palette.common.Neutral.Smoke
        }
    },
    general: {
        padding: '48px 10px',
        textAlign: 'center',
        margin: 'auto',
        [theme.breakpoints.down("lg")]: {
            '& .other': {
                marginTop: '30px !important'
            }
        },
        [theme.breakpoints.up("sm")]: {
            '& .form-hook ': {
                width: 400,
            }
        },
        '& .title': {
            padding: '0 15%',
            marginBottom: 32,
            [theme.breakpoints.down("sm")]: {
                padding: '0 20px',
            },
            '& label': {
                color: theme.palette.common.Ink.Dark,
                fontSize: 32,
                fontWeight: 500
            },
            '& span': {
                color: theme.palette.common.Ink.Gray,
                fontSize: 16,
                fontWeight: 400
            }
        },
        '& .other': {
            justifyContent: 'center',
            marginTop: 48,
            '& span': {
                color: theme.palette.common.Ink.Gray,
            },
            '& div': {
                color: theme.palette.common.Brand.Orange,
            }
        },
        '& .form-hook': {
            margin: 'auto',
            '& .text-field': {
                marginBottom: 16,
                '&:focus': {
                    border: '1px solid' + theme.palette.common.Brand.Orange,
                },
                '& .MuiInputLabel-formControl': {
                    color: theme.palette.common.Brand.Orange,
                    fontSize: 12
                },
                '& .MuiFormHelperText-root': {
                    position: 'absolute',
                    bottom: -22,
                    color: theme.palette.common.Denotative.Error
                },
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        borderColor: theme.palette.common.Brand.Orange + ' !important',
                    },
                },
            },
            '& .btn-login': {
                backgroundColor: theme.palette.common.Brand.Orange,
                color: theme.palette.common.Neutral.White,
                width: '100%',
                marginTop: 16
            },

        }
    },
    error: {
        backgroundColor: 'rgba(245, 108, 108, 0.1)',
        color: theme.palette.common.Denotative.Error,
        fontSize: 14,
        marginBottom: -20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15px 0',
    }
}))
interface Props {
    onClose: (e: boolean) => void,
    classes?: any,
}
const Auth = (props: Props) => {
    const { onClose } = props;
    const classes = useStyle();
    return (
        <ResizePageContainer>
            <Component classes={classes} onClose={onClose} />
        </ResizePageContainer>
    );
};


const Component = (props: Props) => {
    const { onClose, classes } = props;
    const [tab, setTab] = useState(0);
    const deviceSize = useContext(ResizeContext);
    const [isVerify, setIsverify] = useState('');

    useEffect(() => {
        if (tab) {
            setIsverify('')
        }
    }, [tab])

    const col = useMemo(() => {
        if (deviceSize === 'xl') {
            return 'sm';
        } else {
            return 'xs'
        }
    }, [deviceSize])
    return (
        <Modal
            width={col}
            title={''}
            onClose={() => onClose(false)}
            open={true}
            className={classes.auth}
        >
            <Tabs
                value={tab}
                onChange={(e, value) => setTab(value)}
            >
                <Tab value={0} label={'Tạo tài khoản'} />
                <Tab value={1} label={'Đăng nhập'} />
            </Tabs>
            <TabContent
                activeKey={tab}
            >
                <TabPanel value={tab} index={0}>
                    {!tab && <SignUp classesProp={classes} setTab={setTab} setIsverify={setIsverify} isVerify={isVerify} onClose={onClose} />}</TabPanel>
                <TabPanel value={tab} index={1}>
                    {tab && <SignIn classesProp={classes} setTab={setTab} setIsverify={setIsverify} onClose={onClose} />}</TabPanel>
            </TabContent>
        </Modal>
    )
}

export default Auth;