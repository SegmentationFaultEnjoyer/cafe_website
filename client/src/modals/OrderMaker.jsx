const AbstractModal = require('./AbsModal.jsx');
const request = require("../helpers/SendRequest")
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
            _nameInput: this.nameInput,
            _phoneInput: this.phoneInput,
            _addresInput: this.addresInput
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.select = React.createRef();
    }

    lengthMatch(length, lengthBoundaries) {
        return length <= lengthBoundaries.max && length >= lengthBoundaries.min;
    }

    dataTypeMatch(data, type) {
        if (!type) return true;

        let RegExp;

        switch (type) {
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
            switch (prop) {
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
        if (validationOptions.length != Object.keys(formData).length) {
            console.warn('Wrong amount of options passed for validation');
            return { valid: false, errors: [] };
        }

        let errors = [];
        let optionCounter = 0;

        for (let key in formData) {
            let data = formData[key];
            let option = validationOptions[optionCounter];
            let error_list = [];

            if (!option) continue;

            if (!this.lengthMatch(data.length, option.length))
                error_list.push(this.translatePropToUkr`${key} має некоректну довжину`);

            else if (!this.dataTypeMatch(data, option.restrictedSymbol))
                error_list.push(this.translatePropToUkr`${key} містить заборонений символ`);

            if (error_list.length > 0) errors.push({ field: key, list: error_list });

            optionCounter++;
        }

        return {
            valid: errors.length == 0,
            errors: errors
        }
    }

    showErrors(errors) {
        for (let error of errors) {
            let error_list = error.list.map(error => {
                return <p className='error'>{error}</p>
            })

            switch (error.field) {
                case 'name':
                    if (this.state._nameInput.length <= 3)
                        this.setState({ _nameInput: [...this.state._nameInput, error_list] });
                    break;
                case 'number':
                    if (this.state._phoneInput.length <= 3)
                        this.setState({ _phoneInput: [...this.state._phoneInput, error_list] });
                    break;
                case 'addres':
                    if (this.state._addresInput.length <= 3)
                        this.setState({ _addresInput: [...this.state._addresInput, error_list] });
                    break;
                default:
                    break;
            }
        }

    }

    CleanErrors = () => {
        for (let key in this.state) {
            if (key.toString()[0] == '_' && this.state[key].length > 3) {
                this.setState({ [key]: this.state[key].splice(0, 3) })
            }
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        const validationOptions = [
            {
                length: { min: 2, max: 25 },
                restrictedSymbol: 'digit'
            },
            {
                length: { min: 10, max: 13 },
                restrictedSymbol: 'char'
            },
            {
                length: { min: 10, max: 100 },
                restrictedSymbol: null
            },
            null
        ];

        const formData = new FormData(e.target);

        let order = {
            name: formData.get('name'),
            number: formData.get('phoneNumber'),
            addres: formData.get('addres'),
            payment: this.select.current.selectedIndex
        }

        let isValid = this.validateForm(order, validationOptions);

        if (!isValid.valid) {
            this.showErrors(isValid.errors);
            return;
        }

        console.table(order);
        console.log(this.orderInfo);
        await request("/api/order", "POST", order)
    }

    change_state() {
        this.fade_out()
            .then(() => {
                this.setState({ isOpen: !this.state.isOpen });
                this.prevWindow.setState({ MakingOrder: false });
            })
            .catch((error) => console.error(error));
    }

    nameInput = [
        <input className='input' type="text" name='name' placeholder=" " onFocus={this.CleanErrors} />,
        <div className="cut cut-short"></div>,
        <label htmlFor="name" className="placeholder">Ім'я</label>
    ]

    phoneInput = [
        <input className='input' type="tel" name="phoneNumber" placeholder=" " onFocus={this.CleanErrors} />,
        <div className="cut cut-long"></div>,
        <label htmlFor="phoneNumber" className="placeholder">Номер телефону</label>
    ]

    addresInput = [
        <input className='input' type="text" name="addres" placeholder=" " onFocus={this.CleanErrors} />,
        <div className="cut"></div>,
        <label htmlFor="addres" className="placeholder">Адреса</label>
    ]

    render() {
        return (
            this.modal_wrapper(<></>,
                <>
                    <h1 className='title'>Оформлення замовлення</h1>
                    <form onSubmit={this.handleSubmit} className="form">
                        <div className='input-container'>
                            {this.state._nameInput}
                        </div>
                        <div className='input-container'>
                            {this.state._phoneInput}
                        </div>
                        <div className='input-container'>
                            {this.state._addresInput}
                        </div>
                        <div className='input-container'>
                            <select className='input' name='payment'
                                ref={this.select}>
                                <option value={0}>Безготівковий розрахунок</option>
                                <option value={1}>Переказ на картку</option>
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