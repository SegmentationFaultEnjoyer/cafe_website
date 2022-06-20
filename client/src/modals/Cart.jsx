const {connect} = require('react-redux');

const AbstractModal = require('./AbsModal.jsx');
const ProductToBuy = require('../components/ProductToBuy.jsx');
const OrderMaker = require('./OrderMaker.jsx');

require('../../../public/Cart.css');
require('../../../public/buttons/CheckOutButton.css');

class Cart extends AbstractModal{
    constructor(props) {
        super(props);
        this.orderCheckOut = this.orderCheckOut.bind(this);
        this.state = {MakingOrder: false};
    }

    countExtrasPrice(extras) {
        return extras.reduce((price, extra) => {
            return price + extra[0] * extra[2];
        }, 0)
    }

    countTotalPrice(products) {
        let price = products.reduce((price, product) => {
            return price + (product.price + this.countExtrasPrice(product.extras)) * product.amount;
        }, 0);
        return price;
    }

    orderCheckOut() {
        setTimeout(() => {
            this.change_state();
            this.setState({MakingOrder: true});
        }, 300)
    }

    render() {
        let product_info = this.props.contains;
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
                            return <ProductToBuy info={{...el}} key={el.key}/>})
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

const mapStateToProps = (state) => ({
    contains: state.cart.contains
});

module.exports = connect(mapStateToProps)(Cart);