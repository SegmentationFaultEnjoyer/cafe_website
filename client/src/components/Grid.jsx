require('../../../public/Grid.css');
const Modal = require('./Modal.jsx');
const {mainPageContext} = require('../helpers/context.jsx');
const type = require('../helpers/types.js');

class MainGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    getTitle(category) {
        switch(category) {
            case type.COFFEE:
                return 'Вагова кава';
            case type.DESSERTS:
                return 'Десерти';
            case type.DRINKS:
                return 'Напої';
            case type.SANDWHICH:
                return 'Сендвічі';
            case type.SALAD:
                return 'Салати';
            case type.BOUL:
                return 'Боули';
            case type.BREAKFAST:
                return 'Сніданки';
            case type.SEARCH:
                return 'Результати пошуку';
            default:
                return 'ціKavi пропозиції'
        }
    }

    render() {
        let {gridItems} = this.context;
        console.log('render grid');
        return (
            <>
             <h1 className='grid-title disable-select'>{this.getTitle(gridItems.category)}</h1>
             <div className='main-grid'>
                {gridItems.products.map(el => <Modal info={el} key={el._id}/>)}
            </div>
            </>
           
        )
    }
}

MainGrid.contextType = mainPageContext;

module.exports = MainGrid;