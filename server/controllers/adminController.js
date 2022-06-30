const jwt = require("jsonwebtoken");
const HashMatch = require('../helpers/hashing');
const {path, fs} = require('../helpers/components');
const convertImg = require('../helpers/convertImage');
require("dotenv").config();

const DataBase = require('../mongodb/db');


exports.LogIn = async function(req, resp) {
    let {login, password} = await DataBase.getAdmin();

    if(req.body.login === login && HashMatch(req.body.password, password)) {
        let token = jwt.sign({login, password}, process.env.JWT_KEY);
        resp.cookie("token", token);
        resp.json({isAuth: true});
    }
    else
        resp.json({isAuth: false});
}

exports.isAuth = function (req, resp, next) {
    try {
        if (req.cookies.token) {
            const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
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

exports.UploadPhoto = function (req, resp) {
    if(!req.file) {
        console.log('Bad file');
        resp.json({isUploaded: false});
    }

    else {
        console.log('Image uploaded', req.file.filename);
        convertImg(path.join(__dirname, '../..', 'views', 'assets'), req.file.filename);
        resp.json({isUploaded: true});
    }
        
}

exports.UpdateProduct = async function (req, resp) {
    if(!resp.user) {
        resp.json({success: false});
        return;
    }
    
    let id = new require('mongodb').ObjectId(req.body._id);
    delete req.body._id;
 
    let oldProduct = await DataBase.getOne({_id: id});

    let res = await DataBase.updateOne({_id: id}, req.body);

    if(res == 0 && oldProduct.img != req.body.img) {
        console.log('deleting old image', oldProduct.img);
        fs.unlinkSync(path.join(__dirname, '../..', 'views', 'assets', oldProduct.img));
    }

    resp.json({success: res == 0});
}

exports.AddProduct = async function (req, resp) {
    if(!resp.user) {
        resp.json({success: false});
        return;
    }

    let res = await DataBase.addOne(req.body);
    resp.json({success: res == 0});
    
}

exports.DeleteProduct = async function (req, resp) {
    if(!resp.user) {
        resp.json({success: false});
        return;
    }

    let id = new require('mongodb').ObjectId(req.body._id);
   
    let result = await DataBase.deleteOne({_id: id});

    if(result == 0)
        fs.unlinkSync(path.join(__dirname, '../..', 'views', 'assets', req.body.img));
    
    resp.json({success: result == 0});
}