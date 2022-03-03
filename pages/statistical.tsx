import React from 'react';
import { GetStaticProps } from 'next';

const Statistical = () => {
    return (
        <div>
            statistical
        </div>
    );
};
export const getStaticProps: GetStaticProps = async () => {
    const metaTags = {
        title: 'Thống kê'
    };
    return {
        props: { metaTags }
    }
}
export default Statistical;