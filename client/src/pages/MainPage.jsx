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
    const [isLoading, setLoading] = React.useState(true);
    const [gridItems, setGridItems] = React.useState([]);
    // let items = new Array(10).fill(0).map(el => {return {...info}});
    
    React.useEffect(() => {
        fetch('getItems')
            .then((items) => items.json())
            .then(({products}) => {
                setGridItems(products);
                setLoading(false);
            })
    }, []);
   
    return (
        <Context.Provider value={{product_info, addProduct}}>
            <img className='logo disable-interactions' src='logo/logo.png' alt='logo'></img>
            <mainPageContext.Provider value={{pickedCategory, changeCategory, gridItems, setGridItems}}>
                <SideBar />
                <Search />
                {isLoading ? <Loader /> : <MainGrid items={gridItems}/>}
            </mainPageContext.Provider>
            <Cart />
        </Context.Provider>
    )
}

module.exports = MainPage;