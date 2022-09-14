import {useSnapshot} from 'valtio';
import frontState from '../../states/front';
import Slider, {Settings} from 'react-slick';
import {useEffect} from 'react';


type ItemProps = {
    url: string
}
const Item = ({url}: ItemProps) => {
    return (
        <div style={{
            // width: '100%',
            height: '100%'
        }}>
            <img style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
            }} src={url}/>
        </div>
    );
};


type CarouselProps = {
    urls: readonly string[]
}

export function Carousel(props: CarouselProps) {
    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000,

        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            }
        ]
    };
    return (
        <div style={{
            width: '100%',
        }}>
            <Slider {...settings}>
                {
                    props.urls.map((value, index) => <Item key={index} url={value}/>)
                }
            </Slider>
        </div>
    );
}

export function HomeSlider() {
    const {sliderImageUrls} = useSnapshot(frontState);
    if (sliderImageUrls.length === 0) {
        return null;
    }

    return (
        <div className={'home-slider'}>
            <Carousel urls={sliderImageUrls}/>
        </div>
    );
}
