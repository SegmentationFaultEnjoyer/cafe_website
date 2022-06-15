const {express} = require('../helpers/components');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', controller.ShowMainPage);

router.get('/getItems', controller.GetItems);

module.exports = router;