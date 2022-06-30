const LiqPay = require("./lib/liqpay");
require("dotenv").config();

const liqpay = new LiqPay(process.env.LIQPAY_PUBLIC_KEY, process.env.LIQPAY_PRIVATE_KEY);

exports.createOrderBTN =  (amount, description, order_id, action = "pay", currency = "UAH") => {
    return  liqpay.cnb_form({
        'action': action,
        'amount': `${amount}`,
        'currency': currency,
        'description': description,
        'order_id': order_id,
        'version': '3'
    });
}

