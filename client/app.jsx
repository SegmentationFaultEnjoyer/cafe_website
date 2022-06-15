const ReactDOM = require('react-dom/client');
const React = require('react');
const {BrowserRouter, Routes, Route} = require('react-router-dom');

const MainPage = require('./src/pages/MainPage.jsx');
const DeliveryPage = require('./src/pages/DeliveryPage.jsx');
const AboutPage = require('./src/pages/AboutPage.jsx');

const TopBar = require('./src/components/TopBar.jsx');

let root = ReactDOM.createRoot(document.getElementById("app"));


function MainApp() {
    return (
        <>
        <TopBar />
        <Routes>
            <Route path='/' element={<MainPage />}/>
            <Route path='/delivery' element={<DeliveryPage />}/>
            <Route path='/about' element={<AboutPage />}/>
            <Route path='*' element={<h1>404 not found</h1>}/>
        </Routes>
        </>
    )
}


root.render(
    <BrowserRouter>
        <MainApp />
    </BrowserRouter>
    );
