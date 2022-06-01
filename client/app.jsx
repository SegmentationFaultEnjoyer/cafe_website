const ReactDOM = require('react-dom/client');
const React = require('react');
const tick = require('./src/time.jsx');

let root = ReactDOM.createRoot(document.getElementById("test"));

setInterval(tick, 1000);