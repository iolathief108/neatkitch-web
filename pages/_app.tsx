import 'normalize.css/normalize.css';
import '../styles/bootstrap/bootstrap.scss';
import '../styles/global/globals.scss';
import '/comps/header/header.scss';
import '/comps/cats/cats.scss';
import '../comps/slider/slider.scss';
import '../comps/dod/dod.scss';
import '../comps/cartsum/cart-summery.scss';
import '../comps/pcard/product-card.scss';
import '../comps/cartitem/cart-item.scss';
import '../comps/checksum/checksum.scss';
import '../comps/footer/footer.scss';
import type {AppProps} from 'next/app';
import {Sidebar} from '../comps/sidebar';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/brands.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import 'reactjs-popup/dist/index.css';





function MyApp({Component, pageProps}: AppProps) {
    // return <Component {...pageProps} />
    return (
        <>
            <Component {...pageProps} />
            <Sidebar/>
        </>
    );
}

export default MyApp;
