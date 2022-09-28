import {isSubdomain} from './utils';


export const apiBase = '/api/';

export const getImageUrl = (id: number) => {
    return apiBase + 'im/' + id;
};

export const initFront = () => {

};

export let perPage = 5;

export const changePerPage = (newPerPage: number) => {
    perPage = newPerPage;
};

export let isDevelopment;
export let isStaging;


// if server
if (typeof window === 'undefined') {
    isDevelopment = process.env.NODE_ENV === 'development' || process.env.ENV === 'development';
    // @ts-ignore
    isStaging = process.env.ENV === 'staging' || process.env.NODE_ENV === 'staging';
} else {
    let url = window.location.href;
    if (url.includes('localhost')) {
        isDevelopment = true;
    } else if (url.includes('192')) {
        isDevelopment = true;
    } else {
        isDevelopment = false;
    }

    if (url.includes('staging')) {
        isStaging = true;
        isDevelopment = false;
    } else if (isSubdomain(url)) {
        isStaging = true;
        isDevelopment = false;
    } else {
        isStaging = false;
    }
}


export const devPort = 3000;
export const isForceSMS = !isDevelopment;
export const isValidateSMS = isDevelopment || isStaging;

export const mobilePrefix = '+65';

export const disableEmail = isDevelopment;

// tawkto api keys
export const tawkConfig = {
    tawkId: '1fbdj5c53',
    propertyId: '60fcb901649e0a0a5ccdcdf6',
};
