import React, { useState } from 'react';
import Modal from '../common/modal/modal';
import TabContent, { TabPanel } from '../common/tabs/tabContent';
import { Tabs, Tab } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SignUp from './signUp';
import SignIn from './signIn';

const useStyle = makeStyles((theme: any) => ({
    auth: {
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
        [theme.breakpoints.up("sm")]: {
            '& .form-hook ': {
                width: 400,
            }
        },
        [theme.breakpoints.down("sm")]: {
            '& .form-hook ': {
                width: 300,
            },
        },
        '& .title': {
            padding: '0 141px',
            marginBottom: 32,
            [theme.breakpoints.down("sm")]: {
                padding: '0 60px',
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
    }
}))
interface Props {
    onClose: () => void
}
const Auth = (props: Props) => {
    const { onClose } = props;
    const classes = useStyle();
    const [tab, setTab] = useState(0);
    return (
        <Modal
            width='sm'
            title={''}
            onClose={onClose}
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
                <TabPanel value={tab} index={0}><SignUp classesProp={classes} setTab={setTab} /></TabPanel>
                <TabPanel value={tab} index={1}><SignIn classesProp={classes} setTab={setTab} /></TabPanel>
            </TabContent>
        </Modal>
    );
};

export default Auth;