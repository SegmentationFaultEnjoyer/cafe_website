const Context = require('./context.jsx');

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
        let {counter, setCounter} = this.context;
        console.log(`added ${this.counter.current.value} of ${this.info.name}`);
        setCounter(counter + Number(this.counter.current.value));
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