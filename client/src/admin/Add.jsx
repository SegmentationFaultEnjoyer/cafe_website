const AbstractModal = require('../modals/AbsModal.jsx');
const AdminForm = require('./AdminForm.jsx');

class Add extends AbstractModal{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            this.modal_wrapper(
                <>
                <button className="round-button" onClick={this.change_state}>
                    <i className="fa fa-plus" style={{padding: '5px', fontSize: '45px'}}></i>
                </button>
                </>
                ,
                <>  
                <AdminForm isEmpty={true}/>
                </>
                )
            )
    }
}


module.exports = Add;