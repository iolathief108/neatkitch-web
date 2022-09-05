import {proxy} from 'valtio';
import {Product} from '@prisma/client';
import {getProduct, getProducts} from '../lib/fetcher';
import {isDevelopment, perPage} from '../lib/config';
import {devtools} from 'valtio/utils';
import frontState from './front';


interface Interface {
    products: Product[]
    search: {
        keywords?: string,
        categorySlug?: string,
        pinId?: number,
    },
    totalPage: number,
    currentPage: number,
    relatedProducts?: Product[],
}

export const searchState = proxy<Interface>({
    products: [],
    search: {},
    totalPage: 0,
    currentPage: 0,
});

devtools(searchState, {name: 'Search State', enabled: isDevelopment});
/*** ACTIONS ***/
export const searchActions = {
    paginate: async (page?: number) => {
        searchState.currentPage = page ? page : 1;

        // fetch products
        const {products, totalPage, error} = await getProducts({
            search: searchState.search.keywords,
            categorySlug: searchState.search.categorySlug,
            take: perPage,
            page: searchState.currentPage,
        });

        if (!error) {
            searchState.products = products;
            searchState.totalPage = totalPage;
        } else {
            console.log(error);
        }
    },
    nextPage: () => {
        if (searchState.currentPage < searchState.totalPage) {
            // searchState.currentPage++;
            searchActions.paginate(searchState.currentPage + 1);
        }
    },
    prevPage: () => {
        if (searchState.currentPage > 1) {
            // searchState.currentPage--;
            searchActions.paginate(searchState.currentPage - 1);
        }
    },
    extend: async () => {

        if (searchState.currentPage > searchState.totalPage) {
            return;
        }

        // fetch products
        const {products, totalPage, error} = await getProducts({
            search: searchState.search.keywords,
            categorySlug: searchState.search.categorySlug,
            take: perPage,
            page: searchState.currentPage + 1,
        });

        if (!error) {
            // exclude pinned product from the result
            const pinId = searchState.search.pinId;
            if (pinId) {
                const pinProduct = await getProduct(pinId);
                if (pinProduct) {
                    const pinIndex = products.findIndex(product => product.id === pinProduct.id);
                    if (pinIndex > -1) {
                        products.splice(pinIndex, 1);
                    }
                }
            }

            searchState.products = [...searchState.products, ...products];
            searchState.totalPage = totalPage;
            searchState.currentPage = searchState.currentPage + 1;
        } else {
            console.log(error);
            setTimeout(() => {
                searchActions.extend();
            })
        }
    },
    search: async ({keywords, categorySlug, pinId}: {keywords?: string, categorySlug?: string, pinId?: number}) => {
        searchState.currentPage = 1;

        // experimental
        searchState.relatedProducts = undefined;

        // get products
        const products = await getProducts({
            search: keywords,
            categorySlug,
            page: 1,
            take: perPage,
        });
        if (pinId) {
            const product = await getProduct(pinId);
            if (product) {
                products.products.unshift(product);
            }
        }

        if (!products.error) {
            searchState.search = {
                keywords: keywords || undefined,
                categorySlug: categorySlug || undefined,
                pinId: pinId || undefined,
            };
            searchState.products = products.products;
            searchState.totalPage = products.totalPage;

            // experimental
            if (keywords) {
                const firstProduct = products.products[0];
                if (firstProduct) {
                    const categoryId = firstProduct.categoryId;
                    const categorySlug = frontState.categories.find(c => c.id === categoryId)?.slug;

                    const relatedProducts = await getProducts({
                        categorySlug,
                        page: 1,
                        take: 10,
                    });

                    // remove first product
                    relatedProducts.products = relatedProducts.products.filter(p => p.id !== firstProduct.id);

                    if (!relatedProducts.error) {
                        searchState.relatedProducts = relatedProducts.products;
                    }
                }
            }


        } else {
            searchState.products = [];
            searchState.totalPage = 1;
        }
    },
    clear: async () => {
        searchState.search = {};
        searchState.products = [];
        searchState.totalPage = 0;
        searchState.currentPage = 0;
    },
};

