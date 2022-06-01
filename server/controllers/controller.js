const {path} = require('../helpers/components');

exports.ShowMainPage = function(req, resp) {
    resp.sendFile(path.join(__dirname, '../..', 'views', 'index.html'));
}