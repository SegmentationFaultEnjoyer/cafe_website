const type = require('../helpers/types.js');
const getTitle = require('../helpers/GetTitle.js');
const request = require('../helpers/SendRequest.js');
const ConfirmationModal = require('../modals/ConfirmModal.jsx');

class AdminForm extends React.Component {
    constructor(props) {
        super(props);
        this.counter = 0;
        this.product_info = !props.isEmpty ? props.info : null;
        this.state = {
            extras: this.init_extras(),
            options: this.init_options(),
            isWaitingForConfirmation: false,
            ConfirmCallback: null
        }
        this.addField = this.addField.bind(this);
        this.SubmitHandler = this.SubmitHandler.bind(this);
        this.extras = React.createRef();
        this.options = React.createRef();
    }

    init_options() {
        if(this.props.isEmpty || !this.product_info.options)
            return [];

        return this.product_info.options[0].contains.map(el => {
            let id = this.counter++;
            return <div className='flex-container' key={id}>
                    <input type="text" defaultValue={el}/>
                    <i className="fa fa-trash" onClick={() => this.removeField('option', id)} ></i>
                   </div>
        })
    }

    init_extras() {
        if(this.props.isEmpty || !this.product_info.extras)
            return [];

        return this.product_info.extras.map(el => {
            let id = this.counter++;
            return <div className='flex-container' key={id}>
                    <input type="text" defaultValue={el.name}/>
                    <input type="text" defaultValue={el.price}/>
                    <i className="fa fa-trash" onClick={() => this.removeField('extra', id)}></i>
                   </div>
        }) 
    }

    removeField(container, id) {
        if(container == 'extra') {
            let newExtras = this.state.extras.filter(el => Number(el.key) !== id);
            this.setState({extras: newExtras});
        }
        else {
            let newOptions = this.state.options.filter(el => Number(el.key) !== id);
            this.setState({options: newOptions});
        }
    }

    addField(field) {
        if(field == 'extra') {
            let newExtras = [...this.state.extras];
            let id = this.counter++;
            newExtras.push(
                <div className='flex-container' key={id}>
                    <input type="text" placeholder='Назва додатку'/>
                    <input type="text" placeholder='Ціна додатку'/>
                    <i className="fa fa-trash" onClick={() => this.removeField('extra', id)}></i>
                </div>
            )
            this.setState({extras: newExtras});
        }
            
        else {
            let newOptions = [...this.state.options];
            let id = this.counter++;
            newOptions.push(
                <div className='flex-container' key={id}>
                    <input type="text" placeholder='Назва опції'/>
                    <i className="fa fa-trash" onClick={() => this.removeField('option', id)}></i>
                </div>
            )
            this.setState({options: newOptions});
        }
        
    }

    parseExtras() {
        let extras = [];
        let nodes = this.extras.current.querySelectorAll('div');
        nodes.forEach(node => {
            let [name, price] = node.querySelectorAll('input');
            if(name.value.trim() != '' && price.value.trim() != '') {
                extras.push({
                    name: name.value.trim(),
                    price: parseInt(price.value)
                })
            }
        })
        return extras.length > 0 ? extras : null;
    }

    parseOptions(name) {
        let options = [];
        let nodes = this.options.current.querySelectorAll('div');
        nodes.forEach(node => {
            let [name] = node.querySelectorAll('input');
            if(name.value.trim() != '')
                options.push(name.value.trim());
        })
        return options.length > 0 ? [{
            name, 
            contains: options}] : null;
    }
    
    ValidateInput({name, desc, price, img}) {
        if(name == '' || desc == '') return false;

        if(isNaN(price)) return false;

        if(this.props.isEmpty && img == '') 
            return false;

        return true;
    }

    async SubmitHandler(e) {
        e.preventDefault();
        let needUpload = true;

        const formData = new FormData(e.target);

        console.log(this.product_info);

        let newProduct = {
            name: formData.get('name').trim(),
            desc: formData.get('desc').trim(),
            img: formData.get('img').name,
            isPopular: formData.get('isPopular') ? true : false,
            price: parseInt(formData.get('price')),
            type: parseInt(formData.get('category')),
            extras: this.parseExtras(),
            options: this.parseOptions(formData.get('options_name'))
        }

         //if UPDATE --> id stays the same;
        if(this.product_info) { 
            newProduct._id = this.product_info._id;

            //if photo wasn`t picked during UPDATE --> it stays the same;
            if(newProduct.img == '') { 
                newProduct.img = this.product_info.img;
                needUpload = false;
            }
        }

        if(this.ValidateInput(newProduct)) {
            let resp;
            
            this.setState({
                isWaitingForConfirmation: true, 
                ConfirmCallback: async () => {
                    if(needUpload) {
                        console.log(newProduct.img, 'ITS OK UPLOADING');
                        await fetch('upload_photo', {method: 'POST', body: formData});
                        newProduct.img = newProduct.img.split('.')[0] + '.webp';
                    }

                    if(this.props.isEmpty)
                        resp = await request('/api/items', 'POST', newProduct); //ADD
                    else
                        resp = await request('/api/items', 'PUT', newProduct); //UPDATE

                    console.log(resp, newProduct);
                    
                    if(resp.success)
                        window.location.reload();
                }    
            });
            
        }
        else
            alert('Введені некоректні данні! Перевірте поля ще раз.');
    }

    render() {
        let categories = [type.SANDWHICH, type.SALAD, type.BREAKFAST, type.BOUL,
            type.DRINKS, type.DESSERTS, type.COFFEE];

        return (
            <> 
                <form className='edit-form' onSubmit={this.SubmitHandler} encType="multipart/form-data">
                    <h3>Назва</h3>
                    <input type="text" name="name" 
                        defaultValue={this.product_info ? this.product_info.name : ''}/>

                    <h3>Опис</h3>
                    <textarea name="desc" 
                        defaultValue={this.product_info ? this.product_info.desc : ''} 
                        cols="40" rows="7"></textarea>

                    <h3>Фото</h3>
                    <input type="file" name="img"/>

                    <h3>Категорія</h3>
                    <div className='flex-container'>
                        <select name="category">
                            {!this.props.isEmpty && <option value={this.product_info.type}>{getTitle(this.product_info.type)}</option>}
                            {categories
                                .filter(category => category !== (this.product_info ? this.product_info.type : null))
                                .map(el => <option value={el}>{getTitle(el)}</option>)}
                        </select>
                        <div>
                            <label htmlFor="popular" style={{paddingRight: '5px'}}>На головну сторінку</label>
                            {(this.product_info && this.product_info.hasOwnProperty('isPopular') && this.product_info.isPopular) ?
                            <input type='checkbox' defaultChecked name='isPopular'/> :
                            <input type='checkbox' name='isPopular'/>
                            }
                        </div>
                    </div>
                   
                    <h3>Ціна</h3>
                    <input type="text" name="price" defaultValue={this.product_info ? this.product_info.price : ''}/>

                    <div className='flex-container'>
                        <h3>Додатки</h3>
                        <i className="fa fa-plus-circle" onClick={() => {this.addField('extra')}} style={{
                            fontSize: '30px'
                        }}></i>
                    </div>
                    <div name='extras' ref={this.extras}>   
                        {this.state.extras.length > 0 && this.state.extras}
                    </div>
                   

                    <div className='flex-container'>
                        <input type="text" name='options_name' style={{fontWeight: 'bold'}} 
                            defaultValue={(this.product_info && this.product_info.options) ? 
                                            this.product_info.options[0].name :
                                            'Опції на вибір'} />
                        <i className="fa fa-plus-circle" onClick={() => {this.addField('option')}} style={{
                            fontSize: '30px'
                        }}></i>
                    </div>
                    <div name='options' ref={this.options}>
                        {this.state.options.length > 0 && this.state.options}
                    </div>
                    

                    <button className='green checkout-btn'>{this.props.isEmpty ? 'ДОДАТИ' : 'ЗБЕРЕГТИ ЗМІНИ'}</button>
                </form>
                        
                <ConfirmationModal
                    isOpen={this.state.isWaitingForConfirmation}
                    setIsOpen={(state) => {this.setState({isWaitingForConfirmation: state})}}
                    afterConfirmCallback={this.state.ConfirmCallback}
                    contains="Ви впевнені?"/>
                </>
        )
    }
}

module.exports = AdminForm;