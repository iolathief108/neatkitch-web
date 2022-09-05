import type {NextPage} from 'next';
import {Header} from '../comps/header/header';
import {Cats} from '../comps/cats/cats';
import {HomeSlider} from '../comps/slider/hero-slider';
import {Dod} from '../comps/dod/dod';
import {useEffect} from 'react';
import {prisma} from '../prisma';
import {Category} from '@prisma/client';
import frontState from '../states/front';
import {getImageUrl} from '../lib/config';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {Background} from '../comps/background';
import {Container} from '../comps/container';
import InfiniteScroll from 'react-infinite-scroller';
import {searchActions, searchState} from '../states/search';
import {ProductCard} from '../comps/pcard/product-card';
import {useSnapshot} from 'valtio';
import {getQuery, useHasHydrated} from '../lib/utils';
import pageState from '../states/page';
import {Loader} from '../comps/loader';
import profileState, {profileActions, useIsLoggedIn} from '../states/profile';


type Props = {
    categories: Category[];
    sliderImageUrls: string[];
    dods: {
        imageUrl: string;
        id?: number;
    }[];
}

const Home: NextPage<Props> = (props) => {

    const {products, totalPage, currentPage, relatedProducts} = useSnapshot(searchState);
    const hasHydrated = useHasHydrated();
    const {searchContainerMargin} = useSnapshot(frontState);

    useEffect(() => {

        if (profileState.id) {
            profileActions.refresh()
        }

        pageState.isCheckoutPage = true;

        // initialize category
        frontState.categories = props?.categories || [];
        // initialize slider
        frontState.sliderImageUrls = props?.sliderImageUrls || [];
        // initialize dod
        frontState.dods = props?.dods || [];


        searchActions.search(getQuery());

        return () => {
            searchActions.clear()
            pageState.isCheckoutPage = false;
        }
    }, []);

    return (
        <>
            <Header/>

            <Container className="container home-container">
                <Cats/>
                <HomeSlider/>
                <Dod/>
                <div className={'mt-5'}
                     style={{
                         marginLeft: hasHydrated ? searchContainerMargin : 0,
                         marginRight: hasHydrated ? searchContainerMargin : 0,
                     }}
                >

                    <h2 className={'text-center'}>Products</h2>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={() => {
                            searchActions.extend();
                        }}
                        hasMore={currentPage < totalPage}
                        loader={<Loader key={0} color={'#B60C0C'}/>}
                    >
                        {
                            products.map((product, index) => (
                                <ProductCard key={product.id} product={product}/>
                            ))
                        }
                    </InfiniteScroll>
                    <div className={'mb-5'}/>
                </div>

                <Background align={'left'} bg={'/static/images/left-bg4.png'}/>
                <Background align={'right'} bg={'/static/images/right-bg3.png'}/>
            </Container>
        </>
    );
};

export default Home;

export const getServerSideProps = async () => {
    // categories
    const categories: Category[] = await prisma.category.findMany();
    const documents = await prisma.document.findMany();
    const sliderImageUrls: string[] = [];
    const dods: {
        imageUrl: string;
        id?: number
    }[] = [];

    // loop through all documents
    for (let i = 0; i < documents.length; i++) {
        const document = documents[i];
        if (document.key.includes('slider')) {

            // remove slider prefix
            const key = document.key.replace('slider', '');

            // is key a number?
            if (Number.isInteger(Number(key))) {
                // convert key to number
                const numberKey = Number(key);
                let id: number = JSON.parse(document.value)?.value;
                if (id) {
                    sliderImageUrls[numberKey] = getImageUrl(id);
                }
            }
        }

        if (document.key.includes('dod')) {
            const key = document.key.replace('dod', '');
            if (Number.isInteger(Number(key))) {
                const numberKey = Number(key);
                let id: number = JSON.parse(document.value)?.value;
                if (id) {
                    // dods[numberKey] = {
                    //     imageUrl: getImageUrl(id),
                    // }
                    dods[numberKey] = {
                        ...(dods[numberKey] || {}),
                        imageUrl: getImageUrl(id),
                    };
                }
            }
        }
        if (document.key.includes('ProductId')) {
            let key = document.key.replace('ProductId', '');
            key = key.replace('dod', '');
            if (Number.isInteger(Number(key))) {
                const numberKey = Number(key);
                let id: number = JSON.parse(document.value)?.value;
                if (id) {
                    dods[numberKey] = {
                        ...(dods[numberKey] || {}),
                        id,
                    };
                }
            }
        }
    }

    // remove empty elements from sliderImageUrls
    for (let i = sliderImageUrls.length - 1; i >= 0; i--) {
        if (!sliderImageUrls[i]) {
            sliderImageUrls.splice(i, 1);
        }
    }

    // remove empty elements from dods
    for (let i = dods.length - 1; i >= 0; i--) {
        if (!dods[i] || !dods[i].imageUrl) {
            dods.splice(i, 1);
        }
    }

    return {
        props: {
            categories,
            sliderImageUrls,
            dods,
        },
    };
};
