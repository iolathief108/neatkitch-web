import {isSubdomain} from './utils';


export const apiBase = '/api/';

export const getImageUrl = (id: number) => {
    return apiBase + 'im/' + id;
};

export const initFront = () => {

};

export let perPage = 10;

export const changePerPage = (newPerPage: number) => {
    perPage = newPerPage;
};

let isDevelopment1 = false;
let isStaging1 = false;


// initialilze the environment
if (typeof window === 'undefined') {
    isDevelopment1 = process.env.NODE_ENV === 'development' || process.env.ENV === 'development';
    // @ts-ignore
    isStaging1 = process.env.ENV === 'staging' || process.env.NODE_ENV === 'staging';
    if (isStaging1) {
        isDevelopment1 = false;
    }
} else {
    let url = window.location.href;
    if (url.includes('localhost')) {
        isDevelopment1 = true;
    } else if (url.includes('192')) {
        isDevelopment1 = true;
    } else {
        isDevelopment1 = false;
    }

    if (url.includes('staging')) {
        isStaging1 = true;
        isDevelopment1 = false;
    } else if (isSubdomain(url)) {
        isStaging1 = true;
        isDevelopment1 = false;
    } else {
        isStaging1 = false;
        isDevelopment1 = false;
    }
}

export const isDevelopment = isDevelopment1 === undefined ? false : isDevelopment1;
export const isStaging = isStaging1 === undefined ? false : isStaging1;


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
