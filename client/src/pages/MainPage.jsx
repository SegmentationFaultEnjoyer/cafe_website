const React = require('react');
const {Context, mainPageContext} = require('../helpers/context.jsx');

const type = require('../helpers/types.js');

const Cart = require('../components/Cart.jsx');
const SideBar = require('../components/SideNavBar.jsx');
const MainGrid = require('../components/Grid.jsx');
const Search = require('../components/Search.jsx');
const Loader = require('../helpers/Loader.jsx');

function init_cart() {
    return JSON.parse(localStorage.getItem('cart')) ?? {count: 0, products: []};
     
}

function MainPage() {
    const [product_info, addProduct] = React.useState(init_cart());
    const [isLoading, setLoading] = React.useState(true);
    const [gridItems, setGridItems] = React.useState({});
    
    React.useEffect(() => {
        fetch('getItems')
            .then((items) => items.json())
            .then(({products}) => {
                setGridItems({category: 0, products, init_products: products});
                setLoading(false);
            })
    }, []);
   
    return (
        <Context.Provider value={{product_info, addProduct}}>
            <img className='logo disable-interactions' src='logo/logo.png' alt='logo'></img>
            <mainPageContext.Provider value={{gridItems, setGridItems}}>
                <SideBar />
                <Search />
                {isLoading ? <Loader /> : <MainGrid />}
            </mainPageContext.Provider>
            <Cart />
        </Context.Provider>
    )
}

module.exports = MainPage;