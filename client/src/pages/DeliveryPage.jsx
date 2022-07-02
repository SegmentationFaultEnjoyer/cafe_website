require('../../../public/pages/DeliveryPage.css');

function DeliveryPage() {

    return (
        <div className='delivery-page disable-interactions'>
            <div className='delivery-title-container'>
                <h1>ДОСТАВКА</h1>
                <h1>{new Array(150).fill('.').map((el, i) => i == 15 ? <i className="fa fa-bicycle" ></i> : el)}</h1>
                <h1>ОПЛАТА</h1>
            </div>
            <div className='delivery-info-container'>
                <div>
                    <p><b>Безкоштовна</b> доставка при замовленні <b>від 600 грн.</b> <br /><br />
                        Якщо сума замовлення до 600 грн, то вартість доставки <b>за тарифами</b> служби <b>таксі</b>, 
                        сплачується <b>гостем водію</b> при <b>отриманні</b> замовлення.
                    </p>
                </div>
                <div>
                    <p><b>WayForPay</b>  <br /><br />
                    Розраховуйтесь онлайн через сервіс WayForPay. 
                    Легко карткою, Apple Pay, Google Pay або ж Privat Pay.
                    </p>
                </div>
                <div>
                    <p>
                    Всі замовлення готуються та відправляються з кав'ярні за адресою <b>Хорватська 15</b>.
                    Замовлення доставляються <b>в межах Львова</b>. <br /><br />
                    Ми не маємо власних кур'єрів, тому <b>доставка не здійснюється на поверх</b>. 
                    Замовлення можна забрати лише безпосередньо у водія.
                    </p>
                </div>
                <div>
                    <p>
                    <b>Банківський переказ</b> <br /><br />
                    Номер картки пришлемо SMS, або в Telegram,Viber. 
                    Після 100% оплати, замовлення буде готуватися.
                    </p>
                </div>
            </div>
        </div>
    )
}

module.exports = DeliveryPage;