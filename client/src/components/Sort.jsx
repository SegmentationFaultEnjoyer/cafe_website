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