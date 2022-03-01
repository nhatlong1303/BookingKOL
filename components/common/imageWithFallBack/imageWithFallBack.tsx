import React, { useState, memo, useRef } from 'react';
import Image from "next/image";

interface Props {
    src: any,
    alt?: string,
    width?: any,
    height?: any,
    objectFit?: any,
    layout?: any,
    blurDataURL?: string,
    placeholder?: any,
    fallBackSrc?: string
}
const ImageWithFallBack = (props: Props) => {
    const { src, alt = '', width, height, objectFit = 'cover', layout = 'responsive', blurDataURL, placeholder = 'blur',
        fallBackSrc = '/images/no_image.png' } = props;
    const [ImageSrc, setImageSrc] = useState<any>(src ?? fallBackSrc);
    
    return (
        <Image
            src={ImageSrc}
            alt={alt}
            width={width}
            height={height}
            objectFit={objectFit}
            layout={layout}
            blurDataURL={blurDataURL}
            placeholder={placeholder}
            onError={(e) => {
                if (e.type === 'error') setImageSrc(fallBackSrc)
            }}
        />
    );
};

export default memo(ImageWithFallBack);