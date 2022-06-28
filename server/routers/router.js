const {express, path} = require('../helpers/components');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', controller.ShowMainPage);

router.get('/api/items', controller.GetItems);

router.post('/login', controller.LogIn);

router.get('/auth', controller.isAuth, controller.auth);

router.get('/*', controller.ShowMainPage);

module.exports = router;