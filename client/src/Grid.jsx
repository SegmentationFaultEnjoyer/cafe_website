require('../../public/Grid.css');
const Modal = require('./Modal.jsx');

let info = {
    name: 'Суп из семи залуп',
    desc: 'В описании не нуждается',
    price: 68,
    img: 'soup'
}

class MainGrid extends React.Component {
    constructor(props) {
        super(props);
        this.items = []; //will be fetched from server
        this.items = new Array(10).fill(0).map(el => info);
    }

    render() {
        return (
            <div className='main-grid'>
                {this.items.map(el => <Modal info={el} />)}
                <button onClick={() => {
                    console.log(localStorage);
                    localStorage.clear()
                    }}>CLEAR</button>
            </div>
        )
    }
}


module.exports = MainGrid;