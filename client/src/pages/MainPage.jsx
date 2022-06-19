const React = require('react');
const {Context, mainPageContext} = require('../helpers/context.jsx');

const type = require('../helpers/types.js');
const bring_soup_to_top = require('../helpers/SoupHandler.js');

const Cart = require('../components/Cart.jsx');
const SideBar = require('../components/SideNavBar.jsx');
const MainGrid = require('../components/Grid.jsx');
const Search = require('../components/Search.jsx');
const Sort = require('../components/Sort.jsx');
const Loader = require('../helpers/Loader.jsx');

function init_cart() {
    return JSON.parse(localStorage.getItem('cart')) ?? {count: 0, products: []};
}



function MainPage() {
    const [product_info, addProduct] = React.useState(init_cart());
    const [isLoading, setLoading] = React.useState(true);
    const [gridItems, setGridItems] = React.useState({});
    const [sortLable, setSortLabel] = React.useState('▼ Сортування за популярністю');
    
    React.useEffect(() => {
        fetch('getItems')
            .then((items) => items.json())
            .then(({products}) => {
                products = bring_soup_to_top(products);
                setGridItems({
                    category: type.POPULAR, 
                    products: products.filter(el => el.hasOwnProperty('isPopular') && el.isPopular), 
                    init_products: products
                });
                setLoading(false);
            })
    }, []);
    console.log('render mainpage');
    return (
        <Context.Provider value={{product_info, addProduct}}>
            <img className='logo disable-interactions' src='logo/logo.png' alt='logo'></img>
            <mainPageContext.Provider value={{gridItems, setGridItems}}>
                <SideBar sortLabel={sortLable} setSortLabel={setSortLabel}/>
                <Search />
                <Sort sortLabel={sortLable} setSortLabel={setSortLabel}/>
                {isLoading ? <Loader /> : <MainGrid />}
            </mainPageContext.Provider>
            <Cart />
        </Context.Provider>
    )
}

module.exports = MainPage;