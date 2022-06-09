const React = require('react');
const {Context} = require('../helpers/context.jsx');

const Modal = require('../Modal.jsx');
const Cart = require('../Cart.jsx');
const SideBar = require('../SideNavBar.jsx');

let info = {
    name: 'Суп из семи залуп',
    desc: 'В описании не нуждается',
    price: 68,
    img: 'soup'
}

function init_cart() {
    return JSON.parse(localStorage.getItem('cart')) ?? {count: 0, products: []};
     
}

function MainPage() {
    const [product_info, addProduct] = React.useState(init_cart());
   
    return (
        <Context.Provider value={{product_info, addProduct}}>
            <SideBar />
            <Cart />
            <div className='main-grid'>
                <Modal info={info}/>
                <button onClick={() => {
                    console.log(localStorage);
                    localStorage.clear()
                    }}>CLEAR</button>
            </div>
        </Context.Provider>
    )
}

module.exports = MainPage;