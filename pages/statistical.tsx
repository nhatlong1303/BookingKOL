import React from 'react';
import { GetStaticProps } from 'next';

const statistical = () => {
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
export default statistical;