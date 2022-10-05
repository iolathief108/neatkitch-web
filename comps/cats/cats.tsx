import {useSnapshot} from 'valtio';
import frontState from '../../states/front';
import {getImageUrl} from '../../lib/config';
import {Category} from '@prisma/client';
import {searchState} from '../../states/search';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import {getUrl} from '../../lib/utils';
import {useRouter} from 'next/router';
import Image from 'next/image';

function CategoryItem({
                          category,
                          loading,
                          setLoading,
                      }: {category: Category, loading: boolean, setLoading: (loading: boolean) => void}) {

    const router = useRouter();
    const {cat, key} = router.query;
    const {search} = useSnapshot(searchState);

    if (!category || !category.imageId) {
        return null;
    }

    const InnerItem = () => {
        if (!category?.imageId) {
            return null;
        }
        return (
            <>
                {/*<Image height={150} width={150} src={getImageUrl(category.imageId)} alt={category.name} className={'image'}/>*/}

                <img height={150} width={150} src={getImageUrl(category.imageId)} alt={category.name}
                     className={'image'}/>
                <div className={'name'}>{category.name}</div>
            </>
        );
    };

    if (search.categorySlug === category.slug) {
        return (
            <a className={'item active mx-3'} href={getUrl({categorySlug: category.slug, keywords: key})}>
                <InnerItem/>
            </a>
        );
    }

    return (
        // <Link href={getUrl({categorySlug: category.slug, keywords: key})}>
        <Link href={getUrl({categorySlug: category.slug})}>
            <a className={'item mx-3'}>
                <InnerItem/>
            </a>
        </Link>
    );
}

export function Cats() {
    const {categories} = useSnapshot(frontState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (categories.length > 0) {
            setLoading(false);
        }
    }, [categories]);

    if (loading && categories.length === 0) {
        return null;
    }

    return (
        <div className={'cats-outer'}>
            <div className={'wrap'}>
                <div className={'cats-inner'}>
                    {
                        categories?.map((category, index) => {
                            return (
                                <CategoryItem setLoading={setLoading} loading={loading} key={index}
                                              category={category}/>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}
