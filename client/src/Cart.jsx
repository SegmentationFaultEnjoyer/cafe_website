const AbstractModal = require('./AbsModal.jsx');
const {Context} = require('./helpers/context.jsx');
require('../../public/Cart.css');

class Cart extends AbstractModal{
    constructor(props) {
        super(props);
    }

    render() {
        let {counter, setCounter} = this.context;
        return (
            this.modal_wrapper(
                <button className="round-button" onClick={this.change_state}>
                    <i className="fa fa-shopping-cart"></i>
                    {counter > 0 && (<span className="count">{counter}</span>)}
                </button>,
                (<>
                    <h1>UNDER CONSTRUCTION</h1>
                </>)
            )
        )
    }
}

Cart.contextType = Context;

module.exports = Cart;