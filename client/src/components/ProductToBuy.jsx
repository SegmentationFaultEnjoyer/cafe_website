const {Context} = require('../helpers/context.jsx');

class ProductToBuy extends React.Component {
    constructor(props) {
        super(props);
        this.info = props.info;
        this.info.totalPrice = this.info.price * this.info.amount;
        this.deleteHandler = this.deleteHandler.bind(this);
    }

    deleteHandler() {
        let {product_info, addProduct} = this.context;

        let new_products = product_info.products.filter(el => el.name != this.info.name);
    
        let updated = {
            count: product_info.count - this.info.amount,
            products: new_products
        }

        localStorage.setItem('cart', JSON.stringify(updated));
        
        addProduct(updated);
    }

    render() {
        return (
            <div className="cart-product">
                <p>{this.info.name}</p>
                <img className="disable-pick" src={this.info.img} alt={this.info.img} 
                    onError={(e) => {e.target.src = 'not_found.webp'}}/>
                <p>{`${this.info.amount} шт.`}</p>
                <p className='price-label'>{`${this.info.totalPrice} ₴`}</p>
                <i className="fa fa-times-circle-o" onClick={this.deleteHandler}></i>
            </div>
        )
    }
}

ProductToBuy.contextType = Context;

module.exports = ProductToBuy;