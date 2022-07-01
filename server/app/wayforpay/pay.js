const WayForPay = require('wayforpay');
const wayforpay = new WayForPay(merchant_account, merchant_password);

const params = {
'merchantDomainName': 'app.wepster.com',
'merchantTransactionSecureType': 'AUTO',
'serviceUrl': 'http://yourdomain.com/wfp/return',
'orderReference': 'orderid001',
'orderDate': '14898322',
'amount': '1.00',
'currency': 'USD',
'productName': 'product name',
'productPrice': '2.00',
'productCount': "2",
'language': "ru",
};

const generatePurchaseUrl = wayforpay.generatePurchaseUrl(params);