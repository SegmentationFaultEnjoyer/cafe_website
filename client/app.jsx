const ReactDOM = require('react-dom/client');
const React = require('react');

const types = require('./src/helpers/types.js');
const {pageContext} = require('./src/helpers/context.jsx');

const MainPage = require('./src/pages/MainPage.jsx');
const DeliveryPage = require('./src/pages/DeliveryPage.jsx');
const AboutPage = require('./src/pages/AboutPage.jsx');

const TopBar = require('./src/components/TopBar.jsx');

let root = ReactDOM.createRoot(document.getElementById("app"));


function MainApp() {
    const [page, pageSwitcher] = React.useState(types.MAIN_PAGE);
    let renderPage;

    switch (page) {
        case types.MAIN_PAGE:
            renderPage = <MainPage />;
            break;
        case types.DELIVERY_PAGE:
            renderPage = <DeliveryPage />
            break;
        case types.ABOUT_PAGE:
            renderPage = <AboutPage />
            break;
        default:
            renderPage = <h1>404 not found</h1>
    }
    
    return (
        <pageContext.Provider value={{page, pageSwitcher}}>
            <TopBar />
            {renderPage}
        </pageContext.Provider>
    )
}


root.render(<MainApp />);
