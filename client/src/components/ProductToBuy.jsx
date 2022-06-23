const {connect} = require('react-redux');
const {deleteFromCart} = require('../redux/slices/cartSlice.js');

class ProductToBuy extends React.Component {
    constructor(props) {
        super(props);
        this.info = props.info;
        this.info.totalPrice = (this.info.price + this.countExtrasPrice()) * this.info.amount;
        this.deleteHandler = this.deleteHandler.bind(this);
    }

    countExtrasPrice() {
        return this.info.extras.reduce((price, extra) => {
            return price + extra[0] * extra[2];
        }, 0)
    }

    deleteHandler() {
        this.props.dispatch(deleteFromCart(this.info));
    }

    render() {
        let style = this.info.name.length > 25 ? {fontSize: '0.85em'} : {};
        return (
            <>
            <div className="cart-product">
                <p style={style}>{this.info.name}</p>
                <img className="disable-pick" src={this.info.img} alt={this.info.img} 
                    onError={(e) => {e.target.src = 'not_found.webp'}}/>
                <p>{`${this.info.amount} шт.`}</p>
                <p className='price-label'>{`${this.info.totalPrice} ₴`}</p>
                <i className="fa fa-times-circle-o" onClick={this.deleteHandler}></i>
            </div>
            <ul className='extras-list'>
                {this.info.options && (
                    <li><i className="fa fa-plus-square"></i>
                        {this.info.options.map(el => <span>{el}</span>)}
                    </li>)}
                
                {this.info.extras.map(el => {
                    return <>
                        <li><i className="fa fa-plus-square-o"></i>
                        <span>{el[1]}</span>
                        <span>{`${el[0]} шт.`}</span>
                        </li>
                    </>
                })}
            </ul>
        </>
        )
    }
}

module.exports = connect()(ProductToBuy);