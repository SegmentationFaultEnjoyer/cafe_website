require('../../../public/buttons/AddToCartButton.css');

const {connect} = require('react-redux');

const {addToCart} = require('../redux/slices/cartSlice.js');

class AddToCart extends React.Component {
    constructor(props) {
        super(props);
        this.AddHandler = this.AddHandler.bind(this);
        this.counter = props.counter;
        this.extras = props.extras;
        this.options = props.options;
        this.optionsPlural = props.optionsPlural;
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
        
        return [pickedNode[1].innerText];
    }

    GetOptionsPlural() {
        if(this.optionsPlural.current == null) return null;

        let pickedOptions = [];
        let checkboxes = this.optionsPlural.current.querySelectorAll('input[type=checkbox]');
        checkboxes.forEach(checkbox => {
            if(checkbox.checked) pickedOptions.push(checkbox.nextSibling.innerText);
        })
        return pickedOptions;
    }

    AddToCart() {
        let productToAdd = {...this.info};
        productToAdd.amount = Number(this.counter.current.value);
        productToAdd.extras = this.GetExtras();
        productToAdd.options = this.optionsPlural.current == null ? this.GetOptions() : this.GetOptionsPlural();
        productToAdd.key = this.makeKeyId(productToAdd);
    
        this.props.dispatch(addToCart(productToAdd));
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


module.exports = connect()(AddToCart);