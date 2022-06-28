const AbstractModal = require('../modals/AbsModal.jsx');
const AdminForm = require('./AdminForm.jsx');
const request = require('../helpers/SendRequest.js');

const { useDispatch } = require('react-redux');
const { deleteItem } = require('../redux/slices/gridSlice.js');

class AdminModal extends AbstractModal {
    constructor(props) {
        super(props);
        this.product_info = props.info;
    }
    
    render() {
        return (
            this.modal_wrapper(
                <PreviewCard info={this.product_info} onClick={this.change_state}/>
                , <AdminForm info={this.product_info} isEmpty={false}/>
            )
        )
    }
}

function PreviewCard(props) {
    let {info, onClick} = props;
    const dispatch = useDispatch();

    async function DeleteItem() {
        console.log('УДОЛЯЮ');
        let {success} = await request('/api/items', 'DELETE', {_id: info._id, img: info.img});
        if(success) dispatch(deleteItem(info._id));
        console.log(success);
    }

    return (
        <div className='flex-container column preview disable-select'>
            <div className='flex-container edit-buttons'>
                <i className="fa fa-pencil" onClick={onClick}></i>
                <i className="fa fa-ban" onClick={DeleteItem}></i>
            </div>
            <img className="picture disable-pick" src={info.img} alt={info.img} 
                onError={(e) => {e.target.src = 'not_found.webp'}} />
            <div className='title-container'>
                <h3>{info.name}</h3>
            </div>
            <p className="price-label">{`${info.price} грн`}</p>
        </div>
    )
}

module.exports = AdminModal;