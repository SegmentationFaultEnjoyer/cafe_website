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
            
            await bot.telegram.sendMessage(userID, parsedMessage, { parse_mode: 'HTML' });
        }
        console.log(parsedMessage)
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
        fs.writeFileSync(join(__dirname, "persons.json"), JSON.stringify(jsonObj));
        ctx.reply('Ласкаво просимо до команди');
        return;
    }
    ctx.reply("З поверненням");
}




function parsingMessage(message) {
    let str = "";
    let count = 1;
    str += `<b>Замовлення</b> ${message.order_id}\n\n`;
    console.table(message);
    for (let i of message.contains) {
        
        
        str += `${count}. <u>${i.name}</u> - <i>${i.amount} шт.</i> \n`;
        str += `Ціна: <i> ${i.price} грн</i>  \n`;
        
        if (i.extras != null) {
            str += "Додатки: \n";
            for (let extraItem of i.extras) {
                str += `\t\t•<i>${extraItem.name} ${extraItem.amount} шт. 💴 ${extraItem.price} грн </i>\n`;
            }

        }
        if (i.option != null && i.option.length != 0) {
            let tmpstr = "";
            for (let opt of i.option) {
                tmpstr +=`\t\t•<i>${opt.name}: ${opt.pickedOption}</i>\n`;
            }
            str += `Опції:\n${tmpstr}`;
        }
        str += `Вартість: <i>${i.totalPrice}</i> грн\n`
        str += "=========================" + '\n';
        count++;
    }
    const orderPayMethod = message.payment ? "переказ на картку" : "здійснена на сайті";

    str += `Спосіб оплати: <b>${orderPayMethod}</b> \n`;
    str += `Загальна вартість: <b>${message.totalPrice} грн </b> 💰 \n\n`;

    str += "<b>Інформація про замовника</b>\n";
    str += "Ім'я: " + message.customerInfo.name + "\n";
    str += "Номер телефону: " + message.customerInfo.phoneNumber + "\n";
    str += "Адреса: " + message.customerInfo.addres;


    return str;

}