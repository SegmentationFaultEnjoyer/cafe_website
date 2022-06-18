const {express, path} = require('../helpers/components');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', controller.ShowMainPage);

router.get('/getItems', controller.GetItems);

router.get('/*', controller.ShowMainPage);

module.exports = router;