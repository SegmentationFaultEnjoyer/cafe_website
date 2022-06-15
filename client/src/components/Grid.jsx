require('../../../public/Grid.css');
const Modal = require('./Modal.jsx');
const {mainPageContext} = require('../helpers/context.jsx');
const type = require('../helpers/types.js');
const GeneratorID = require('../helpers/id_generator.js');

class MainGrid extends React.Component {
    constructor(props) {
        super(props);
        this.items = props.items;
        console.log(this.items);
        this.items[0].img = 'sandwich';
        this.items[0].name = 'Биг Мак';
        this.items[0].price = 97;
        this.items[0].category = type.SANDWHICH;
        this.items[2].img = 'sandwich';
        this.items[2].name = 'І Мак';
        this.items[2].price = 97;
        this.items[2].category = type.SANDWHICH;
    }

    getTitle(category) {
        switch(category) {
            case type.COFFEE:
                return 'Кава';
            case type.ICE_COFFEE:
                return 'Холодна кава';
            case type.TEA:
                return 'Не кавові напої';
            case type.LEMONADE:
                return 'Холодні напої';
            case type.MILKSHAKE:
                return 'Молочні коктейлі';
            case type.SANDWHICH:
                return 'Сендвічі';
            case type.SALAD:
                return 'Салати';
            case type.BOUL:
                return 'Боули';
            case type.BREAKFAST:
                return 'Сніданки';
            default:
                return 'Популярні позиції'
        }
    }

    getItemsList(category) {
        if(category == 0) return this.items;
        
        return this.items.filter(item => item.type === category);
    }

    render() {
        let {pickedCategory} = this.context;
        console.log('render grid');
        return (
            <>
             <h1 className='grid-title disable-select'>{this.getTitle(pickedCategory)}</h1>
             <div className='main-grid'>
                {this.getItemsList(pickedCategory).map((el, i) => <Modal info={el} key={i}/>)}
                <button onClick={() => {
                    console.log(localStorage);
                    localStorage.clear()
                    }}>CLEAR</button>
            </div>
            </>
           
        )
    }
}

MainGrid.contextType = mainPageContext;

module.exports = MainGrid;