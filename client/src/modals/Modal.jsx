const AddToCart = require('../buttons/AddToCart.jsx');
const AbstractModal = require('./AbsModal.jsx');
require('../../../public/Modal.css');
require('../../../public/animations.css');
require('../../../public/Extras.css');

class Modal extends AbstractModal {
    constructor(props) {
        super(props);
        this.product_info = props.info;
        this.counter = 1;
        this.CounterHandler = this.CounterHandler.bind(this);
        this.ExtrasCounterHandler = this.ExtrasCounterHandler.bind(this);
        this.CheckBoxHandler = this.CheckBoxHandler.bind(this);
        this.counter_ref = React.createRef();
        this.extras = React.createRef();
        this.options = React.createRef();
        this.optionsPlural = React.createRef();
    }

    CounterHandler(e) {
        if(e.target.value > 0 && e.target.value < 26)
            this.counter = e.target.value;
        else {
            e.target.value = "";
            this.counter = 1;
        }
    }

    ExtrasCounterHandler(e) {
        if(e.target.value > 0 && e.target.value < 4)
           return;
        
        e.target.value = "";   
    }

    CheckBoxHandler(e) {
        let checked = 0;
        let checkboxes = this.optionsPlural.current.querySelectorAll('input[type=checkbox]');
        checkboxes.forEach(checkbox => {
            if(checkbox.checked) checked++;
        })
       
        if(checked > this.product_info.optionsPlural.amount || checked < 1) e.preventDefault();
    }

    render() {
        let {name, desc, price, img, extras, options, optionsPlural} = this.product_info;
        
        return (
            this.modal_wrapper(
                <PreviewCard info={this.product_info} onClick={this.change_state}/>
                ,
                (<>     
                    <h1>{name}</h1>
                    <p>{desc}</p>
                    <img className="picture fit disable-pick" src={img} alt={img}
                        onError={(e) => {e.target.src = 'not_found.webp'}}/>
                    
                    <div ref={this.options}>
                        {options && (options.map(option => {
                            return <div>
                            <h3>{option.name}</h3>
                            <div className='options-container'>
                            {option.contains.map((el, index) => {
                                return (
                                    <div>
                                    {index == 0 ? <input type="radio" 
                                        name={option.name}
                                        defaultChecked
                                        /> 
                                        :
                                        <input type="radio" 
                                        name={options[0].name}
                                        />
                                    }
                                    <span>{el}</span>
                                    </div>
                                )
                            })}
                            </div>
                            </div>
                            })
                            )
                        }
                    </div>
                    
                    {optionsPlural && (
                        <>
                        <h3>{optionsPlural.name}</h3>
                        <h5>{`Оберіть від 1 до ${optionsPlural.amount} опцій`}</h5>
                        <div className='options-container' ref={this.optionsPlural}>
                            {optionsPlural.contains.map((el, index) => {
                                return <div>
                                    {index == 0 ? <input type="checkbox" name={optionsPlural.name}
                                    onClick={this.CheckBoxHandler} 
                                    defaultChecked/> :
                                    <input type="checkbox" name={optionsPlural.name} 
                                    onClick={this.CheckBoxHandler}/>}
                                    <span>{el}</span>
                                </div>
                            })}
                        </div>
                        </>
                    )}

                    {extras && (
                        <>
                        <h3>Додатки</h3>
                        <div className='extras-container' ref={this.extras}>
                        {extras.map(el => {
                        return <>
                            <div>
                                <input type="number" defaultValue={0}
                                    min={0} max={3} 
                                    onChange={this.ExtrasCounterHandler}
                                    onFocus={(e) => {e.target.value = ""}}
                                    onBlur={(e) => {if(e.target.value == "") e.target.value = 0}}/>
                                <span>{el.name}</span>
                                <span style={
                                    {fontWeight: 'lighter', textAlign: 'right'}
                                    }>{`${el.price} грн`}</span>
                            </div>
                        </>
                        })}
                        </div>
                        </>
                    )}
                    
                    <div className="flex-container">
                        <p className="price-label">{`${price} грн`}</p>
                        <input type="number" ref={this.counter_ref}
                            defaultValue={1} min={1} max={25} 
                            onChange={this.CounterHandler}
                            onFocus={(e) => {e.target.value = ""}}
                            onBlur={(e) => {if(e.target.value == "") e.target.value = this.counter}}
                            />
                        <AddToCart 
                            counter={this.counter_ref} 
                            info={this.product_info} 
                            extras={this.extras}
                            options={this.options}
                            optionsPlural={this.optionsPlural}/>
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