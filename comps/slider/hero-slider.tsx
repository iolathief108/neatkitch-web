import {useSnapshot} from 'valtio';
import frontState from '../../states/front';
import Slider, {Settings} from '@ant-design/react-slick';
import {isDevelopment} from '../../lib/config';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import {useHasHydrated} from '../../lib/utils';


type ItemProps = {
    url: string
}
const Item = ({url}: ItemProps) => {
    return (
        <div style={{
            // width: '100%',
            height: '100%',
        }}>
            <img
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
                src={url}
                onLoad={() => {
                    frontState.mainBannerLoaded = true;
                }}
                onLoadStart={() => {
                    setTimeout(() => {
                        frontState.mainBannerLoaded = true;
                    }, 250);
                }}
            />
            {/*<Image src={url} height={getSliderImageHeight()} width={getSliderImageWidth()} objectFit={'cover'} onLoad={() => {*/}
            {/*    frontState.mainBannerLoaded = true;*/}
            {/*}}/>*/}
        </div>
    );
};


type CarouselProps = {
    urls: readonly string[]
}

export function Carousel(props: CarouselProps) {

    const {mainBannerLoaded, noDodLoaded} = useSnapshot(frontState);
    const hasHydrated = useHasHydrated();

    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: !isDevelopment,
        autoplaySpeed: 3000,
        // lazyLoad: 'progressive',
        lazyLoad: !hasHydrated ? undefined : ((mainBannerLoaded && noDodLoaded > 3) ? undefined : 'ondemand'),

        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                },
            },
        ],
    };

    const getUrls = () => {
        if (hasHydrated) {
            return props.urls;
        } else {
            return [props.urls[0]];
        }
    }

    return (
        <div style={{
            width: '100%',
        }}>
            <Slider {...settings}>
                {
                    getUrls().map((value, index) => <Item key={index} url={value}/>)
                }
            </Slider>
        </div>
    );
}

export function HomeSlider() {
    const {sliderImageUrls} = useSnapshot(frontState);
    const [ssr, setSsr] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setSsr(false);
        }, 5000);
    }, []);

    if (sliderImageUrls.length === 0) {
        return null;
    }

    return (
        <div className={'home-slider'}>
            {/*<Carousel urls={ssr ? [sliderImageUrls[0]] : sliderImageUrls}/>*/}
            <Carousel urls={sliderImageUrls}/>
        </div>
    );
}

function getSliderImageHeight() {
    if (typeof window === 'undefined') {
        return 0;
    }
    const width = window.innerWidth;
    if (width < 768) {
        return 200;
    }
    if (width < 992) {
        return 300;
    }
    return 400;
}

function getSliderImageWidth() {
    if (typeof window === 'undefined') {
        return 0;
    }
    const width = window.innerWidth;
    if (width < 768) {
        return 200;
    }
    if (width < 992) {
        return 300;
    }
    return 1200;
}
