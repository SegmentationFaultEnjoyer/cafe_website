const React = require('react');
const {Context} = require('../helpers/context.jsx');

const Cart = require('../Cart.jsx');
const SideBar = require('../SideNavBar.jsx');
const MainGrid = require('../Grid.jsx');

function init_cart() {
    return JSON.parse(localStorage.getItem('cart')) ?? {count: 0, products: []};
     
}

function MainPage() {
    const [product_info, addProduct] = React.useState(init_cart());
   
    return (
        <Context.Provider value={{product_info, addProduct}}>
            <SideBar />
            <Cart />
            <MainGrid />
        </Context.Provider>
    )
}

module.exports = MainPage;