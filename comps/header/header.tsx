import SearchBox from './search-box';
import Link from 'next/link';
import {useSnapshot} from 'valtio';
import profileState from '../../states/profile';
import {useHasHydrated} from '../../lib/utils';
import {Breadcrumb} from './breadcrumb';
import React, {useEffect, useRef} from 'react';
import frontState from '../../states/front';
import {useRouter} from 'next/router';
import Head from 'next/head';


export function Header() {

    return <RealHeader/>;
}

let headerHeightBefore = 0;

function RealHeader() {
    const hasHydrated = useHasHydrated();
    const {id, firstName} = useSnapshot(profileState);
    const {headerHeight} = useSnapshot(frontState);
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // calculate header height
    const getHeaderHeight = () => {
        if (!ref.current) {
            return headerHeightBefore;
        }
        return ref.current.getBoundingClientRect().height;
    };

    useEffect(() => {
        frontState.headerHeight = getHeaderHeight();
        headerHeightBefore = getHeaderHeight();

        const interval = setInterval(() => {
            frontState.headerHeight = getHeaderHeight();
            if (frontState.headerHeight) {
                clearInterval(interval);
            }
        }, 100);

        // on resize
        window.addEventListener('resize', () => {
            frontState.headerHeight = getHeaderHeight();
        });

    }, []);

    return (
        <div ref={ref} className={'main-header-outer '
        + (headerHeight ? 'static' : '')
        }>
            <Head>
                <title>
                    NeatKitch - We have everything you need to make your kitchen perfect!
                </title>
            </Head>
            <div className={'containerx'}>
                <div className={'left'}>
                    <div className={'logo'}>
                        <Link href="/">
                            <img
                                src="/logo-white.png"
                                alt="logo"/>
                        </Link>
                        <Breadcrumb noRes={true}/>
                    </div>
                    <SearchBox/>
                </div>
                <div className={'right'}>
                    {
                        hasHydrated && (id !== undefined ? (
                            <Link href="/profile">
                                <a className={
                                    router.pathname === '/profile' ? 'active' : ''
                                }>
                                    {firstName || 'Profile'}
                                </a>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <a className={
                                    router.pathname === '/login' ? 'active' : ''
                                }>
                                    Login
                                </a>
                            </Link>
                        ))
                    }
                    <Link href="/cart">
                        <a className={
                            router.pathname === '/cart' ? 'active' : ''
                        }>
                            Cart
                        </a>
                    </Link>
                    <Link href="/contact">
                        <a className={
                            router.pathname === '/contact' ? 'active' : ''
                        }>
                            Contact
                        </a>
                    </Link>
                    <Link href={'/about'}>
                        <a className={
                            router.pathname === '/about' ? 'active' : ''
                        }>

                            About
                        </a>
                    </Link>

                    <span className={'hotlink'}>HOTLINE: +65 0000 000</span>
                    <Breadcrumb noRes={true}/>
                </div>
            </div>
        </div>
    );
}
