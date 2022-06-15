const {MongoClient} = require('mongodb'); 

class Database {
    constructor() {this.client; this.db; this.items}
    async connect() {
        this.client = new MongoClient('mongodb+srv://mango:vpU3X7cgpNxskUW@cluster0.mmxo3.mongodb.net/?retryWrites=true&w=majority');
        await this.client.connect();        
        console.log("DB connected!");
        this.db = this.client.db('tsicava')
        this.items = this.db.collection('items');
    }
    async setProducts() {
        await this.addBreakfast();
        await this.addSandwiches();
    }
    async addBreakfast() {
        const type = 11;
        await this.items.insertMany([
            {
                name: "Туна нісуаз",
                desc: "Свіжий тунець, запечена картопля, спаржева квасоля, половинка булочки бейгл, смажене яйце, фета, оливки, свіжі овочі, ромен, зелене масло, лимон.",
                price: 210,
                type: type,
                img: "tuna_nisuaz.webp",
                extras: [{
                    name: "смажене яйце",
                    price: 10
                }]
            },
            {
                name: "Сніданок континентальний з лососем",
                desc: "Слабосолений лосось, половинка авокадо, крем-сир, мікс оливок, огірок, помідор, мікс салату, оливкова олія, смажене яйце, булочка бейгл. В додатках може додати ще додаткове смажене яйце або замінити його на скрамбл з двох яєць.",
                price: 200,
                type: type,
                img: "continental_breakfast_with_salmon.webp",
                extras: [{
                    name: "смажене яйце",
                    price: 10
                },
                {
                    name: "скрамбл з 2-x яєць",
                    price: 30
                },
                {
                    name: "лосось",
                    price: 60
                },
                {
                    name: "авокадо",
                    price: 45
                }]
            },
            {
                name: "Сніданок континентальний з прошуто",
                desc: "Прошуто, половинка авокадо, крем-сир, мікс оливок, огірок, помідор, мікс салату, оливкова олія, смажене яйце, булочка бейгл. В додатках може додати ще додаткове смажене яйце або замінити його на скрамбл з двох яєць.",
                price: 200,
                type: type,
                img: "continental_breakfast_with_prosciutto.webp", //нет фото
                extras: [{
                    name: "смажене яйце",
                    price: 10
                },
                {
                    name: "скрамбл з 2-x яєць",
                    price: 30
                },
                {
                    name: "авокадо",
                    price: 45
                }]
            },
            {
                name: "Скрамбл авокадо шрімпс",
                desc: "Скрамбл з двох яєць, на тості з вугільного хліба, креветки на грилі, половинка авокадо,міні салат, кулька рікоти.",
                price: 200,
                type: type,
                img: "scramble_avocado_shrimp.webp",
                extras: [{
                    name: "креветки",
                    price: 65
                },
                {
                    name: "авокадо",
                    price: 45
                },
                {
                    name: "яйце",
                    price: 10
                }]
            },
            {
                name: "Омлет м'ясний",
                desc: "Мікс м'яса (курка, індичка, телятина), омлет з трьох яєць на вершках та вершковому маслі, зелене масло, міні салат(листовий мікс з сезонними овочами та фруктами, заправлений лимонним дресінгом та міксом насіння і горіхів) та два шматочки хліба на грилі",
                price: 150,
                type: type,
                img: "meat_omelet.webp",
                extras: [{
                    name: "моцарела",
                    price: 40
                },
                {
                    name: "хліб",
                    price: 0
                }]
            },
            {
                name: "Омлет сирний",
                desc: "Моцарела, бринза, кулька рікоти, дор блю, омлет з трьох яєць на вершках та вершковому маслі, зелене масло, міні салат(листовий мікс з сезонними овочами та фруктами, заправлений лимонним дресінгом та міксом насіння і горіхів) та два шматочки хліба на грилі",
                price: 150,
                type: type,
                img: "cheese_omelette.webp",
                extras: [{
                    name: "курка",
                    price: 35
                },
                {
                    name: "індичка",
                    price: 40 
                },
                {
                    name: "яловичина",
                    price: 50
                },
                {
                    name: "хліб",
                    price: 0
                }]
            },
            {
                name: "Скрамбл на тості",
                desc: "Грінка з бездріжджового хліба, скрамб з трьох яєць з вершками, смажений на вершковому маслі, зелене масло, міні салат(листовий мікс з сезонними овочами та фруктами, заправлений лимонним дресінгом та міксом насіння і горіхів)",
                price: 130,
                type: type,
                img: "scramble_on_toast.webp",
                extras: [{
                    name: "моцарела",
                    price: 40
                },
                {
                    name: "лосось",
                    price: 60
                },
                {
                    name: "запечені овочі",
                    price: 35
                },
                {
                    name: "курка",
                    price: 35
                },
                {
                    name: "індичка",
                    price: 40 
                },
                {
                    name: "яловичина",
                    price: 50
                },
                {
                    name: "хліб",
                    price: 0
                }]
            },
            {
                name: "Тост зелений",
                desc: "Тост з бездріжджового хліба, хумус, авокадо, огірок, боби едамаме, оливки, спаржева квасоля або броколі, мікс зелені.",
                price: 150,
                type: type,
                img: "green_toast.webp",
                extras: [{
                    name: "авокадо",
                    price: 45
                },
                {
                    name: "лосось",
                    price: 60
                },
                {
                    name: "курка",
                    price: 35
                },
                {
                    name: "індичка",
                    price: 40 
                },
                {
                    name: "яловичина",
                    price: 50
                },
                {
                    name: "креветки",
                    price: 65
                },
                {
                    name: "яйце смажене",
                    price: 10
                }]
            },
            {
                name: "Шакшука",
                desc: "Томатно-овочеве рагу, подвійна яєшня, зелене масло, міні салат(листовий мікс з сезонними овочами та фруктами, заправлений лимонним дресінгом та міксом насіння і горіхів) та два шматочки хліба на грилі",
                price: 150,
                type: type,
                img: "shakshuka.webp",
                extras: [{
                    name: "моцарела",
                    price: 40
                },
                {
                    name: "курка",
                    price: 35
                },
                {
                    name: "індичка",
                    price: 40 
                },
                {
                    name: "яловичина",
                    price: 50
                },
                {
                    name: "додаткове яйце",
                    price: 10
                },
                {
                    name: "хліб",
                    price: 0
                }]
            }
        ])    
    }
    async addSandwiches() {
        const type = 8;
        await this.items.insertMany([
            {
                name: "Сендвіч з куркою",
                desc: "Булочка бріош, курка печена, помідор, зелене масло, соус ніжний карі, листя салату",
                price: 110,
                type: type,
                img: "chicken_sandwich.webp",
                extras: [{
                    name: "моцарела",
                    price: 40
                },
                {
                    name: "фета",
                    price: 35
                }],
                options: [{name: "булка/хліб", contains: ["бріош", "бейгл", "хліб вугільний пшеничний"]}]
            },
            {
                name: "Сендвіч з індиком",
                desc: "Булка бріош, індичка печена, грильований кабачок, зелене масло, соус ніжний карі, листя салату",
                price: 120,
                type: type,
                img: "turkey_sandwich.webp",
                extras: [{
                    name: "моцарела",
                    price: 40
                },
                {
                    name: "фета",
                    price: 35
                },
                {
                    name: "помідор",
                    price: 15
                }],
                options: [{name: "булка/хліб", contains: ["бріош", "бейгл", "хліб вугільний пшеничний", "хліб житній на заквасці"]}]
            },
            {
                name: "Сендвіч з моцарелою",
                desc: "Булка бейгл, рікота, моцарела, томати, зелене масло, листя салату/шпинат",
                price: 120,
                type: type,
                img: "mozzarella_sandwich.webp",
                extras: [{
                    name: "курка",
                    price: 35
                },
                {
                    name: "індик",
                    price: 40
                },
                {
                    name: "телятина",
                    price: 50
                },
                {
                    name: "лосось",
                    price: 60
                },
                {
                    name: "запечені овочі",
                    price: 35
                }],
                options: [{name: "булка/хліб", contains: ["бейгл", "бріош", "хліб вугільний пшеничний"]}]
            },
            {
                name: "Сендвіч з лососем",
                desc: "Булка бейгл, рікота, слабосолений лосось, свіжий огірок, зелене масло, тапенад з темних маслин, листя салату/шпинат",
                price: 140,
                type: type,
                img: "salmon_sandwich.webp",
                options: [{name: "булка/хліб", contains: ["бейгл", "бріош", "хліб вугільний пшеничний"]}]
            },
            {
                name: "Сендвіч з тунцем",
                desc: "Булка бейгл, тунець у власному соці, мариновий огірок, яйце варене, соус солодко-пряний, зелене масло, листя салату/шпинату",
                price: 135,
                type: type,
                img: "tuna_sandwich.webp",
                extras: [{
                    name: "моцарела",
                    price: 40
                }],
                options: [{name: "булка/хліб", contains: ["бейгл", "бріош", "хліб вугільний пшеничний"]}]
            },
            {
                name: "Сендвіч з фетою",
                desc: "Булка бейгл, рікота, фета, тапенад з темних маслин, помідори, зелене масло, листя салату",
                price: 120,
                type: type,
                img: "feta_sandwich.webp",
                extras: [{
                    name: "курка",
                    price: 35
                },
                {
                    name: "індик",
                    price: 40
                },
                {
                    name: "телятина",
                    price: 50
                },
                {
                    name: "лосось",
                    price: 60
                },
                {
                    name: "запечені овочі",
                    price: 35
                }],
                options: [{name: "булка/хліб", contains: ["бейгл", "бріош", "хліб вугільний пшеничний"]}]
            },
        ])
    }
    async getProducts() {
        return await this.items.find().toArray();
    }
    async close() {
        await this.client.close()
    }
}
async function main() {
    let db = new Database();
    await db.connect();
    await db.setProducts();
    let res = await db.getProducts();
    //await res.forEach(doc => console.dir(doc))
    console.log(res);
    await db.close();
}
main();

module.exports = new Database();