require('../../../public/Grid.css');

const { useSelector } = require('react-redux');

const Modal = require('../modals/Modal.jsx');
const type = require('../helpers/types.js');

function MainGrid() {
    const gridItems = useSelector(state => state.grid.items);

    function getTitle(category) {
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
    
    return (
        <>
         <h1 className='grid-title disable-select'>{getTitle(gridItems.category)}</h1>
         <div className='main-grid'>
            {gridItems.products.map(el => <Modal info={el} key={el._id}/>)}
        </div>
        </>
       
    )
}

module.exports = MainGrid;