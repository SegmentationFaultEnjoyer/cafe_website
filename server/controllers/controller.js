const {path} = require('../helpers/components');
const DataBase = require('../mongodb/db');
const bot = require("../app/bot/bot");
const crypto = require('crypto');
require("dotenv").config();

exports.MD5Secure = function(req, resp){
    const str = req.body.str;
    const key = process.env.SECRET_WAYFORPAY;
    const hash =  crypto.createHmac('md5', key).update(str).digest('hex');
    resp.json({result: hash});
}

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

exports.ProcessToBot = async function(req, resp) {
    try {
        console.log("wtf");
        await bot.messageBroadcaster(req.body);
        resp.json({success: true});
    } catch (error) {
        console.log(error);
        resp.json({success: false});
    }
}

exports.AddOrder = async function(req, resp) {
    let res = await DataBase.addOne(req.body.order, 'orders');

    resp.json({success: res != 1, order_id: res});
}


exports.DeleteOrder = async function(req, resp) {
    let id = new require('mongodb').ObjectId(req.body.id);
    
    let res = await DataBase.deleteOne({_id: id}, 'orders');

    resp.json({success: res == 0});
}