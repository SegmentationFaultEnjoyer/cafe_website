const {path} = require('../helpers/components');
const DataBase = require('../mongodb/db');
const bot = require("../app/bot/bot");

const createOrder = require("../app/liqpay/pay");

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

exports.PostOrder = async function(req, resp) {
    try {
        console.log("here");
        await bot.messageBroadcaster(req.body);
        resp.json({success: true});
    } catch (error) {
        resp.json({success: false});
    }
}

exports.GetPayBtn = async function(req, resp) {
    const {amount, description, order_id} = req.body;
    const paymentInfo = createOrder(amount, description, order_id)
    resp.json(paymentInfo);    
}