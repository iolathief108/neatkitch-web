export const apiBase = '/api/'

export const getImageUrl = (id: number) => {
    return apiBase + 'im/' + id
}

export const initFront = () => {

}

export let perPage = 5;

export const changePerPage = (newPerPage: number) => {
    perPage = newPerPage;
}



export const isDevelopment = true;
export const devPort = 3000;
//todo: important this should be true for production
export const isForceSMS = false;
export const isValidateSMS = false;

export const mobilePrefix = '+65';

export const senderEmail = 'info@anclanka.lk';
export const senderEmailName = 'ANC Lanka';

export const newOrderEmail = 'iolathief108@gmail.com'

export const disableEmail = true;

// tawkto api keys
export const tawkConfig = {
    tawkId: '1fbdj5c53',
    propertyId: '60fcb901649e0a0a5ccdcdf6',
}
