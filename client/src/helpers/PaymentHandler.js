const request = require('./SendRequest.js');

class PaymentHandler {
    constructor(order, afterPayCallback) {
        this.wayforpay = new Wayforpay();
        this.afterPayCallback = afterPayCallback;
        
        this.order = order;

        this.params = {
            merchantAccount: "test_merch_n1", //Тестовая хуйня
            merchantDomainName: "tsikava.com.ua",//Тестовый домен
            authorizationType: "SimpleSignature",
            merchantSignature: "c8e023631891ecbcb005725cf66550a2",// Тут должен быть хэш код тип MD5(StrForMD5(params));
            orderReference: `${order.order_id}`,//Уникальный id заказа
            orderDate: `${Date.now()}`,// Ну ты понял
            amount: `${order.totalPrice}`,// Общая сумма заказа
            orderTimeout: "49000",// Время для оплаты
            currency: "UAH",
            productName: order.contains.map(el => el.name),//Названия всех выбранных товаров
            productPrice: order.contains.map(el => {
                let extrasPrice = 0;

                if(el.extras) {
                    extrasPrice = el.extras.reduce((price, extra) => {
                        return price + extra.price * extra.amount;
                    }, 0)
                }
                 
                return `${extrasPrice + el.price}`;
            }),//Цена на каждый товар и не дай бог их сумма не совпадет с amount
            productCount: order.contains.map(el => `${el.amount}`), //Кол-во товаров Аналогично с productPrice
            clientFirstName: order.customerInfo.name,
            clientLastName: "Пупкин", //Нет блять, Иванов
            clientAddress: order.customerInfo.addres,
            defaultPaymentSystem: "card",
            clientPhone: order.customerInfo.phoneNumber,
            language: "UA"
        }
    }

    async pay() {
        const data = await request('/api/md5/Secure', 'POST', {str: this.StrForMD5(this.params)});

        const signature = data.result;
        this.params.merchantSignature = signature// Тут должен быть хэш код тип MD5(StrForMD5(params));
        
        this.wayforpay.run(this.params,
            //Заебись, чел оплатил
            function (response) {
                console.log("order info: ", this.order);
                console.log("PAYPAYPAY");
                console.log("this-",this);
                console.log(" this.afterPayCallback", this.afterPayCallback);
                this.afterPayCallback(this.order);
                
                //Шлем боту инфу
            },
            //Блять... чел даун: отменил
            async function (response) {
                console.log(response);
                let {success} = await request('/api/order', 'DELETE', {id: this.order.order_id});
                console.log(`order deleted: ${success}`);
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
        for (let i = 0; i < params.productPrice.length; i++) {
            if (params.productPrice.length == i + 1) {
                str += params.productPrice[i];
            }
            else {
                str += params.productPrice[i] + ';';
            }
        }
        return str;
    }
}


module.exports = PaymentHandler;