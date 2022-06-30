const reqest = require("../helpers/SendRequest");

async function  getBTN(){
    const rawData = await reqest("/getBtn", "GET", {
        amount: `25`,
        description: "test jabki",
        order_id: 2,
    })

    console.log(rawData);
}

const PaymentBtn = (props) => {
    const btn = getBTN();
    return (
        <div>
            {btn}
        </div>
    )
}