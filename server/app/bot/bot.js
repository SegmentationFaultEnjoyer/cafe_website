const { Telegraf } = require('telegraf');
const fs = require('fs');
const { join } = require("path");
require("dotenv").config();


const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => {
    checkPersons(ctx);
})
bot.launch();
console.log("Bot started");



module.exports.messageBroadcaster = async function (message) {
    try {
        const rawData = fs.readFileSync(join(__dirname, "persons.json"));
        let jsonObj = JSON.parse(rawData);
        const parsedMessage = parsingMessage(message);
        for (let userID of jsonObj.users) {
            console.log(userID);
            await bot.telegram.sendMessage(userID, parsedMessage);
        }
        return "ok";
    } catch (err) {
        throw err;
    }
}

function checkPersons(ctx) {
    const rawData = fs.readFileSync(join(__dirname, "persons.json"));
    let jsonObj = JSON.parse(rawData);
    if (jsonObj.users.length === 0 || !jsonObj.users.includes(ctx.update.message.chat.id)) {
        jsonObj.users.push(ctx.update.message.chat.id);
        console.log(jsonObj);
        fs.writeFileSync(join(__dirname, "persons.json"), JSON.stringify(jsonObj));
        ctx.reply('Ласкаво просимо до команди');
        return;
    }
    ctx.reply("З поверненням");
}



function parsingMessage(message) {
    let str = "";
    for (let i of message.contains) {
        str += "Назва:" + i.name + '\n';
        str += "Ціна: " + i.price + " грн" + '\n';
        str += "Кількість: " + i.amount + '\n';
        str += "Додатки: ";
        if (i.extras == null)
            str += "❌\n";
        else {
            str += "✅\n";
            // console.log(i.extras[0]);



            for (let extraItem of i.extras) {
                
                str += "\t\t•Назва добавки: " + extraItem.name + "\n";
                str += "\t\t•Кількість добавки: " + extraItem.amount + "\n";
                str += "\t\t•Ціна Добавки: " + extraItem.price + " грн" + "\n";

            }

        }
        if (i.option != null) {
            let tmpstr = "";
            for(let opt of i.option){
                tmpstr += opt + " ";
            }
            str += "Опції: " + tmpstr + "\n";
        } else {
            str += "Опції: " + "❌" + "\n";
        }

        str += "===============" + '\n';
    }
    const orderPayMethod = message.payment ? "Оплата переказом на картку" : "Оплата здійснена на сайті";

    str += "Спосіб оплати замовлення: " + orderPayMethod + "\n";
    str += "Ціна замовлення: " + message.totalPrice +" грн" +"\n\n";

    str += "Інформація клієнта\n";
    str += "Ім'я: " + message.customerInfo.name + "\n";
    str += "Номер телефону: " + message.customerInfo.phoneNumber + "\n";
    str += "Адреса: " + message.customerInfo.addres;


    return str;

}