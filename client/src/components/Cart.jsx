const AbstractModal = require('./AbsModal.jsx');
const ProductToBuy = require('./ProductToBuy.jsx');
const OrderMaker = require('./OrderMaker.jsx');
const {Context} = require('../helpers/context.jsx');
require('../../../public/Cart.css');
require('../../../public/CheckOutButton.css');

class Cart extends AbstractModal{
    constructor(props) {
        super(props);
        this.orderCheckOut = this.orderCheckOut.bind(this);
        this.state = {MakingOrder: false};
    }

    countTotalPrice(products) {
        let price = products.reduce((price, product) => {
            return price + product.price * product.amount;
        }, 0);
        return price;
    }

    orderCheckOut() {
        setTimeout(() => {
            this.change_state();
            this.setState({MakingOrder: true});
        }, 500)
    }

    render() {
        let {product_info} = this.context;
        let price = this.countTotalPrice(product_info.products);

        return (
            this.modal_wrapper(
                <>
                <button className="round-button" onClick={this.change_state}>
                    <i className="fa fa-shopping-cart"></i>
                    {product_info.count > 0 && 
                    (<span className="count">{product_info.count}</span>)}
                </button>
                {this.state.MakingOrder && (
                    <OrderMaker context={this} info={product_info.products}/>
                )}
                </>
                ,
                <>  
                    {product_info.products.length > 0 
                        ? product_info.products.map(el => {
                            return <ProductToBuy info={el} key={el.name}/>})
                        : <h1 style={{textAlign: 'center'}}>Корзина пуста 😔</h1>
                        }

                    {product_info.products.length > 0 && (
                        <>
                            <p className='sum-label'>Сума замовлення: {price} ₴</p>
                            <div className='flex-container'>
                                <button
                                    className="green checkout-btn" 
                                    onClick={this.orderCheckOut}
                                    >Оформити замовлення 
                                </button>
                            </div>
                            
                        </>
                    )}

                </>
                )
            )
    }
}

Cart.contextType = Context;

module.exports = Cart;