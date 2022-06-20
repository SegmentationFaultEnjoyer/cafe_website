require('../../../public/Search.css');
const React = require('react');
const { useDispatch } = require('react-redux');

const { find } = require('../redux/slices/gridSlice.js');

function Search() {
    let search = React.createRef();
    const dispatch = useDispatch();

    function ValidateInput(value) { return value.trim() != "";}

    function SubmitHandler(e) {
        if(!ValidateInput(search.current.value)) return;

        e.preventDefault();
        search.current.value = "";
    }

    function onInputChange() {
        if(!ValidateInput(search.current.value)) return;

        dispatch(find(search.current.value));
    }

    return (
        <div className="search__container">
            <input 
            className="search__input" 
            type="text" 
            placeholder="Я шукаю..." 
            ref={search}
            onChange={onInputChange}
            onBlur={() => {search.current.value = "";}}
            />
            <i className="fa fa-search" onClick={SubmitHandler}></i>
        </div>
    );
}

module.exports = Search;