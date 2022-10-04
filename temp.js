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


console.log('zoho user', process.env.ZOHO_USER);
