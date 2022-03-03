import React from 'react';
import { GetStaticProps } from 'next';
const Contact = () => {
    return (
        <div>
            contact
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const metaTags = {
        title: 'Liên hệ'
    };
    return {
        props: { metaTags }
    }
}
export default Contact;