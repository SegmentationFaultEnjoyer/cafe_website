const {express} = require('../helpers/components');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', controller.ShowMainPage);

module.exports = router;