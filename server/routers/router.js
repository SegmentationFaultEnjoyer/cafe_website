const {express} = require('../helpers/components');
const router = express.Router();
const controller = require('../controllers/controller');
const adminController = require('../controllers/adminController');
const downloader = require('../helpers/fileDownloader');

router.get('/', controller.ShowMainPage);

router.get('/auth', adminController.isAuth, adminController.auth);

router.post('/login', adminController.LogIn);

router.post("/payBtn", controller.GetPayBtn);

router.post('/upload_photo', downloader, adminController.UploadPhoto);

router.get('/api/items', controller.GetItems);

router.get('/api/photos', controller.GetLocationPhotos);

router.put('/api/items', adminController.isAuth, adminController.UpdateProduct);

router.post('/api/items', adminController.isAuth, adminController.AddProduct);

router.delete('/api/items', adminController.isAuth, adminController.DeleteProduct);

router.post('/api/order', controller.PostOrder);



router.get('/*', controller.ShowMainPage);

module.exports = router;