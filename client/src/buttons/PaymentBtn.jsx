const request = require("../helpers/SendRequest");
const React = require('react');

async function  getBTN(){
    const rawData = await fet("/payBtn", "POST", {
        amount: `25`,
        description: "test jabki",
        order_id: 2,
    })

    console.log(rawData);
    return rawData;
}

const PaymentBtn = (props) => {
    
}

module.exports = PaymentBtn;