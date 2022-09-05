import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {apiBase, devPort, getImageUrl, isDevelopment} from './config';
import {Order, OrderItem, Product, User} from '@prisma/client';
import {useEffect, useState} from 'react';


export const Fetcher = axios.create({
    baseURL:  isDevelopment ? `http://localhost:${devPort}${apiBase}` : apiBase,
    timeout: 80000,

});

export const useFetcher = {

    Get<T = unknown, R = AxiosResponse<T>, D = any>(
        url: string, config?: AxiosRequestConfig<D> & {effect?: boolean}) {

        const [response, setResponse] = useState<AxiosResponse<T>>();
        const [error, setError] = useState<AxiosError>();
        const [loading, setLoading] = useState(true);

        const fetchData = async (url: string, config?: AxiosRequestConfig<D>) => {
            try {
                setLoading(true);
                const result = await Fetcher.get<T>(url, config);
                setResponse(result);
            } catch (err) {
                setError(err as AxiosError);
            } finally {
                setLoading(false);
            }
        };

        useEffect(() => {
            if (config?.effect === true) {
                fetchData(url, config);
            }
        }, []);

        useEffect(() => {
            if (config?.effect === true) {
                fetchData(url, config);
            }
        }, [url]);

        const fetch = () => {
            fetchData(url, config);
        };

        return {response, error, loading, fetch};
    },
    Post<T = unknown, R = AxiosResponse<T>, D = any>(
        url: string, config?: AxiosRequestConfig<D>) {

        const [response, setResponse] = useState<AxiosResponse<T>>();
        const [error, setError] = useState<string>();
        const [loading, setLoading] = useState(true);

        const fetchData = async (url: string, data?: D, config?: AxiosRequestConfig<D>) => {
            try {
                setError(undefined);
                setLoading(true);
                const result = await Fetcher.post<T>(url, data, config);
                setResponse(result);
            } catch (err) {
                // @ts-ignore
                const message = err?.response?.data?.error;

                setError(message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        const fetch = (data?: D) => {
            fetchData(url, data, config);
        };
        return {response, error, loading, fetch};
    },
};


type GetProductsParam = {search?: string, categorySlug?: string | string[], take?: number, page?: number}

export const getProducts = async (query: GetProductsParam): Promise<{products: Product[], totalPage: number, error?: string}> => {
    try {
        const res = await Fetcher.get<{products: Product[], totalPage: number}>('/products', {
            params: {
                search: query.search,
                category: typeof query.categorySlug === 'string' ? query.categorySlug : query.categorySlug?.[0],
                take: query.take,
                page: query.page,
            },
        });

        return res.data;
    } catch (e) {
        console.log(e);
        return {
            products: [],
            totalPage: 1,
            error: 'Error fetching products',
        };
    }
};

export const getProduct = async (id: number): Promise<Product | undefined> => {
    try {
        const res = await Fetcher.get<Product>(`/product/${id}`);
        return res.data;
    } catch (e) {
        console.log(e);
        return undefined;
    }
};

export const getProfile = async (): Promise<User | undefined> => {
    try {
        const res = await Fetcher.get<{user: User}>('/user/profile');
        return res.data.user;
    } catch (e) {
        console.log(e);
        return undefined;
    }
};

export const getBanners = async (): Promise<{bannerA?: string; bannerB?: string; bannerC?: string;}> => {
    try {
        const res = await Fetcher.get<{key: string, value: number}[]>('/admin/docs');

        const bannerAID = res.data.find(x => x.key === 'bannerA')?.value;
        let bannerAURL = bannerAID ? getImageUrl(bannerAID) : undefined;
        const bannerBID = res.data.find(x => x.key === 'bannerB')?.value;
        let bannerBURL = bannerBID ? getImageUrl(bannerBID) : undefined;
        const bannerCID = res.data.find(x => x.key === 'bannerC')?.value;
        let bannerCURL = bannerCID ? getImageUrl(bannerCID) : undefined;

        return {
            bannerA: bannerAURL,
            bannerB: bannerBURL,
            bannerC: bannerCURL,
        };

    } catch (e) {
        console.log(e);
        return {};
    }
};


// Admin Orders
type fd = Order & {items: (OrderItem & {product: {imageId: number} | null})[]}
// (Order & {items: (OrderItem & {product: {imageId: number} | null})[]})[]
export interface ResOrder extends fd {
    orderStatus: 'pending' | 'processing' | 'completed' | 'cancelled';
    paymentStatus: 'paid' | 'unpaid' | 'refunded';
}

type GetAdminOrdersParam = {
    sort?: 'date_asc' | 'date_desc';
    state?: 'all' | 'pending' | 'processing' | 'completed' | 'cancelled';
    take?: number,
    page?: number
}
export const getAdminOrders = async (query: GetAdminOrdersParam): Promise<{orders: ResOrder[], totalPage: number, error?: string}> => {
    try {
        const res = await Fetcher.get<{orders: ResOrder[], totalPage: number}>('/admin/orders', {
            params: {
                sort: query.sort,
                filter: query.state,
                take: query.take,
                page: query.page,
            },
        });

        return res.data;
    } catch (e) {
        console.log(e);
        return {
            orders: [],
            totalPage: 1,
            error: 'Error fetching orders',
        };
    }
};

type UpdateOrderStatusParam = {
    orderId: number;
    orderStatus?: 'pending' | 'processing' | 'completed' | 'cancelled';
    paymentStatus?: 'paid' | 'unpaid' | 'refunded';
}
export const updateAdminOrderStatus = async (param: UpdateOrderStatusParam): Promise<{success: boolean, error?: string}> => {
    try {
        await Fetcher.post<{success: boolean}>('/admin/order/', param);
        return {
            success: true,
        };
    } catch (e) {
        console.log(e);
        return {
            success: false,
            error: 'Error updating order status',
        };
    }
};


// User Orders
type GetUserOrdersParam = {
    take?: number,
    page?: number
}
export const getUserOrders = async (query: GetUserOrdersParam): Promise<{orders: ResOrder[], error?: string}> => {
    try {
        const res = await Fetcher.get<{orders: ResOrder[]}>('/order/list', {
            params: {
                take: query.take,
                page: query.page,
            },
        });

        return res.data;
    } catch (e) {
        console.log(e);
        return {
            orders: [],
            error: 'Error fetching orders',
        };
    }
}
