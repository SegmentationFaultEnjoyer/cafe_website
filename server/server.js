const get_host = require('./helpers/get_host');

const PORT = process.env.PORT ?? 8080;
const HOST = 'localhost';
const DataBase = require('./mongodb/db');
DataBase.connect();

const cookieParser = require("cookie-parser");
const { 
    express, 
    path, 
    webpack, 
    webpackConfig, 
    webpackMiddleware
} = require('./helpers/components');

//const { publicPath } = webpackConfig.output;

const router = require('./routers/router');
const app = express();
//const compiler = webpack(webpackConfig);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'views', 'assets')));
//app.use(webpackMiddleware(compiler, { publicPath }));
app.use(router);

app.listen(PORT, HOST, () => console.log(`http://localhost:${PORT}`));
