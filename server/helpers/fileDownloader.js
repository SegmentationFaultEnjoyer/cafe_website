const multer = require('multer');
const {path} = require('./components');

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.join(__dirname, '../..', 'views', 'assets'));
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

const download = multer({storage: storageConfig}).single('img');

module.exports = download;