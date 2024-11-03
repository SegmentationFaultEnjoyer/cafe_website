const {TailSpin, Oval, Circles, Bars, Grid} = require('react-loader-spinner');
// require("react-loader-spinner/dist/loader/css/react-spinner-loader.css");

const style = {
    height: '75vh',
    gridTemplateColumns: '200px'
}

function Loader() {
    return(
        <div className='main-grid' style={style}>
            <Circles color="var(--coffee-color)" height={200} width={200}/>
        </div>
        
    )
}


module.exports = Loader;