
const PaymentButton = ({ value1, value2 }) => {
    return (
        <form target="_blank" method="POST" action="https://www.liqpay.ua/api/3/checkout" acceptCharset="utf-8">
            <input type="hidden" name="data" 
            value={value1} />
            <input type="hidden" name="signature" value={value2} />
            <div className='input-container'>
                <button type='submit' target="_blank" className='brown checkout-btn'>Оплатити</button>
            </div>
        </form>
    )
}

module.exports = PaymentButton;