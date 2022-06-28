const {express} = require('../helpers/components');
const router = express.Router();
const controller = require('../controllers/controller');
const downloader = require('../helpers/fileDownloader');

router.get('/', controller.ShowMainPage);

router.get('/auth', controller.isAuth, controller.auth);

router.post('/login', controller.LogIn);

router.post('/upload_photo', downloader, controller.UploadPhoto);

router.get('/api/items', controller.GetItems);

router.put('/api/items', controller.isAuth, controller.UpdateProduct);

router.post('/api/items', controller.isAuth, controller.AddProduct);

router.delete('/api/items', controller.isAuth, controller.DeleteProduct);

router.get('/*', controller.ShowMainPage);

module.exports = router;