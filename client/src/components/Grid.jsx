require('../../../public/Grid.css');

const { useSelector } = require('react-redux');

const Modal = require('../modals/Modal.jsx');
const getTitle = require('../helpers/GetTitle.js');

function MainGrid() {
    const gridItems = useSelector(state => state.grid.items);

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