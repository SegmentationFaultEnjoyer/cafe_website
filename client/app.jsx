const ReactDOM = require('react-dom/client');
const React = require('react');
const {BrowserRouter, Routes, Route} = require('react-router-dom');

const MainPage = require('./src/pages/MainPage.jsx');
const DeliveryPage = require('./src/pages/DeliveryPage.jsx');
const AboutPage = require('./src/pages/AboutPage.jsx');
const ErrorPage = require('./src/pages/ErrorPage.jsx');

import AdminPanel from './src/admin/AdminPanel.jsx';

const TopBar = require('./src/navbars/TopBar.jsx');

const {store} = require('./src/redux/store.js');
const {Provider} = require('react-redux');

let root = ReactDOM.createRoot(document.getElementById("app"));


function MainApp() {
    return (
        <>
        {window.location.pathname != '/admin' && <TopBar />}
        <Routes>
            <Route path='/' element={<MainPage />}/>
            <Route path='/delivery' element={<DeliveryPage />}/>
            <Route path='/about' element={<AboutPage />}/>
            <Route path='/admin' element={<AdminPanel />}/>
            <Route path='*' element={<ErrorPage />}/>
        </Routes>
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
