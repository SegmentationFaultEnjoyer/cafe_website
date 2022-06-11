const AbsModal = require('../components/AbsModal.jsx');

class ErrorMsg extends AbsModal {
    constructor(props) {
        super(props);
        this.error_list = props.errors;
        this.state.isOpen = true;
        this.prevWindow = props.context;
    }

    change_state() {
        this.fade_out()
            .then(() => {
                this.setState({isOpen: !this.state.isOpen});
                this.prevWindow.setState({isValid: true});
            })
            .catch((error) => console.error(error));
    }

    render() {
        return(
            this.modal_wrapper(<></>,
                <>
                {this.error_list.map(el => <h3 style={{textAlign: 'center'}}>{el}</h3>)}
                </>
            )
        )
    }
}

module.exports = ErrorMsg;