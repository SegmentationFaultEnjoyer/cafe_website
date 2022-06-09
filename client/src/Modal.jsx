const AddToCart = require('./AddToCart.jsx');
const AbstractModal = require('./AbsModal.jsx');
require('../../public/Modal.css');
require('../../public/animations.css');

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
        return (
            this.modal_wrapper(
                <button onClick={this.change_state}>Open window</button>,
                (<><h1>{name}</h1>
                        <p>{desc}</p>
                        <img className="picture disable-pick" src={`${img}.webp`} alt={img} />
                        <div className="flex-container">
                            <p className="price-label">{`${price} грн`}</p>
                            <input type="number" ref={this.counter_ref}
                                    defaultValue={1} min={1} max={25} 
                                    onChange={this.CounterHandler}
                                    />
                            <AddToCart counter={this.counter_ref} info={this.product_info}/>
                        </div></>)
            )
        )
    }
}

module.exports = Modal;