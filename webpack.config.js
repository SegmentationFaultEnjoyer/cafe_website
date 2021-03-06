const path = require("path");
const RELEASE = true;

let mode = RELEASE ? "production" : "development";
let outputPath = RELEASE ? path.resolve(__dirname, "./public") : "/";

module.exports = {
    mode: mode,
    entry: "./client/app.jsx", // входная точка - исходный файл
    output:{
        // path: path.resolve(__dirname, "./public"),     // путь к каталогу выходных файлов - папка public
        path: outputPath,
        publicPath: "/",
        filename: "bundle.js"       // название создаваемого файла
    },
    module:{
        rules:[   //загрузчик для jsx
            {
                test: /\.jsx?$/, // определяем тип файлов
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options:{
                    presets:[ "@babel/preset-react"]    // используемые плагины
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
            }
        ]
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
}