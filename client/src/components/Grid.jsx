require('../../../public/Grid.css');
const Modal = require('./Modal.jsx');

let info = {
    name: 'CUMPOT',
    desc: 'В описании не нуждается',
    price: 68,
    img: 'soup'
}

class MainGrid extends React.Component {
    constructor(props) {
        super(props);
        this.items = []; //will be fetched from server
        this.items = new Array(10).fill(0).map(el => {return {...info}});
        this.items[0].img = 'sandwich';
        this.items[0].name = 'Биг Мак';
        this.items[0].price = 97;
        this.items[2].img = 'sandwich';
        this.items[2].name = 'І Мак';
        this.items[2].price = 97;
        
        this.title = 'Популярні позиції';
    }

    render() {
        return (
            <>
             <h1 className='grid-title disable-select'>{this.title}</h1>
             <div className='main-grid'>
                {this.items.map(el => <Modal info={el} />)}
                <button onClick={() => {
                    console.log(localStorage);
                    localStorage.clear()
                    }}>CLEAR</button>
            </div>
            </>
           
        )
    }
}


module.exports = MainGrid;