const {Context} = require('../helpers/context.jsx');
require('../../../public/AddToCartButton.css');

class AddToCart extends React.Component {
    constructor(props) {
        super(props);
        this.AddHandler = this.AddHandler.bind(this);
        this.counter = props.counter;
        this.extras = props.extras;
        this.options = props.options;
        this.info = {...props.info};
        this.done = React.createRef();
    }

    Transition() {
        this.done.current.style.transform = "translate(0px)";
        setTimeout(() => {
            this.done.current.style.transform = "translate(-110%) skew(-40deg)";
        }, 500);
    }

    AddHandler() {
        this.Transition();
        this.AddToCart();
    }

    ArrangeCart(product_info) {
        let products;
        let same_product = product_info.products.find(el => el.key === this.info.key);

        if(same_product) {
            same_product.amount += this.info.amount;
            products = [
                ...product_info.products.filter(el => el.key != same_product.key), 
                same_product];
        }
        else
            products = [...product_info.products, {...this.info}];

        return products;
    }

    ExtractNodes(parentNode) {
        let children = [];
        parentNode.childNodes.forEach(el => children.push(el.childNodes));
        return children;
    }

    GetExtras() {
        if(this.extras.current == null) return [];

        let extras_raw = this.ExtractNodes(this.extras.current);

        extras_raw = extras_raw.map(item => {
            let items = [];
            for(let i = 0; i < item.length; i++) {
                if(i == 0) {
                    if(item[i].valueAsNumber < 1)
                       break;
                    items.push(item[i].valueAsNumber);
                }
                else
                    items.push(i == 2 ? parseInt(item[i].innerText) : item[i].innerText);
            }

            return items;
        })
        
        return extras_raw.filter(el => el.length > 0);
    }

    GetOptions() {
        if(this.options.current == null) return null;

        let options_raw = this.ExtractNodes(this.options.current);
        let pickedNode = options_raw.find(node => node[0].checked == true);
        
        return pickedNode[1].innerText;
    }

    AddToCart() {
        let {product_info, addProduct} = this.context;
        
        this.info.amount = Number(this.counter.current.value);
        let total_amount = product_info.count + this.info.amount;

        this.info.extras = this.GetExtras();
        this.info.options = this.GetOptions();
        this.info.key = this.makeKeyId(this.info);
        
        let product = { 
            count: total_amount,
            products: this.ArrangeCart(product_info)
        }
        console.log('Додано продукт', this.info);
        addProduct(product);
        localStorage.setItem('cart', JSON.stringify(product));
    }

    makeKeyId(product) {
        let extrasKeyPart = [];
        for(let extra of product.extras) {
            for(let i = 0; i < extra.length - 1; i++) {
                extrasKeyPart.push(extra[i])
            }
        }
        let finalKey = [product._id, ...extrasKeyPart, product.options ?? ''].join('_');
        console.log(finalKey);
        return finalKey;
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