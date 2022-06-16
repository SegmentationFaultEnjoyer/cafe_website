require('../../../public/Search.css');
const {mainPageContext} = require('../helpers/context.jsx');
const type = require('../helpers/types.js');

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.SubmitHandler = this.SubmitHandler.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.search = React.createRef();
    }

    ValidateInput(value) {
        return value.trim() != "";
    }

    ShowError() {
        console.log('bad input');
    }

    SubmitHandler(e) {
        if(!this.ValidateInput(this.search.current.value)) {
            this.ShowError();
            return;
        }

        e.preventDefault();
        console.log(this.search.current.value);
        this.search.current.value = "";
    }

    

    find(items, searchValue) {
        return items.filter(item => {
            return item.name.toLowerCase().includes(searchValue.toLowerCase());
        })
    }

    onInputChange() {
        if(!this.ValidateInput(this.search.current.value)) {
            this.ShowError();
            return;
        }

        let {gridItems, setGridItems} = this.context;
        setGridItems({...gridItems,
            category: type.SEARCH, 
            products: this.find(gridItems.init_products, this.search.current.value)
        })
    }

    render() {
        return (
            <div className="search__container">
                <input 
                className="search__input" 
                type="text" 
                placeholder="Я шукаю..." 
                ref={this.search}
                onChange={this.onInputChange}
                onBlur={() => {this.search.current.value = "";}}
                />
                <i className="fa fa-search" onClick={this.SubmitHandler}></i>
            </div>
        );
    }
}

Search.contextType = mainPageContext;

module.exports = Search;