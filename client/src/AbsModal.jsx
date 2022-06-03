class AbstractModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.change_state = this.change_state.bind(this);
        this.window = React.createRef();
    }

    change_state() {
        this.fade_out()
            .then(() => {
                this.setState({isOpen: !this.state.isOpen})
            })
            .catch((error) => console.error(error));
    }

    fade_out() {
        return new Promise(resolve => {
            if(this.state.isOpen) {
                this.window.current.style.animationName = 'gone'
                this.window.current.style.animationDuration = '0.5s'
                setTimeout(() => {resolve();}, 500);
            }
            else resolve();
        })
    }

    modal_wrapper(trigger, content) {
        return (
            <React.Fragment>
                {trigger}
                {this.state.isOpen && 
                (<div className="modal" ref={this.window}>
                    <div className="modal-body">
                        <div className="closeModal" onClick={this.change_state}></div>
                        {content}
                    </div>
                </div>)}
            </React.Fragment>
        )
    }
}


module.exports = AbstractModal;