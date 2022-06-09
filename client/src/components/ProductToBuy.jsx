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

        addProduct(updated)

        localStorage.setItem('cart', JSON.stringify(updated));

    }

    render() {
        return (
            <div className="flex-container">
                <p>{this.info.name}</p>
                <p>{this.info.amount}</p>
                <p>{this.info.totalPrice}</p>
                <button onClick={this.deleteHandler}>del</button>
            </div>
        )
    }
}

ProductToBuy.contextType = Context;

module.exports = ProductToBuy;