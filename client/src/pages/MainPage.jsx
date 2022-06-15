const React = require('react');
const {Context, mainPageContext} = require('../helpers/context.jsx');

const type = require('../helpers/types.js');

const Cart = require('../components/Cart.jsx');
const SideBar = require('../components/SideNavBar.jsx');
const MainGrid = require('../components/Grid.jsx');
const Search = require('../components/Search.jsx');

function init_cart() {
    return JSON.parse(localStorage.getItem('cart')) ?? {count: 0, products: []};
     
}

let info = {
    category: type.BREAKFAST,
    name: 'CUMPOT',
    desc: 'В описании не нуждается',
    price: 68,
    img: 'soup'
}

function MainPage() {
    const [product_info, addProduct] = React.useState(init_cart());
    const [pickedCategory, changeCategory] = React.useState(0);
    let items = new Array(10).fill(0).map(el => {return {...info}});
    
    console.log('render mainpage');
    return (
        <Context.Provider value={{product_info, addProduct}}>
            <mainPageContext.Provider value={{pickedCategory, changeCategory}}>
                <SideBar />
                <Search />
                <MainGrid items={items}/>
            </mainPageContext.Provider>
            <Cart />
        </Context.Provider>
    )
}

module.exports = MainPage;