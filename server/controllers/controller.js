const {path} = require('../helpers/components');
const DataBase = require('../mongodb/db');
const bot = require("../app/bot/bot");

const createOrder = require("../app/liqpay/pay");
const liqpay = require('../app/liqpay/lib/liqpay');

exports.ShowMainPage = function(req, resp) {
    resp.sendFile(path.join(__dirname, '../..', 'views', 'index.html'));
}

exports.GetItems = async function(req, resp) {
    let products = await DataBase.getProducts();
    resp.json({products});
}

exports.GetLocationPhotos = async function(req, resp) {
    let photos = await DataBase.getMany({}, {_id: 0}, 'location_photo');
    photos = photos.map(el => el.photo);
    resp.json(photos);
}
// function getStatus(order_id){
//     return new Promise(resolved, rejected, () => {
//         let interval_id = setInterval(async () => {
//             await liqpay.api("request", {
//                 "action"   : "status",
//                 "version"  : "3",
//                 "order_id" : order_id
//                 }, function( json ){
//                 if(json.status = "ok")
//                 clearInterval(interval_id);
//                 resolved("succsec");
//                 });
            
//         }, 4000);
//     })
// }

exports.PostOrder = async function(req, resp) {
    // await liqpay.api("request", {
    //     "action"   : "data",
    //     "version"  : "3",
    //     "order_id" : order_id,
    //     "info"     : info
    //     }, function( json ){
    //     console.log( json.status );
    //     });
    //await getStatus(req.body.order_id);
    try {
        await bot.messageBroadcaster(req.body);
        resp.json({success: true});
    } catch (error) {
        resp.json({success: false});
    }
}

exports.GetPayBtn = async function(req, resp) {
    const {amount, description, order_id, info} = req.body;
    
    const paymentInfo = createOrder(amount, description, order_id, info);
    
    resp.json(paymentInfo);    
}