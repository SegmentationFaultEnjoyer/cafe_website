const {path} = require('../helpers/components');
const jwt = require("jsonwebtoken");
const secureKey = "eb686e3c7e34ecc1a1f0d5efa40dabc7549d5624ef9e2b65521a1d688101f470d1de246e7147ab3fe5591b19637521b8";
const DataBase = require('../mongodb/db');

exports.ShowMainPage = function(req, resp) {
    resp.sendFile(path.join(__dirname, '../..', 'views', 'index.html'));
}

exports.GetItems = async function(req, resp) {
    let products = await DataBase.getProducts();
    resp.json({products});
}

exports.LogIn = function(req, resp) {
    let [login, password] = ['admin', 'admin'];

    if(req.body.login === login && req.body.password == password) {
        let token = jwt.sign({login, password}, secureKey);
        resp.cookie("token", token);
        resp.json({isAuth: true});
    }
    else
        resp.json({isAuth: false});
}

exports.isAuth = function (req, resp, next) {
    try {
        if (req.cookies.token) {
            const decoded = jwt.verify(req.cookies.token, secureKey);
            resp.user = decoded;
        }
        next();
    }
    catch (e) {
        console.log(e);
        return resp.status(403).json({ message: e });
    }

}

exports.auth = function (req, resp) {
    if(resp.user)
        resp.json({isAuth: true});
    else
        resp.json({isAuth: false});
}