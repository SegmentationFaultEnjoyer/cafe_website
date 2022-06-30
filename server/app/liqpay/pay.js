const LiqPay = require("./lib/liqpay");
require("dotenv").config();

const liqpay = new LiqPay(process.env.LIQPAY_PUBLIC_KEY, process.env.LIQPAY_PRIVATE_KEY);

const createOrderBTN = (amount, description, order_id, action = "pay", currency = "UAH") => {
    const html =  liqpay.cnb_form({
        'action': action,
        'amount': `${amount}`,
        'currency': currency,
        'description': description,
        'order_id': order_id,
        'version': '3',
        //"server_url": "server response",
        //"result_url": "return to site for client"
    });

    return ParseHTML(html);
}

function ParseHTML(html) {
    let str1 = html;
    str1 = str1.split(`<form method="POST" action="https://www.liqpay.ua/api/3/checkout" accept-charset="utf-8"><input type="hidden" name="data" value="`)[1];
    let str2 = str1;
    str1 = str1.split(`" /><input type="hidden"`)[0];

    str2 = str2.split(`<input type="hidden" name="signature" value="`)[1];
    str2 = str2.split(`" /><input type="image"`)[0];
    return {value1: str1, value2: str2};
}
