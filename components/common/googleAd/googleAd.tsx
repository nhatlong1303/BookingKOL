import React, { useEffect } from 'react';
import Config from '../../../config/index';
// 'data-ad-format': 'fluid',
// 'data-ad-layout': 'in-article',
interface GoogleAdProps {
    className?: any,
    slot: string
    format?: 'auto' | 'fluid',
    layout?: string | 'in-article',
    responsive?: boolean
}


const GoogleAd = (props: GoogleAdProps) => {
    const { className, slot, format = 'auto', responsive = true, layout } = props;

    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error(err);
        }
    }, []);
    if (Config.env.development) return null;
    return (
        <ins
            className={`adsbygoogle ${className}`}
            style={{ display: 'block', textAlign: 'center', width: '100%', overflow: 'hidden' }}
            data-ad-client={Config.env.adsense}
            data-ad-slot={slot}
            data-ad-layout={layout}
            data-ad-format={format}
            data-full-width-responsive={responsive}
        />
    );
};

export default GoogleAd;