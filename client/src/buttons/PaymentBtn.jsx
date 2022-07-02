const request = require('../helpers/SendRequest.js');

class PaymentButton extends React.Component {
    constructor(props) {
        super(props);
        this.wayforpay = new Wayforpay();

        this.params = {
            merchantAccount: "test_merch_n1", //Тестовая хуйня
            merchantDomainName: "www.market.ua",//Тестовый домен
            authorizationType: "SimpleSignature",
            merchantSignature: "c8e023631891ecbcb005725cf66550a2",// Тут должен быть хэш код тип MD5(StrForMD5(params));
            orderReference: "3920irewfkpawd",//Уникальный id заказа
            orderDate: "1415379863",// Ну ты понял
            amount: "1547.36",// Общая сумма заказа
            orderTimeout: "49000",// Время для оплаты
            currency: "UAH",
            productName: ["Процессор Intel Core i5-4670 3.4GHz", "Память Kingston DDR3-1600 4096MB PC3-12800"],//Названия всех выбранных товаров
            productPrice: ["1000", "547.36"],//Цена на каждый товар и не дай бог их сумма не совпадет с amount
            productCount: ["1", "1"], //Кол-во товаров Аналогично с productPrice
            clientFirstName: "Вася",
            clientLastName: "Пупкин", //Нет блять, Иванов
            clientAddress: "пр. Гагарина, 12",
            defaultPaymentSystem: "card",
            clientPhone: "380631234567",
            language: "UA"
        }

        this.pay = this.pay.bind(this);
    }

    async pay() {
        const data = await request('/api/md5/Secure', 'POST', {str: this.StrForMD5(this.params)});

        const signature = data.result;
        this.params.merchantSignature = signature// Тут должен быть хэш код тип MD5(StrForMD5(params));
        
        this.wayforpay.run(this.params,
            //Заебись, чел оплатил
            function (response) {
                console.log(response);
                //Шлем боту инфу
            },
            //Блять... чел даун: отменил
            function (response) {
                console.log(response);
            },
            //Сука, он сидит на оплате и еще не оплатил
            function (response) {
                console.log(response);
            }
        );
    }

    StrForMD5(params) {
        let str = params.merchantAccount + ";" + params.merchantDomainName + ";" + params.orderReference + ";" + params.orderDate + ";" + params.amount + ";" + params.currency + ";";
        for (let i of params.productName) {
            str += i + ';';
        }
        for (let i of params.productCount) {
            str += i + ';';
        }
        for (let i of params.productPrice) {
            str += i + ';';
        }
        for (let i = 0; i < params.productPrice.length; i++) {
            if (params.productPrice.length == i) {
                str += i;
            }
            else {
                str += i + ';';
            }
        }
        return str;
    }

    render() {
        return (
            <div className='input-container'>
                <button type='submit' className='brown checkout-btn' onClick={this.pay}>Оплатити</button>
            </div>
    )
    }
}


module.exports = PaymentButton;