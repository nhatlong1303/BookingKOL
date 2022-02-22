import React from 'react';
import { GetStaticProps, GetServerSideProps } from 'next';

const Post = (props: any) => {
    console.log(props)
    return (
        <div>
            post
        </div>
    );
};


export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const metaTags = {
        title: 'post'
    };
    return {
        props: {
            metaTags
        },

    };
}
export default Post;