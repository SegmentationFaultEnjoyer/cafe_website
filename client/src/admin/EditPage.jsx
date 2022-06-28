require('../../../public/admin/EditPage.css');

const {connect} = require('react-redux');
const { initItems } = require('../redux/slices/gridSlice.js');

const request = require('../helpers/SendRequest.js');
const Loader = require('../helpers/Loader.jsx');

const SideBar = require('../navbars/SideNavBar.jsx');
const Search = require('../components/Search.jsx');
const AdminGrid = require('./AdminGrid.jsx');
const Add = require('./Add.jsx');

class EditPage extends React.Component {
    constructor(props) {
        super(props);
        this.items = [];
        this.state = {isLoading: true};
    }

    async componentDidMount() {
        let {products} = await request('/api/items');
        this.props.dispatch(initItems(products));
        this.setState({isLoading: false});
    }

    render() {
        return (
            <>
            {this.state.isLoading ? 
            <Loader /> : 
                <>
                <SideBar />
                <Search />
                <AdminGrid />
                <Add />
                </>
            }
            </>
        )
    }
}

module.exports = connect()(EditPage);

{/* <div>
                <div className='flex-container'>   
                    <button>ДОДАТИ</button>
                    <button>ВИДАЛИТИ</button>
                </div>
                
                {this.items.map(el => {
                    return <div className='item-container' key={el._id} id={el._id}>
                        <input type="checkbox" name={el.name}/>
                        <p>{el.name}</p>
                        <img src={el.img} alt={el.img} onError={(e) => e.target.src = 'not_found.webp'} />
                        <p>{el.price} грн.</p>
                        <i className="fa fa-pencil-square-o" onClick={this.Edit}></i>
                    </div>
                })}
            </div> */}