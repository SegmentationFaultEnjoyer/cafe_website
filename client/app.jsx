const ReactDOM = require('react-dom/client');
const React = require('react');

const types = require('./src/helpers/types.js');
const {pageContext} = require('./src/helpers/context.jsx');

const MainPage = require('./src/pages/MainPage.jsx');
const DeliveryPage = require('./src/pages/DeliveryPage.jsx');
const AboutPage = require('./src/pages/AboutPage.jsx');

const TopBar = require('./src/TopBar.jsx');

let root = ReactDOM.createRoot(document.getElementById("app"));


function MainApp() {
    const [page, pageSwitcher] = React.useState(types.MAIN_PAGE);
    let name;

    switch (page) {
        case types.MAIN_PAGE:
            name = <MainPage />;
            break;
        case types.DELIVERY_PAGE:
            name = <DeliveryPage />
            break;
        case types.ABOUT_PAGE:
            name = <AboutPage />
            break;
        default:
            name = <h1>404 not found</h1>
    }
    
    return (
            <pageContext.Provider value={{page, pageSwitcher}}>
                <TopBar />
                {name}
            </pageContext.Provider>

       
    )
}


root.render(<MainApp />);
