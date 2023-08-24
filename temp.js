// const PrismaClient = require('@prisma/client').PrismaClient;

// @ts-ignore
// let prisma = new PrismaClient();

// prisma.order.findMany({}).then(orders => {
//     console.log(orders);
// });
// prisma.order.delete({
//     where:{
//         id:18
//     }
// }).then((order) =>{
//     console.log(order);
// }).catch((error) =>{
//     console.log(error);
// } )

// prisma.orderMeta.deleteMany().then((orderMeta) => {
//     console.log(orderMeta);
//     prisma.orderItem.deleteMany().then((orderMeta) => {
//         console.log(orderMeta);
//
//         prisma.order.deleteMany().then((orderMeta) => {
//             console.log(orderMeta);
//         }).catch((error) => {
//             console.log(error);
//         });
//
//     }).catch((error) => {
//         console.log(error);
//     });
// }).catch((error) => {
//     console.log(error);
// });


// console.log(orders);


function addSpace(str) {
  // add space between all characters
    return str.split('').join(' ');
}

console.log('zoho user', process.env.ZOHO_USER);
console.log('zoh', addSpace(process.env.ZOHO_USER));
console.log('all', process.env);



// Import the necessary libraries for GooglePay and ApplePay integration
const GooglePay = require('google-pay');
const ApplePay = require('apple-pay');

// Set up the payment gateway configurations
const googlePayConfig = {
    merchantId: 'XXXXXXXXXX',
    merchantName: 'Your Merchant Name',
    merchantOrigin: 'https://your-merchant-origin.com'
};

const applePayConfig = {
    merchantId: 'XXXXXXXXXX',
    merchantName: 'Your Merchant Name',
    merchantCapabilities: ['supports3DS'],
    merchantCountryCode: 'US'
};

// Initialize the GooglePay and ApplePay payment gateways
const googlePay = new GooglePay(googlePayConfig);
const applePay = new ApplePay(applePayConfig);

// Set up the payment request for GooglePay
const googlePayPaymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
        {
            type: 'CARD',
            parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA']
            },
            tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                    gateway: 'example',
                    gatewayMerchantId: 'exampleGatewayMerchantId'
                }
            }
        }
    ],
    transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPrice: '100.00',
        currencyCode: 'USD'
    },
    merchantInfo: {
        merchantName: 'Your Merchant Name'
    }
};

// Set up the payment request for ApplePay
const applePayPaymentRequest = {
    merchantIdentifier: 'your-merchant-id',
    supportedNetworks: ['visa', 'masterCard', 'amex'],
    merchantCapabilities: ['supports3DS'],
    countryCode: 'US',
    currencyCode: 'USD',
    paymentSummaryItems: [
        {
            label: 'Total',
            amount: '100.00'
        }
    ]
};

// Implement the payment gateway integration in a function
async function initiatePayment(paymentMethod) {
    let paymentResponse;
    if (paymentMethod === 'googlePay') {
        paymentResponse = await googlePay.loadPaymentData(googlePayPaymentRequest);
    } else if (paymentMethod === 'applePay') {
        paymentResponse = await applePay.createPayment(applePayPaymentRequest);
    } else {
        throw new Error('Invalid payment method');
    }

// Handle the payment response and process the payment
    if (paymentResponse.status === 'SUCCESS') {
// Process the payment with the payment response data
    } else {
// Handle payment failure
    }
}

// Call the initiatePayment function with the desired payment method
initiatePayment('googlePay');
initiatePayment('applePay');
