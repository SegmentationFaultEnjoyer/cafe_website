const ReactDOM = require('react-dom/client');
const React = require('react');
const {BrowserRouter, Routes, Route} = require('react-router-dom');

const MainPage = require('./src/pages/MainPage.jsx');
const DeliveryPage = require('./src/pages/DeliveryPage.jsx');
const AboutPage = require('./src/pages/AboutPage.jsx');
const ErrorPage = require('./src/pages/ErrorPage.jsx');
const WelcomePage = require('./src/pages/WelcomePage.jsx');

const Loader = require('./src/helpers/Loader.jsx');
const TopBar = require('./src/navbars/TopBar.jsx');

const {store} = require('./src/redux/store.js');
const {Provider} = require('react-redux');

const AdminPanel = React.lazy(() => import('./src/admin/AdminPanel.jsx'));

let root = ReactDOM.createRoot(document.getElementById("app"));


function MainApp() {
    let app = React.createRef();

    return (
        <>
        {window.location.pathname != '/admins' && <WelcomePage app={app}/>}

        <div ref={app} style={{display: window.location.pathname != '/admins' ? 'none' : 'block'}}>
            {window.location.pathname != '/admins' && <TopBar />}
            <Routes>
                <Route path='/' element={<MainPage />}/>
                <Route path='/delivery' element={<DeliveryPage />}/>
                <Route path='/about' element={<AboutPage />}/>
                <Route path='/admins/*' element={
                    <React.Suspense fallback={<Loader />}>
                        <AdminPanel />
                    </React.Suspense>}/>
                <Route path='*' element={<ErrorPage />}/>
            </Routes>
        </div>
        </>
    )
}


root.render(
    <BrowserRouter>
        <Provider store={store}>
            <MainApp />
        </Provider>
    </BrowserRouter>
    );
