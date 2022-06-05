const ReactDOM = require('react-dom/client');
const React = require('react');

const Context = require('./src/context.jsx');
const Modal = require('./src/Modal.jsx');
const Cart = require('./src/Cart.jsx');
const SideBar = require('./src/SideNavBar.jsx');

let root = ReactDOM.createRoot(document.getElementById("app"));
let info = {
    name: 'Суп из семи залуп',
    desc: 'В описании не нуждается',
    price: 68,
    img: 'soup'
}

function MainApp() {
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


root.render(<MainApp />);
