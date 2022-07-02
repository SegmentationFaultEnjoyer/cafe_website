require('../../../public/admin/EditPage.css');

const {connect} = require('react-redux');
const { initItems } = require('../redux/slices/gridSlice.js');

const request = require('../helpers/SendRequest.js');
const Loader = require('../helpers/Loader.jsx');

const SideBar = require('../navbars/SideNavBar.jsx');
const Search = require('../components/Search.jsx');
const AdminGrid = require('./AdminGrid.jsx');
const Add = require('./Add.jsx');
const Photos = require('./Photos.jsx');

class EditPage extends React.Component {
    constructor(props) {
        super(props);
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
                <Photos />
                </>
            }
            </>
        )
    }
}

module.exports = connect()(EditPage);