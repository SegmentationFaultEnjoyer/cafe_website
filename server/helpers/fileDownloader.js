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

const downloadSingle = multer({storage: storageConfig}).single('img');

const downloadMultiple = multer({storage: storageConfig}).array('img');

module.exports = {downloadSingle, downloadMultiple};