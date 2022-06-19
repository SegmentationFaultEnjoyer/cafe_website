require('../../../public/Sort.css');
const type = require('../helpers/types.js');
const {mainPageContext} = require('../helpers/context.jsx');

class Sort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.ClickHandler = this.ClickHandler.bind(this);
        this.ChangeState = this.ChangeState.bind(this);
    }

    ClickHandler(e) {
        if(`▼ Сортування за: ${e.target.innerText.toLowerCase()}` == this.props.sortLabel) return;

        this.props.setSortLabel(`▼ Сортування за: ${e.target.innerText.toLowerCase()}`);

        let {gridItems, setGridItems} = this.context;
        let sorted = this.Sort(gridItems.products, Number(e.target.dataset.type));
        setGridItems({...gridItems, products: sorted});
    }

    Sort(items, sortType) {
        switch(sortType) {
            case type.PRICE_ASC:
                return items.sort((a, b) => a.price - b.price);
            case type.PRICE_DESC:
                return items.sort((a, b) => b.price - a.price);
            case type.ALPHABETIC:
                return items.sort((a, b) => a.name.localeCompare(b.name));
        }
    }

    ChangeState() {
        document.body.style.overflowY = document.body.style.overflowY == '' ? 'hidden' : '';
        this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        return (
            <div className="sort-container disable-select" onClick={this.ChangeState}>
                <input type="text" name="test" value={this.props.sortLabel} className="field" 
                readOnly/>
                {this.state.isOpen && (
                    <div className='fake-body'>
                        <ul className="list" >
                        {[
                            {name: 'Алфавітом', type: type.ALPHABETIC},
                            {name: 'Ціною (↑)', type: type.PRICE_ASC}, 
                            {name: 'Ціною (↓)', type: type.PRICE_DESC}]
                            .map(el => {
                            return <li data-type={el.type} onClick={this.ClickHandler}>{el.name}</li>
                        })}
                        </ul>
                    </div>
                    
                )}
            </div>
        )
    }
}

Sort.contextType = mainPageContext;

module.exports = Sort;