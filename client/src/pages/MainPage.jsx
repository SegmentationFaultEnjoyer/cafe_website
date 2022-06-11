const React = require('react');
const {Context} = require('../helpers/context.jsx');

const Cart = require('../components/Cart.jsx');
const SideBar = require('../components/SideNavBar.jsx');
const MainGrid = require('../components/Grid.jsx');
const Search = require('../components/Search.jsx');

function init_cart() {
    return JSON.parse(localStorage.getItem('cart')) ?? {count: 0, products: []};
     
}

function MainPage() {
    const [product_info, addProduct] = React.useState(init_cart());
   
    return (
        <Context.Provider value={{product_info, addProduct}}>
            <SideBar />
            <Search />
            <Cart />
            <MainGrid />
        </Context.Provider>
    )
}

module.exports = MainPage;