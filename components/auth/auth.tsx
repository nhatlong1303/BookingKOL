import React from 'react';
import Modal from '../common/modal/modal';

interface Props {
    onClose:()=>void
}
const Auth = (props:Props) => {
    const {onClose}=props;
    return (
        <div className='auth'>
            <Modal
                width='sm' 
                title={''}
                onClose={onClose}
                open={true}
            >
                sdsd
            </Modal>
        </div>
    );
};

export default Auth;