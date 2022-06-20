require('../../../public/Sort.css');

const React = require('react');
const { useSelector, useDispatch } = require('react-redux');

const type = require('../helpers/types.js');

const { setLabel } = require('../redux/slices/sortSlice.js');
const { sort } = require('../redux/slices/gridSlice.js');

function Sort() {
    const [isOpen, setIsOpen] = React.useState(false);
    const sortLabel = useSelector(state => state.sort.label);
    const dispatch = useDispatch();

    const ClickHandler = (e) => {
        if(`▼ Сортування за: ${e.target.innerText.toLowerCase()}` == sortLabel) return;

        dispatch(setLabel(`▼ Сортування за: ${e.target.innerText.toLowerCase()}`));
        dispatch(sort(Number(e.target.dataset.type)));
    }

    const ChangeState = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        document.body.style.overflowY = document.body.style.overflowY == '' ? 'hidden' : '';
        setIsOpen(!isOpen);
    }

    return (
        <div className="sort-container disable-select" onClick={ChangeState}>
            <input type="text" name="test" value={sortLabel} className="field" 
            readOnly/>
            {isOpen && (
                <div className='fake-body'>
                    <ul className="list">
                    {[
                        {name: 'Алфавітом', type: type.ALPHABETIC},
                        {name: 'Ціною (↑)', type: type.PRICE_ASC}, 
                        {name: 'Ціною (↓)', type: type.PRICE_DESC}]
                        .map((el, i) => {
                        return <li data-type={el.type} onClick={ClickHandler} key={i}>{el.name}</li>
                    })}
                    </ul>
                </div>
            )}
        </div>
    )
}

module.exports = Sort;

// class Sort1 extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {isOpen: false};
//         this.ChangeState = this.ChangeState.bind(this);
//         this.list = React.createRef();
//     }

//     ClickHandler = (e) => {
//         if(`▼ Сортування за: ${e.target.innerText.toLowerCase()}` == this.props.sortLabel) return;

//         const dispatch = useDispatch();
//         dispatch(setLabel(`▼ Сортування за: ${e.target.innerText.toLowerCase()}`));
//         //this.props.setSortLabel(`▼ Сортування за: ${e.target.innerText.toLowerCase()}`);

//         let {gridItems, setGridItems} = this.context;
//         let sorted = this.Sort(gridItems.products, Number(e.target.dataset.type));
//         setGridItems({...gridItems, products: sorted});
//     }

//     Sort(items, sortType) {
//         switch(sortType) {
//             case type.PRICE_ASC:
//                 return items.sort((a, b) => a.price - b.price);
//             case type.PRICE_DESC:
//                 return items.sort((a, b) => b.price - a.price);
//             case type.ALPHABETIC:
//                 return items.sort((a, b) => a.name.localeCompare(b.name));
//         }
//     }

//     ChangeState() {
//         window.scrollTo({
//             top: 0,
//             left: 0,
//             behavior: 'smooth'
//         });
//         document.body.style.overflowY = document.body.style.overflowY == '' ? 'hidden' : '';
//         setTimeout(() => {
//             this.setState({isOpen: !this.state.isOpen});
//         }, 100)
//     }

//     render() {
//         const sortLabel = useSelector(state => state.default.value);
        
//         return (
//             <div className="sort-container disable-select" onClick={this.ChangeState}>
//                 <input type="text" name="test" value={sortLabel} className="field" 
//                 readOnly/>
//                 {this.state.isOpen && (
//                     <div className='fake-body' ref={this.list}>
//                         <ul className="list">
//                         {[
//                             {name: 'Алфавітом', type: type.ALPHABETIC},
//                             {name: 'Ціною (↑)', type: type.PRICE_ASC}, 
//                             {name: 'Ціною (↓)', type: type.PRICE_DESC}]
//                             .map(el => {
//                             return <li data-type={el.type} onClick={this.ClickHandler}>{el.name}</li>
//                         })}
//                         </ul>
//                     </div>
                    
//                 )}
//             </div>
//         )
//     }
// }

// Sort1.contextType = mainPageContext;

