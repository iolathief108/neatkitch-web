import type {NextPage} from 'next';
import {Header} from '../comps/header/header';
import {Cats} from '../comps/cats/cats';
import {Container} from '../comps/container';
import {useSnapshot} from 'valtio';
import frontState from '../states/front';
import {useHasHydrated} from '../lib/utils';
import {Background} from '../comps/background';
import {Banner} from '../comps/banner';
import Head from 'next/head';


const About: NextPage = () => {
    const {bannerA, bannerB, bannerC} = useSnapshot(frontState);
    const hasHydrated = useHasHydrated();
    const {searchContainerMargin, windowWidth} = useSnapshot(frontState);

    return (
        <>
            <Header/>

            <Head>
                <title>
                    About Us - NeatKitch
                </title>
            </Head>
            <Container className="container search">
                <Cats/>
                <div className={'mt-5 text-left'} style={{
                    marginLeft: hasHydrated ? searchContainerMargin : 0,
                    marginRight: hasHydrated ? searchContainerMargin : 0,
                }}>
                    <h1>Get in touch with us!</h1>
                    <p>
                        NeatKitch is a singapore-based ecommerce company that specializes in selling the highest quality
                        vegetables, fruits, and other kitchen items. We take pride in sourcing our products from local
                        farms and purveyors, so our customers can enjoy the best of what Singapore has to offer.
                    </p>
                    <p>
                        Our team is passionate about good food and good design, and we are dedicated to providing an
                        exceptional customer experience. We are always happy to answer any questions or help with
                        orders.
                    </p>
                    <p>
                        Thank you for your interest in NeatKitch!
                    </p>

                </div>
            </Container>
            <Background withMargin align={'right'} bg={'/static/images/right-bg.jpg'}/>
            <Background align={'right'} bg={'/static/images/home-right-bg.png'}/>

            {
                windowWidth > 1200 &&
                <>
                    <Banner align={'left'} bannerLarge={bannerA}/>
                    <Banner align={'right'}
                            bannerTop={bannerB}
                            bannerBottom={bannerC}/>
                </>
            }
        </>
    );
};

export default About;
