
const PaymentButton = ({ value1, value2 }) => {
    return (
        <form method="POST" action="https://www.liqpay.ua/api/3/checkout" acceptCharset="utf-8">
            <input type="hidden" name="data" 
            value={value1} />
            <input type="hidden" name="signature" value={value2} />
            <div className='input-container'>
                <button type='submit' className='brown checkout-btn'>Оплатити</button>
            </div>
        </form>
    )
}

module.exports = PaymentButton;