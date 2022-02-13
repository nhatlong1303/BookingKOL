import Head from 'next/head';
import Config from '../../config';
interface Props {
    icon: any,
    keywords: string,
    description: string,
    title: string,
    url: string,
    image: any
}

const Meta = (props: Props) => {
    const {
        icon = '/icon-app.png',
        keywords = 'Modena',
        description = "Modena",
        title = 'Modena',
        url = Config.env.url,
        image = Config.env.url + '/public_1.jpeg'
    } = props;
    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <title>{title}</title>
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta httpEquiv="content-language" content="vi" />
            <meta name="keywords" content={keywords} />
            <meta name="news_keywords" content={keywords} />
            <meta name="description" content={description} />
            <meta charSet="urf-8" />
            <link rel="icon" href={icon} />

            <meta property="og:site_name" content="TAKA" />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:keywords" content={keywords} />
            <meta property="og:type" content="website" />

            <meta property="twitter:url" content={url} />
            <meta property="twitter:image" content={image} />
            <meta property="twitter:card" content={image} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
        </Head>
    );
}

export default Meta;