const React = require('react');
const {Context} = require('../context.jsx');

const Modal = require('../Modal.jsx');
const Cart = require('../Cart.jsx');
const SideBar = require('../SideNavBar.jsx');

let info = {
    name: 'Суп из семи залуп',
    desc: 'В описании не нуждается',
    price: 68,
    img: 'soup'
}


function MainPage() {
    const [product_count, setCounter] = React.useState(0);
    return (
        <Context.Provider value={{counter: product_count, setCounter}}>
            <SideBar />
            <Cart />
            <div className='main-grid'>
                <Modal info={info}/>
            </div>
        </Context.Provider>
    )
}

module.exports = MainPage;