require('../../../public/Search.css');

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.SubmitHandler = this.SubmitHandler.bind(this);
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

    render() {
        return (
            <div className="search__container">
                <input 
                className="search__input" 
                type="text" 
                placeholder="Я шукаю..." 
                ref={this.search}/>
                <i className="fa fa-search" onClick={this.SubmitHandler}></i>
            </div>
        );
    }
}

module.exports = Search;