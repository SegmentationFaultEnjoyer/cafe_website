const { Telegraf } = require('telegraf');
const fs = require('fs');
const {join} = require("path");
require("dotenv").config();


const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => {
    checkPersons(ctx);
})
bot.launch();
console.log("Bot started");



module.exports.messageBroadcaster = async function (message) {
    try {
        const rawData = fs.readFileSync(join(__dirname ,"persons.json"));
        let jsonObj = JSON.parse(rawData);
        for (let userID of jsonObj.users) {
            console.log(userID);
            await bot.telegram.sendMessage(userID, message);
        }
        return "ok";
    }catch(err){
        throw err;
    }    
}

function checkPersons(ctx) {
    const rawData = fs.readFileSync(join(__dirname ,"persons.json"));
    let jsonObj = JSON.parse(rawData);
    if (jsonObj.users.length === 0 || !jsonObj.users.includes(ctx.update.message.chat.id)) {
        jsonObj.users.push(ctx.update.message.chat.id);
        console.log(jsonObj);
        fs.writeFileSync(join(__dirname ,"persons.json"), JSON.stringify(jsonObj));
        ctx.reply('Ласкаво просимо до команди');
        return;
    }
    ctx.reply("З поверненням");

}