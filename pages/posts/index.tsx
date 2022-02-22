import React from 'react';
import { GetStaticProps } from 'next';
const index = () => {
    return (
        <div>
            posts
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const metaTags = {
        title: 'Tin tức'
    };
    return {
        revalidate: 30, //timer refresh after updated data
        props: { metaTags }
    }
}
export default index;