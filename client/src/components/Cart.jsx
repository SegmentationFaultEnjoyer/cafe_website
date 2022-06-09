const AbstractModal = require('./AbsModal.jsx');
const ProductToBuy = require('./ProductToBuy.jsx');
const {Context} = require('../helpers/context.jsx');
require('../../../public/Cart.css');

class Cart extends AbstractModal{
    constructor(props) {
        super(props);
    }

    render() {
        let {product_info, addProduct} = this.context;
        
        return (
            this.modal_wrapper(
                <button className="round-button" onClick={this.change_state}>
                    <i className="fa fa-shopping-cart"></i>
                    {product_info.count > 0 && 
                    (<span className="count">{product_info.count}</span>)}
                </button>,
                <>  
                    {product_info.products.length > 0 
                        ? product_info.products.map(el => {
                            return <ProductToBuy info={el}/>})
                        : <h1 style={{textAlign: 'center'}}>Корзина пуста 😔</h1>
                        }
                </>
                )
            )
    }
}

Cart.contextType = Context;

module.exports = Cart;