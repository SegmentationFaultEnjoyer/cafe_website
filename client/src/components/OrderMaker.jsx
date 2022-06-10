const AbstractModal = require('./AbsModal.jsx')
require('../../../public/Form.css');

class OrderMaker extends AbstractModal {
    constructor(props) {
        super(props);
        this.prevWindow = props.context;
        this.orderInfo = props.info;

        this.state = {
            name: "", 
            phoneNumber: "",
            eMail: "",
            addres: "",
            isOpen: true
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.select = React.createRef();
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        let order = {
            name: formData.get('name'),
            number: formData.get('phoneNumber'),
            addres: formData.get('addres'),
            payment: this.select.current.selectedIndex
        }
        console.log('ЗАКАЗЧИК', order);
        console.log('ЗАКАЗ', this.orderInfo);
    }

    change_state() {
        this.fade_out()
            .then(() => {
                this.setState({isOpen: !this.state.isOpen});
                this.prevWindow.setState({MakingOrder: false});
            })
            .catch((error) => console.error(error));
    }

    render() {
        return (
            this.modal_wrapper(<></>, 
                <>
                <h1 className='title'>Оформлення замовлення</h1>
                <form onSubmit={this.handleSubmit} className="form">
                    <div className='input-container'>
                        <input className='input' type="text" name='name' placeholder=" "/>
                        <div className="cut cut-short"></div>
                        <label htmlFor="name" className="placeholder">Ім'я</label>
                    </div>
                    {/* <div className='input-container'>
                        <input className='input' type="email" name="email" placeholder=" "/>
                        <div className="cut"></div>
                        <label htmlFor="email" className="placeholder">Пошта</label>
                    </div> */}
                    <div className='input-container'>
                        <input className='input' type="tel" name="phoneNumber" placeholder=" " />
                        <div className="cut cut-long"></div>
                        <label htmlFor="phoneNumber" className="placeholder">Номер телефону</label>
                    </div>
                    <div className='input-container'>
                        <input className='input' type="text" name="addres" placeholder=" " />
                        <div className="cut"></div>
                        <label htmlFor="addres" className="placeholder">Адреса</label>
                    </div>
                    <div className='input-container'>
                        <select className='input' name='payment'
                        ref={this.select}>
                            <option value={0}>Безготівковий розрахунок</option>
                            <option value={1}>Готівка</option>
                            <option value={2}>Сракою</option>
                            <option value={3}>Душа</option>
                        </select>
                        <div className="cut"></div>
                        <label htmlFor="payment" className="placeholder">Оплата</label>
                    </div>
                    <div className='input-container'>
                            <button type='submit' className='brown checkout-btn'>Замовити</button>
                    </div>
                    
                </form>
                </>
            )
        )
    }
}

module.exports = OrderMaker;