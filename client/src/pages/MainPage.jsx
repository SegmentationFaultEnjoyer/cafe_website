const React = require('react');
const { useDispatch } = require('react-redux');

const { initItems } = require('../redux/slices/gridSlice.js');

const SideBar = require('../navbars/SideNavBar.jsx');
const Cart = require('../modals/Cart.jsx');
const MainGrid = require('../components/Grid.jsx');
const Search = require('../components/Search.jsx');
const Sort = require('../components/Sort.jsx');
const Loader = require('../helpers/Loader.jsx');

function MainPage() {
    const [isLoading, setLoading] = React.useState(true);
    const dispatch = useDispatch(); 

    React.useEffect(() => {
        fetch('getItems')
            .then((items) => items.json())
            .then(({products}) => {
                dispatch(initItems(products));
                setLoading(false);
            })
    }, []);
   
    return (
        <>
            <img className='logo disable-interactions' src='logo/logo.png' alt='logo'></img>
            {isLoading ? <Loader /> : 
                <>
                    <SideBar />
                    <Search />
                    <Sort />
                    <MainGrid />
                </>}
            <Cart />
        </>
    )
}

module.exports = MainPage;