import React, { useState, memo } from 'react';
import Image from "next/image";

interface Props {
    src?: any,
    alt?: string,
    width: any,
    height: any,
    objectFit?: any,
    layout?: any,
    blurDataURL?: string,
    placeholder: any
}
const ImageWithFallBack = (props: Props) => {
    const { src, alt = '', width, height, objectFit = 'cover', layout = 'responsive', blurDataURL, placeholder = 'blur' } = props;
    const [srcError, setSrcError] = useState<any>(null);
    console.log(1)
    return (
        <Image
            src={srcError ?? (src ?? '/images/no_image.png')}
            alt={alt}
            width={width}
            height={height}
            objectFit={objectFit}
            layout={layout}
            blurDataURL={blurDataURL}
            placeholder={placeholder}
            onError={(e) => {
                if (e.type === 'error') setSrcError('/images/no_image.png')
            }}
        />
    );
};

export default memo(ImageWithFallBack);