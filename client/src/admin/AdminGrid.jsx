const { useSelector } = require('react-redux');

const AdminModal = require('./AdminModal.jsx');
const getTitle = require('../helpers/GetTitle.js');

function AdminGrid() {
    const gridItems = useSelector(state => state.grid.items);

    return (
        <>
         <h1 className='grid-title disable-select'>{getTitle(gridItems.category)}</h1>
         <div className='main-grid'>
            {gridItems.products.map(el => <AdminModal 
                info={el} 
                key={el._id}/>)}
        </div>
        </>
       
    )
}

module.exports = AdminGrid;