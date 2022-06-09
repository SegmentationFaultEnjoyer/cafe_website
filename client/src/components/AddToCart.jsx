const {Context} = require('../helpers/context.jsx');
require('../../../public/AddToCartButton.css');

class AddToCart extends React.Component {
    constructor(props) {
        super(props);
        this.AddHandler = this.AddHandler.bind(this);
        this.counter = props.counter;
        this.info = props.info;
        this.done = React.createRef();
    }

    Transition() {
        this.done.current.style.transform = "translate(0px)";
        setTimeout(() => {
            this.done.current.style.transform = "translate(-110%) skew(-40deg)";
        }, 1000);
    }

    AddHandler() {
        this.Transition();
        this.AddToCart();
    }

    ArrangeCart(product_info) {
        let products;
        let same_product = product_info.products.find(el => el.name == this.info.name);

        if(same_product) {
            same_product.amount += this.info.amount;
            products = [
                ...product_info.products.filter(el => el.name != same_product.name), 
                same_product];
        }
        else
            products = [...product_info.products, {...this.info}];

        return products;
    }

    AddToCart() {
        let {product_info, addProduct} = this.context;
        
        this.info.amount = Number(this.counter.current.value);
        let total_amount = product_info.count + this.info.amount;
        
        let product = { 
            count: total_amount,
            products: this.ArrangeCart(product_info)
        }

        addProduct(product);
        localStorage.setItem('cart', JSON.stringify(product));
    }

    render() {
        return (
            <button 
                className="addtocart" 
                onClick={this.AddHandler}>
                <div className="pretext">Додати у корзину</div>
                <div className="pretext done" ref={this.done}>
                    <div>Додано ✔</div>
                </div>
            </button>
        )
    }
}

AddToCart.contextType = Context;

module.exports = AddToCart;