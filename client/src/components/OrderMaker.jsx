const AbstractModal = require('./AbsModal.jsx')
const ErrorMsg = require('../helpers/ErrorMsg.jsx');
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
            isOpen: true,
            isValid: true
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.select = React.createRef();
    }

    lengthMatch(length, lengthBoundaries) {
        return length <= lengthBoundaries.max && length >= lengthBoundaries.min;
    }

    dataTypeMatch(data, type) {
        if(!type) return true;

        let RegExp;

        switch(type) {
            case 'digit':
                RegExp = /[0-9]/;
                break;
            case 'char':
                RegExp = /[a-zа-яё]/i;
                break;
            default:
                console.warn('Wrong type passed to restrictedSymbol parametr');
                return false;
        }
        return !RegExp.test(data);
    }

    translatePropToUkr(string, ...props) {
       const translate = (prop) => {
            switch(prop) {
                case 'name':
                    return "Ім'я";
                case 'number':
                    return 'Номер телефону';
                case 'addres':
                    return 'Адреса';
                default:
                    return 'СЛАВА УКРАЇНІ!';
            }
        }

        return props.reduce((finalString, value) => {
            return `${translate(value)}${finalString}`;
        }, string[1]);
    }

    validateForm(formData, validationOptions) {
        if(validationOptions.length != Object.keys(formData).length) {
            console.warn('Wrong amount of options passed for validation');
            return {valid: false, errors: []};
        }

        let errors = [];
        let optionCounter = 0;

        for(let key in formData) {
            let data = formData[key];
            let option = validationOptions[optionCounter];
           
            if(!option) continue;

            if(!this.lengthMatch(data.length, option.length))
                errors.push(this.translatePropToUkr`${key} має некоректну довжину`);

            if(!this.dataTypeMatch(data, option.restrictedSymbol))
                errors.push(this.translatePropToUkr`${key} містить заборонений символ`);

            optionCounter++;
        }

        return {
            valid: errors.length == 0,
            errors: errors
        }
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

        let isValid = this.validateForm(order, [
            {
                length: {min: 2, max: 25},
                restrictedSymbol: 'digit'
            },
            {
                length: {min: 10, max: 13},
                restrictedSymbol: 'char'
            },
            {
                length: {min: 10, max: 100},
                restrictedSymbol: null
            },
            null
        ]);

        this.setState({isValid: isValid.valid});

        if(!isValid.valid) {
            this.errors = isValid.errors;
            return;
        }

        console.table(order);
        console.log(this.orderInfo);
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
                {!this.state.isValid && <ErrorMsg errors={this.errors} context={this}/>}
                </>
            )
        )
    }
}

module.exports = OrderMaker;