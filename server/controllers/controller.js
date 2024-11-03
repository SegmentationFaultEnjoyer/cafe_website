const {path} = require('../helpers/components');
const DataBase = require('../mongodb/db');
const bot = require("../app/bot/bot");
const crypto = require('crypto');
const MONTH = 30 * 24 * 60 * 60 * 1000;

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
        await bot.messageBroadcaster(req.body);
        resp.json({success: true});
    } catch (error) {
        console.log(error);
        resp.json({success: false});
    }
}

exports.AddOrder = async function(req, resp) {
    req.body.order.expireAt = new Date(Date.now() + 3 * MONTH);
    let res = await DataBase.addOne(req.body.order, 'orders');
    
    resp.json({success: res != 1, order_id: res});
}


exports.DeleteOrder = async function(req, resp) {
    let id = new require('mongodb').ObjectId(req.body.id);

    let res = await DataBase.deleteOne({_id: id}, 'orders');

    resp.json({success: res == 0});
}

/* 
type WayForPayResponse = {
  "merchantAccount": "tsikava_com_ua",
  "orderReference": "64b12e4aa23ea517344fd332",
  "merchantSignature": "79a9c521a9ff050bb4d97d6fe39a7822",
  "amount": 1,
  "currency": "UAH",
  "authCode": "667798",
  "email": "aboba@a.com",
  "phone": "0000000000",
  "createdDate": 1689333323,
  "processingDate": 1689333371,
  "cardPan": "53****2196",
  "cardType": "MasterCard",
  "issuerBankCountry": "Ukraine",
  "issuerBankName": "JSC \\"UNIVERSAL BANK\\"",
  "recToken": "",
  "transactionStatus": "Approved",
  "reason": "Ok",
  "reasonCode": 1100,
  "fee": 0.02,
  "paymentSystem": "card",
  "acquirerBankName": "WayForPay",
  "cardProduct": "debit",
  "clientName": "\\u041c\\u0410\\u0420\\u041a"
}
*/

exports.ConfirmOrder = async function(req, resp) {
    console.log('WAY FOR PAY RESPONSE')
    console.log(req.body);

    const wayforpayResp = JSON.parse(Object.keys(req.body)[0])

    try {
        let orderId = new require('mongodb').ObjectId(wayforpayResp.orderReference);

        const orderInfo = await DataBase.getOne({ _id: orderId }, {}, 'orders')

        console.log('ORDER INFO', orderInfo)

        if (!orderInfo) throw new Error('Order doesnt exist')

        await bot.messageBroadcaster({
           contains: orderInfo.contains,
           payment: orderInfo.payment,
           totalPrice: orderInfo.totalPrice,
           customerInfo: orderInfo.customerInfo,
           order_id: orderId,
        });

        const key = process.env.SECRET_WAYFORPAY;
        const orderConfirmTime = Date.now()
        const signature =  crypto.createHmac('md5', key).update(`${wayforpayResp.orderReference};accept;${orderConfirmTime}`).digest('hex');

        resp.json({
          orderReference: wayforpayResp.orderReference,
          status: 'accept',
          time: orderConfirmTime,
          signature,
        })

        console.log('SUCCESs!')
    } catch (error) {
        console.error(error.message)
        resp.sendStatus(500)
    }
}

/* 
type BotExpects = {
  contains: [ <--FROM DB
    {
      name: 'TEST',
      price: 1,
      amount: 1,
      extras: [
        { name: 'моцарела', amount: 2, price: 50 },
      ],
      option: [
        { name: 'Булка', pickedOption: 'бріош' },
      ],
      totalPrice: 1 <--FROM DB
    }
  ],
  payment: 1, <--FROM DB
  totalPrice: 1, <--FROM DB
  customerInfo: { name: 'TEST', phoneNumber: '0000000000', addres: 'NOWHERE222' },
  order_id: '64b1300a418be93f995099eb' <--FROM RESPONSE
}
*/