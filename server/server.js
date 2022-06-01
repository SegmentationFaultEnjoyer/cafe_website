const get_host = require('./helpers/get_host');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const middleware = require('webpack-dev-middleware');
const compiler = webpack(webpackConfig);

const PORT = process.env.PORT ?? 8080;
const HOST = get_host();
const { publicPath } = webpackConfig.output;

const {express, path} = require('./helpers/components');
const router = require('./routers/router');
const app = express();

app.use(router);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(middleware(compiler, {publicPath}));

app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`));
