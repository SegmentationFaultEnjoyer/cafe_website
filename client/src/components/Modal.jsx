const AddToCart = require('./AddToCart.jsx');
const AbstractModal = require('./AbsModal.jsx');
require('../../../public/Modal.css');
require('../../../public/animations.css');

class Modal extends AbstractModal {
    constructor(props) {
        super(props);
        this.product_info = props.info;
        this.counter = 1;
        this.CounterHandler = this.CounterHandler.bind(this);
        this.counter_ref = React.createRef();
    }

    CounterHandler(e) {
        if(e.target.value > 0 && e.target.value < 26)
            this.counter = e.target.value;
        else {
            e.target.value = 1;
            this.counter = 1;
        }
    }

    render() {
        let {name, desc, price, img} = this.product_info;
        console.log('render modal');
        return (
            this.modal_wrapper(
                <PreviewCard info={this.product_info} onClick={this.change_state}/>
                ,
                (<>     
                    <h1>{name}</h1>
                    <p>{desc}</p>
                    <img className="picture fit disable-pick" src={img} alt={img}
                        onError={(e) => {e.target.src = 'not_found.webp'}}/>
                    <div className="flex-container">
                        <p className="price-label">{`${price} грн`}</p>
                        <input type="number" ref={this.counter_ref}
                            defaultValue={1} min={1} max={25} 
                            onChange={this.CounterHandler}
                            />
                        <AddToCart counter={this.counter_ref} info={this.product_info}/>
                    </div>
                </>)
            )
        )
    }
}

function PreviewCard(props) {
    let {info, onClick} = props;
    return (
        <div className='flex-container column preview disable-select'>
            <img className="picture disable-pick" src={info.img} alt={info.img} 
                onError={(e) => {e.target.src = 'not_found.webp'}} />
            <div className='title-container'>
                <h3>{info.name}</h3>
            </div>
            <p className="price-label">{`${info.price} грн`}</p>
            <button
                className="addtocart" 
                onClick={onClick}>
                <div className="pretext">Замовити</div>
            </button>
        </div>
    )
}

module.exports = Modal;